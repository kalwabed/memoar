<script setup lang="ts">
import { Database } from '~/types/database'

useHead({
  title: 'New post',
})

const editorValue = ref('')
const title = ref('')

const client = useSupabaseClient<Database>()
const { user: userStore } = useAuthStore()

const onSubmit = async () => {
  try {
    const { data: post } = await client
      .from(POSTS_TABLE)
      .insert([
        {
          title: title.value,
          user_id: userStore.value?.id,
          content: editorValue.value,
          slug: generateSlug(title.value),
        },
      ])
      .select('id')
      .single<{ id: string }>()
    await client.from(POST_ANALYTICS_TABLE).insert({ post_id: post?.id })

    editorValue.value = ''
    title.value = ''
  } catch (error) {
    console.error(error)
  } finally {
    await refreshNuxtData(`${userStore.value?.id}-posts`)
  }
}
</script>

<template>
  <div class="container mt4">
    <NuxtLink :to="userStore.username" class="text-sm font-medium c-gray5 hover:c-gray4 transition"
      >&larr; Profile</NuxtLink
    >
    <h1 class="text-4xl font-bold leading-relaxed mt4">Write a New Post</h1>
    <form @submit.prevent="onSubmit" class="mt-4 flex flex-col gap-4">
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" id="title" class="input w1/2" v-model="title" />
      </div>
      <div class="form-group">
        <label for="content">Content</label>
        <LazyEditor contentType="html" id="content" v-model:content="editorValue" />
      </div>
      <div class="mt-4 inline-flex gap-3">
        <button class="btn-gray py-1 text-sm" type="reset">Cancel</button>
        <button type="submit" class="btn-teal py-1 text-sm">Submit</button>
      </div>
    </form>
  </div>
</template>
