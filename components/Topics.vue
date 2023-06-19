<script setup lang="ts">
import { Database, Topic } from '~/types/database'

const props = defineProps<{
  userId?: string
  enableDelete?: boolean
}>()

const client = useSupabaseClient<Database>()

const { data: topics } = await useAsyncData(props.userId ? `${props.userId}-topics` : 'topics', async () => {
  if (props.userId) {
    const { data: topicsByUserId } = await client
      .from('topics')
      .select('*, users(username)')
      .eq('user_id', props.userId)
      .order('created_at', { ascending: false })

    return topicsByUserId as (Topic & { users: { username: string } })[]
  }
  const { data: allTopics } = await client
    .from('topics')
    .select('*, users(username)')
    .order('created_at', { ascending: false })

  return allTopics as (Topic & { users: { username: string } })[]
})

async function deleteArticle(id: string) {
  const isConfirm = confirm('Are you sure you want to delete this article?')
  if (!isConfirm || !id) return

  try {
    await client.from('topics').delete().eq('id', id)
  } catch (error) {
    console.error(error)
  } finally {
    await refreshNuxtData(`${props.userId}-topics`)
  }
}
</script>

<template>
  <div>
    <NuxtLink v-for="topic in topics" v-if="topics?.length" :key="topic.id" :to="'/topics/' + topic.slug">
      <CardTopic
        :topicTitle="topic.title"
        :topicId="topic.id"
        :uploadedAt="topic.created_at"
        :username="topic.users.username"
        :enableDelete="$props.enableDelete"
        @deleteArticle="deleteArticle"
      />
    </NuxtLink>

    <p v-else>No topics yet.</p>
  </div>
</template>

<style scoped>
a {
  position: relative;
  z-index: 1;
}
</style>
