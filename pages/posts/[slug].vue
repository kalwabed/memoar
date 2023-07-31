<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
import { Database } from 'types/database'
import { Post } from 'types/entities'

import UpdatePost from '~/components/update-post.vue'

const client = useSupabaseClient<Database>()
const authClient = useSupabaseAuthClient()
const route = useRoute()
// @ts-ignore
const slug: string = route.params.slug

const [isEdit, toggleEdit] = useToggle(false)
const [isLoading, toggleLoading] = useToggle(false)
const { data: post } = await useAsyncData(slug, async () => {
  const getUserAuth = authClient.auth.getUser()
  const getPost = client.from(POSTS_TABLE).select('*, users ( id, username ,avatar_url )').eq('slug', slug).single()

  const [{ data }, { data: authData }] = await Promise.all([getPost, getUserAuth])

  let ableToUpdate = false
  // @ts-ignore
  const postData: Post & {
    users: { id: string; username: string; avatar_url?: string }
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
    return await client.from(POSTS_TABLE).update({ content: editor.value, title: title.value }).eq('slug', slug)
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

onMounted(() => {
  // update view count if user still on the page for 3 seconds
  setTimeout(async () => {
    const { data: postAnalytic, error } = await client
      .from(POST_ANALYTICS_TABLE)
      .select('id, viewer')
      .eq('post_id', post?.value?.id)
      .single<{ id: string; viewer: number }>()

    if (error) throw new Error(error.message)

    await client
      .from(POST_ANALYTICS_TABLE)
      .update({ viewer: postAnalytic.viewer + 1 })
      .eq('id', postAnalytic?.id)
  }, 3000)
})
</script>

<template>
  <div class="container max-w-2xl mt-4 flex flex-col">
    <Button
      v-if="post?.ableToUpdate"
      text
      severity="secondary"
      class="ml-auto"
      size="small"
      icon="i-ph:pencil"
      title="Edit this article"
      label="Edit"
      @click="toggleEdit()"
    />

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
