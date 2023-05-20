<script setup lang="ts">
import { Database } from '~/types/database'
import { useDateFormat } from '@vueuse/core'

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

const { data: topic } = await useAsyncData(slug, async () => {
  const { data } = (await client.from('topics').select('*').eq('slug', slug).single()) as { data: Topic }

  return data
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
        <span> Issued by: anybody </span>
        <time :datetime="dateFormatSystem" :title="dateFormatSystem">
          {{ dateFormatDisplay }}
        </time>
      </div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, placeat facere? Ad laudantium harum maiores?
        Nulla illum facere exercitationem debitis aut maiores. Pariatur voluptatibus harum eos doloremque magni error
        nisi.
      </p>
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
</style>
