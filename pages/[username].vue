<script setup lang="ts">
import { Database } from '~/types/database'

const { user: userStore } = useAuthStore()
const route = useRoute()
const client = useSupabaseClient<Database>()

// @ts-ignore
const username: string = route.params.username

const { data: user } = await useAsyncData(username, async () => {
  const { data } = await client.from(USERS_TABLE).select('*').eq('username', username).single()

  return data
})

const isCurrentUser = computed(() => {
  return userStore?.value?.id === user?.value?.id
})

useHead({
  title: username,
})
</script>

<template>
  <div class="container mt-8">
    <div v-if="user?.id">
      <ProfileMeta :user="user" />

      <div class="flex items-center justify-between">
        <h4 v-if="isCurrentUser" class="my-4 text-xl font-bold leading-relaxed">Your Posts</h4>
        <NuxtLink v-if="isCurrentUser" to="/new" class="btn-blue btn-sm">Write New Post</NuxtLink>
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
