<script setup lang="ts">
import { Database, User } from '~/types/database'

const route = useRoute()

const client = useSupabaseClient<Database>()
const userAuth = useSupabaseUser()

// @ts-ignore
const username: string = route.params.username

const { data: user } = await useAsyncData(username, async () => {
  const { data } = (await client.from('users').select('*').eq('username', username).single()) as { data: User }

  return data
})

const isCurrentUser = computed(() => {
  return userAuth?.value?.id === user?.value?.id
})

useHead({
  title: username,
})
</script>

<template>
  <div class="paper container">
    <div v-if="user?.id">
      <div class="profile">
        <img :src="user?.avatar_url" alt="profile" width="100" height="100" />
        <div class="name">
          <h3>{{ user?.fullname }}</h3>
          <span>@{{ username }}</span>
        </div>
        <button v-if="isCurrentUser" class="btn-small btn-secondary">Add Topic</button>
      </div>
      <h4 v-if="isCurrentUser" class="margin-top">Your Topics</h4>
      <Suspense>
        <Topics :user-id="user?.id" />
      </Suspense>
    </div>

    <div class="error" v-else>
      <h1>404</h1>
      <p>Sorry, we couldn't find the page you're looking for.</p>
      <button class="btn-small btn-primary margin-top" @click="$router.back()">Go back</button>
    </div>
  </div>
</template>

<style scoped>
.profile {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  padding-bottom: 1rem;
  width: 100%;
  border-bottom: 1px solid #eaeaea;
}

.profile button {
  margin-left: auto;
}

.error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  text-align: center;
  padding: 2rem;
  border: 1px solid #eaeaea;
  border-radius: 0.5rem;
}
</style>
