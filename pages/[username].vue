<script setup lang="ts">
import { Database } from '~/types/database'

const editorValue = ref('')
const title = ref('')
const isAddPost = ref(false)

const route = useRoute()

const client = useSupabaseClient<Database>()
const userAuth = useSupabaseUser()

// @ts-ignore
const username: string = route.params.username

const { data: user } = await useAsyncData(username, async () => {
  const { data } = await client.from(USERS_TABLE).select('*').eq('username', username).single()

  return data
})

const isCurrentUser = computed(() => {
  return userAuth?.value?.id === user?.value?.id
})

const onSubmit = async () => {
  try {
    const { data: post } = await client
      .from(POSTS_TABLE)
      .insert([
        {
          title: title.value,
          user_id: userAuth.value?.id,
          content: editorValue.value,
          slug: generateSlug(title.value),
        },
      ])
      .select('id')
      .single<{ id: string }>()
    await client.from(POST_ANALYTICS_TABLE).insert({ post_id: post?.id })

    editorValue.value = ''
    title.value = ''
    isAddPost.value = false
  } catch (error) {
    console.error(error)
  } finally {
    await refreshNuxtData(`${userAuth.value?.id}-posts`)
  }
}

const logout = async () => {
  await client.auth.signOut()
  await navigateTo('/login')
}

useHead({
  title: username,
})
</script>

<template>
  <div class="container mt-8">
    <div v-if="user?.id">
      <div class="flex gap-4 pb-4 mb-3 border-b">
        <ProfilePicture :src="user?.avatar_url" :username="username" alt="profile" :width="70" :height="70" />
        <div class="flex flex-col">
          <h3 class="text-2xl font-bold leading-relaxed">{{ user?.fullname }}</h3>
          <span>@{{ username }}</span>
        </div>
        <button @click="logout" class="ml-auto btn-red text-sm px-4 py-1">
          <span>Sign out</span>
          <i class="i-ph-sign-out w4 h4" />
        </button>
      </div>
      <form @submit.prevent="onSubmit" v-if="isAddPost" class="mt-4 flex flex-col gap-4">
        <div class="form-group">
          <label for="title">Title</label>
          <input type="text" id="title" class="input" v-model="title" />
        </div>
        <div class="form-group">
          <label for="content">Content</label>
          <LazyEditor contentType="html" id="content" v-model:content="editorValue" />
        </div>
        <div class="mt-4 inline-flex gap-3">
          <button class="btn-gray py-1 text-sm" @click.stop.prevent="isAddPost = false">Cancel</button>
          <button type="submit" class="btn-teal py-1 text-sm">Send</button>
        </div>
      </form>
      <div class="flex items-center justify-between">
        <h4 v-if="isCurrentUser" class="my-4 text-xl font-bold leading-relaxed">Your Posts</h4>
        <button v-if="isCurrentUser" v-show="!isAddPost" @click="isAddPost = true" class="btn-blue">Add Post</button>
      </div>
      <Suspense>
        <Posts :enable-delete="isCurrentUser" :user-id="user?.id" />
      </Suspense>
    </div>

    <div v-else class="flex flex-col items-center justify-center gap-4 text-center p-8 b b-gray rd">
      <h1>404</h1>
      <p>Sorry, we couldn't find the page you're looking for.</p>
      <button class="btn-red" @click="$router.back()">Go back</button>
    </div>
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
