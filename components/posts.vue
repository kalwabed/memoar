<script setup lang="ts">
// ignore ts error in this file because posts type is such a mess.
// @ts-nocheck
import { Database } from '~/types/database'

const props = defineProps<{
  userId?: string
  enableDelete?: boolean
}>()

const client = useSupabaseClient<Database>()

const { data: posts } = await useAsyncData(props.userId ? `${props.userId}-posts` : 'posts', async () => {
  if (props.userId) {
    const { data: postsByUserId } = await client
      .from(POSTS_TABLE)
      .select('*, users(username)')
      .eq('user_id', props.userId)
      .order('created_at', { ascending: false })

    return postsByUserId
  }
  const { data: allPosts } = await client
    .from(POSTS_TABLE)
    .select('*, users(username)')
    .order('created_at', { ascending: false })

  return allPosts
})

async function deleteArticle(id: string) {
  const isConfirm = confirm('Are you sure you want to delete this article?')
  if (!isConfirm || !id) return

  try {
    await client.from(POSTS_TABLE).delete().eq('id', id)
  } catch (error) {
    console.error(error)
  } finally {
    await refreshNuxtData(`${props.userId}-posts`)
  }
}
</script>

<template>
  <div>
    <div class="relative z-1" v-for="post in posts" v-if="posts?.length" :key="post.id">
      <CardPost :post="post" :enableDelete="$props.enableDelete" @deleteArticle="deleteArticle" />
    </div>

    <p v-else>No posts yet.</p>
  </div>
</template>
