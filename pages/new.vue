<script setup lang="ts">
import { useToast } from 'primevue/usetoast'
import { Database } from '~/types/database'

useHead({
  title: 'New post',
})

const editorValue = ref('')
const title = ref('')

const client = useSupabaseClient<Database>()
const { user: userStore } = useAuthStore()
const toast = useToast()

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

    toast.add({
      severity: 'success',
      summary: 'Post created',
      detail: 'Your post has been created successfully',
      life: 3000,
    })

    await navigateTo(userStore.value.username)
  } catch (error) {
    console.error(error)
  } finally {
    await refreshNuxtData(`${userStore.value?.id}-posts`)
  }
}
</script>

<template>
  <div class="container mt4">
    <NuxtLink :to="userStore?.username">
      <Button icon="i-ph:arrow-left" size="small" label="My Profile" link />
    </NuxtLink>
    <h1 class="text-4xl font-bold leading-relaxed mt4">Write a New Post</h1>
    <form @submit.prevent="onSubmit" class="mt-4 flex flex-col gap-4">
      <div class="form-group">
        <label for="title" class="font-medium">Title</label>
        <InputText type="text" id="title" class="w1/2" size="small" v-model="title" />
      </div>
      <div class="form-group">
        <label for="content">Content</label>
        <LazyEditor contentType="html" id="content" v-model:content="editorValue" />
      </div>
      <div class="mt-4 inline-flex gap-3">
        <Button label="Cancel" size="small" type="reset" severity="secondary" outlined @click="$router.back()" />
        <Button label="Send" size="small" type="submit" />
      </div>
    </form>
  </div>
</template>
