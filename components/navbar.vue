<script setup lang="ts">
import { Database } from 'types/database'
import Logo from '~/assets/logo.jpg'

const authClient = useSupabaseAuthClient()
const client = useSupabaseClient<Database>()
const { user } = useAuthStore()

const { data: userAuth } = await authClient.auth.getUser()

await useAsyncData(`session-${userAuth?.user?.id}`, async () => {
  if (userAuth?.user) {
    const { data, error } = await client.from(USERS_TABLE).select('*').eq('id', userAuth?.user?.id).single()

    if (error) throw new Error(error.message)

    user.value = data
    return data
  }
})
</script>

<template>
  <nav class="w-full grid grid-cols-3 items-center max-w-screen-lg px-4 lg:px0 py4 mx-auto">
    <NuxtLink to="/" class="inline-flex items-center gap-1.5">
      <img :src="Logo" alt="Logo" class="w5 h5 rd-full" />
      <span class="text-2xl font-bold font-display c-teal9">memoar.in</span>
    </NuxtLink>

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

    <div class="text-right" data-testid="btn-login">
      <NuxtLink v-if="user" class="header_link" title="to profile page" :to="'/' + user?.username"
        >@{{ user?.username }}</NuxtLink
      >
      <NuxtLink v-else class="header_link" title="to login page" to="/login">Login</NuxtLink>
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
