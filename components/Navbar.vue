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
  <nav class="container split-nav">
    <div class="nav-brand">
      <h3>
        <NuxtLink to="/">undiscus</NuxtLink>
      </h3>
    </div>
    <div class="collapsible">
      <input type="checkbox" name="collapsible1" id="collapsible1" />
      <label for="collapsible1">
        <div class="bar1"></div>
        <div class="bar2"></div>
        <div class="bar3"></div>
      </label>
      <div class="collapsible-body">
        <ul class="inline">
          <li>
            <NuxtLink :to="user?.username">@{{ user?.username }}</NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
