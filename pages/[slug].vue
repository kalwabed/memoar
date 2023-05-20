<script setup lang="ts">
import { Database } from '~/types/database'

const client = useSupabaseClient<Database>()
const route = useRoute()
// @ts-ignore
const slug: string = route.params.slug

const { data: topic } = await useAsyncData(slug, async () => {
  const { data } = await client.from('topics').select('*').eq('slug', slug).single()

  return data
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
        <time
          :datetime="new Date(topic?.created_at).toISOString()"
          :title="new Date(topic?.created_at).toLocaleString()"
        >
          {{ new Date(topic?.created_at).toLocaleDateString() }}
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
