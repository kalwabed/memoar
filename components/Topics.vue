<script setup lang="ts">
import { Database, Topic } from '~/types/database'

const props = defineProps<{
  userId?: string
}>()

const client = useSupabaseClient<Database>()

const { data: topics } = await useAsyncData(props.userId ? `${props.userId}-topics` : 'topics', async () => {
  if (props.userId) {
    const { data: topicsByUserId } = await client
      .from('topics')
      .select('*')
      .eq('user_id', props.userId)
      .order('created_at', { ascending: false })

    return topicsByUserId as Topic[]
  }
  const { data: allTopics } = await client.from('topics').select('*').order('created_at', { ascending: false })

  return allTopics as Topic[]
})
</script>

<template>
  <ul>
    <li class="margin-top-small" v-for="topic in topics" :key="topic.id">
      <NuxtLink :to="'/topics/' + topic.slug">{{ topic.title }}</NuxtLink>
    </li>
  </ul>
</template>
