<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'

import { Database } from '~/types/database'

interface Topic {
  id: string
  title: string
  slug: string
  content: string
  updated_at: string
  created_at: string
}

const client = useSupabaseClient<Database>()
const route = useRoute()
// @ts-ignore
const slug: string = route.params.slug

const editorValue = ref('')

const { data: topic, refresh } = await useAsyncData(slug, async () => {
  const { data } = (await client
    .from('topics')
    .select('*, users ( id, username ,avatar_url )')
    .eq('slug', slug)
    .single()) as { data: Topic & { users: { id: string; username: string; avatar_url: string } } }

  return data
})

const dateFormatSystem = computed(() => {
  return new Date(topic.value?.created_at ?? '').toISOString()
})

const dateFormatDisplay = computed(() => {
  return useDateFormat(topic.value?.created_at, 'DD MMM YYYY').value
})

const onSubmit = async () => {
  await client.from('topics').update({ content: editorValue.value }).eq('slug', slug)
  await refresh()
}

useHead({
  title: topic.value?.title,
})
</script>

<template>
  <div class="container">
    <article class="article">
      <h1 class="article-title">{{ topic?.title }}</h1>
      <div class="article-meta">
        <div class="profile">
          <img :src="topic?.users?.avatar_url" alt="Profile" loading="lazy" decoding="async" width="20" height="20" />
          <span>@{{ topic?.users.username }} </span>
        </div>
        <time :datetime="dateFormatSystem" :title="dateFormatSystem">
          {{ dateFormatDisplay }}
        </time>
      </div>
      <div v-html="topic?.content"></div>
    </article>

    <form @submit.prevent="onSubmit">
      <LazyEditor
        contentType="html"
        v-model:content="editorValue"
        :toolbar="['bold', 'italic', 'underline', 'code', 'strike', 'link']"
      />
      <button type="submit" class="paper-btn btn-small margin-top">Update</button>
    </form>
  </div>
</template>

<style scoped>
.article-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  border-bottom: 1px solid #ccc;
  padding-bottom: 1rem;
}

.profile {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
</style>
