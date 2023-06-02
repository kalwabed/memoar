<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'

import { Database, Topic } from '~/types/database'

const client = useSupabaseClient<Database>()
const route = useRoute()
// @ts-ignore
const slug: string = route.params.slug

const { data: topic } = await useAsyncData(slug, async () => {
  const { data } = await client.from('topics').select('*, users ( id, username ,avatar_url )').eq('slug', slug).single()

  return data as Topic & { users: { id: string; username: string; avatar_url: string } }
})

const dateFormatSystem = computed(() => {
  return new Date(topic.value?.created_at ?? '').toISOString()
})

const dateFormatDisplay = computed(() => {
  return useDateFormat(topic.value?.created_at, 'DD MMM YYYY').value
})

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
          <ProfilePicture
            :username="topic?.users.username"
            :src="topic?.users.avatar_url"
            :width="35"
            :height="35"
            loading="lazy"
            decoding="async"
          />
          <NuxtLink :to="'/' + topic?.users.username">@{{ topic?.users.username }} </NuxtLink>
        </div>
        <time :datetime="dateFormatSystem" :title="dateFormatSystem">
          {{ dateFormatDisplay }}
        </time>
      </div>
      <div v-html="topic?.content"></div>
    </article>
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
