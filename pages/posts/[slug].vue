<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'

import UpdatePost from '~/components/update-post.vue'
import { Database, Post } from '~/types/database'

const client = useSupabaseClient<Database>()
const authClient = useSupabaseAuthClient()
const route = useRoute()
// @ts-ignore
const slug: string = route.params.slug

const [isEdit, toggleEdit] = useToggle(false)
const [isLoading, toggleLoading] = useToggle(false)
const { data: post } = await useAsyncData(slug, async () => {
  const [{ data }, { data: authData }] = await Promise.all([
    client.from('posts').select('*, users ( id, username ,avatar_url )').eq('slug', slug).single(),
    authClient.auth.getUser(),
  ])

  let ableToUpdate = false
  const postData: Post & {
    user_id: string
    ableToUpdate: boolean
    users: { id: string; username: string; avatar_url: string }
  } = data

  if (authData?.user?.id === postData?.user_id) {
    ableToUpdate = true
  } else {
    ableToUpdate = false
  }

  return {
    ...postData,
    ableToUpdate,
  }
})

const editor = ref(post?.value?.content ?? '')
const title = ref(post?.value?.title ?? '')

const dateFormatSystem = computed(() => {
  return new Date(post.value?.created_at ?? '').toUTCString()
})

const dateFormatDisplay = computed(() => {
  return useDateFormat(post.value?.created_at, 'DD MMM YYYY', { locales: 'id' }).value
})

async function updatePost() {
  try {
    toggleLoading()
    return await client.from('posts').update({ content: editor.value, title: title.value }).eq('slug', slug)
  } catch (error) {
    console.error(error)
  } finally {
    await refreshNuxtData(slug)
    toggleLoading()
    toggleEdit()
  }
}

useHead({
  title: post.value?.title,
})
</script>

<template>
  <div class="container max-w-2xl mt-4 flex flex-col">
    <button
      v-if="post?.ableToUpdate"
      class="ml-auto px-1 text-sm c-gray-6 hover:c-blue inline-flex gap-1"
      title="Edit this article"
      @click="toggleEdit()"
    >
      <i class="i-ph:pencil w-4 h-4"></i>
      Edit
    </button>
    <template v-if="isEdit">
      <UpdatePost
        :isLoading="isLoading"
        v-model:editor="editor"
        v-model:title="title"
        @toggleEdit="toggleEdit"
        @updatePost="updatePost"
      />
    </template>
    <article v-else class="flex flex-col">
      <h1 class="text-4xl font-bold leading-relaxed text-balance">{{ title }}</h1>
      <div class="flex justify-between items-center text-sm c-gray6 my-4 b-b pb-4">
        <div class="inline-flex items-center gap-2">
          <ProfilePicture
            :username="post?.users.username"
            :src="post?.users.avatar_url"
            :width="35"
            :height="35"
            loading="lazy"
            decoding="async"
          />
          <NuxtLink class="hover:bg-gray1" :to="'/' + post?.users.username">@{{ post?.users.username }} </NuxtLink>
        </div>
        <time :datetime="dateFormatSystem" :title="dateFormatSystem">
          {{ dateFormatDisplay }}
        </time>
      </div>

      <div class="prose text-base xl:text-lg" v-html="post?.content"></div>
    </article>
  </div>
</template>
