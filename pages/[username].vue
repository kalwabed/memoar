<script setup lang="ts">
import { Database, User } from '~/types/database'

const route = useRoute()

const client = useSupabaseClient<Database>()

// @ts-ignore
const username: string = route.params.username

const { data: user } = await useAsyncData(username, async () => {
  const { data } = (await client.from('users').select('*').eq('username', username).single()) as { data: User }

  return data
})

useHead({
  title: username,
})
</script>

<template>
  <div class="paper container">
    <div class="profile">
      <img :src="user?.avatar_url" alt="profile" width="100" height="100" />
      <div class="name">
        <h3>{{ user?.fullname }}</h3>
        <span>@{{ username }}</span>
      </div>
      <button class="btn-small paper-btn btn-secondary">Add Topic</button>
    </div>
    <h4 class="margin-top">Your Topics</h4>
    <Topics :user-id="user?.id" />
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
</style>
