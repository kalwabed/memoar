<script setup lang="ts">
import Logo from '~/assets/logo.jpg'
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
  <nav class="w-full grid grid-cols-3 items-center max-w-screen-lg px-4 lg:px0 py4 mx-auto">
    <div class="inline-flex items-center gap-3">
      <img :src="Logo" alt="Logo" class="w7 h7 rd-full" />
      <NuxtLink class="text-xl font-bold" to="/">Memoar</NuxtLink>
    </div>

    <ul class="text-center inline-flex gap3 justify-center">
      <li>
        <NuxtLink class="header_link" title="to Home page" to="/">Home</NuxtLink>
      </li>
      <li>
        <NuxtLink class="header_link" title="to Popular page" to="/populars">Popular</NuxtLink>
      </li>
      <li>
        <NuxtLink class="header_link" title="to About page" to="/about">About</NuxtLink>
      </li>
    </ul>

    <div class="text-right">
      <NuxtLink class="header_link" title="to Profile page" :to="'/' + user?.username">@{{ user?.username }}</NuxtLink>
    </div>
  </nav>
</template>

<style scoped>
.header_link {
  @apply text-sm font-medium rd-lg p2 pb.8 transition b-b-2 b-transparent outline-none hover:(b-slate3 bg-slate1) focus:(b-teal);
}

.router-link-active {
  @apply b-teal;
}
</style>
