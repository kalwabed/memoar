<script setup lang="ts">
import { User } from '~/types/database'

const authClient = useSupabaseAuthClient()
const client = useSupabaseClient()

const { data: userAuth } = await authClient.auth.getUser()

const { data: user } = await useAsyncData(`session-${userAuth?.user?.id}`, async () => {
  const { data, error } = await client.from('users').select('*').eq('id', userAuth?.user?.id).single()

  if (error) throw error

  return data as User
})
</script>

<template>
  <nav class="w-full flex items-center max-w-screen-xl px-4 lg:px0 py4 mx-auto justify-between">
    <NuxtLink class="text-3xl font-bold" to="/">Memoar</NuxtLink>

    <ul>
      <li>
        <NuxtLink class="underline font-medium" title="to Profile page" :to="'/' + user?.username"
          >@{{ user?.username }}</NuxtLink
        >
      </li>
    </ul>
  </nav>
</template>
