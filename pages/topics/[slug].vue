<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
import UpdateTopic from 'components/update-topic.vue'

import { Database, Topic } from '~/types/database'

const client = useSupabaseClient<Database>()
const route = useRoute()
// @ts-ignore
const slug: string = route.params.slug

const [isEdit, toggleEdit] = useToggle(false)
const [isLoading, toggleLoading] = useToggle(false)
const { data: topic } = await useAsyncData(slug, async () => {
  const { data } = await client.from('topics').select('*, users ( id, username ,avatar_url )').eq('slug', slug).single()

  return data as Topic & { users: { id: string; username: string; avatar_url: string } }
})

const editor = ref(topic?.value?.content ?? '')
const title = ref(topic?.value?.title ?? '')

const dateFormatSystem = computed(() => {
  return new Date(topic.value?.created_at ?? '').toUTCString()
})

const dateFormatDisplay = computed(() => {
  return useDateFormat(topic.value?.created_at, 'DD MMM YYYY', { locales: 'id' }).value
})

async function updateTopic() {
  try {
    toggleLoading()
    return await client.from('topics').update({ content: editor.value, title: title.value }).eq('slug', slug)
  } catch (error) {
    console.error(error)
  } finally {
    await refreshNuxtData(slug)
    toggleLoading()
    toggleEdit()
  }
}

useHead({
  title: topic.value?.title,
})
</script>

<template>
  <div class="container max-w-2xl">
    <button
      class="ml-auto px-1 text-sm c-gray-6 hover:c-blue inline-flex gap-1"
      title="Edit this article"
      @click="toggleEdit()"
    >
      <i class="i-ph:pencil w-4 h-4"></i>
      Edit
    </button>
    <template v-if="isEdit">
      <UpdateTopic
        :isLoading="isLoading"
        v-model:editor="editor"
        v-model:title="title"
        @toggleEdit="toggleEdit"
        @updateTopic="updateTopic"
      />
    </template>
    <article v-else class="flex flex-col">
      <h1 class="text-4xl font-bold leading-relaxed text-balance">{{ title }}</h1>
      <div class="flex justify-between items-center text-sm c-gray6 my-4 b-b pb-4">
        <div class="inline-flex items-center gap-2">
          <ProfilePicture
            :username="topic?.users.username"
            :src="topic?.users.avatar_url"
            :width="35"
            :height="35"
            loading="lazy"
            decoding="async"
          />
          <NuxtLink class="hover:bg-gray1" :to="'/' + topic?.users.username">@{{ topic?.users.username }} </NuxtLink>
        </div>
        <time :datetime="dateFormatSystem" :title="dateFormatSystem">
          {{ dateFormatDisplay }}
        </time>
      </div>

      <div class="prose text-base xl:text-lg" v-html="topic?.content"></div>
    </article>
  </div>
</template>
