<script setup lang="ts">
import { useToast } from 'primevue/usetoast'

useHead({
  title: 'Login',
})

definePageMeta({
  layout: 'auth',
})

const authClient = useSupabaseAuthClient()
const toast = useToast()

const loginForm = reactive({
  email: '',
  password: '',
})

const onLogin = async () => {
  const { error } = await authClient.auth.signInWithPassword(loginForm)

  if (error) {
    toast.add({
      severity: 'error',
      summary: 'Login failed',
      detail: error.message,
      life: 3000,
    })
    return
  }

  await navigateTo('/')
}
</script>

<template>
  <div class="p8 shadow b mt8">
    <h1 class="text-4xl font-bold leading-relaxed">Login</h1>
    <p class="c-gray5">Somehow you need to login to get access.</p>
    <form @submit.prevent="onLogin" class="flex flex-col gap-4 mt-6">
      <div role="group" class="form-group">
        <label for="email">Email</label>
        <InputText type="email" id="email" v-model="loginForm.email" />
      </div>
      <div class="form-group" role="group">
        <label for="password">Password</label>
        <Password
          id="password"
          input-class="w-full"
          class="w-full"
          v-model="loginForm.password"
          :feedback="false"
          toggle-mask
        />
      </div>
      <Button type="submit" label="Login" />
      <div class="mt-2">
        <span> Don't have an account? </span>
        <NuxtLink class="hover:underline c-blue7 focus:ring outline-none transition" to="/signup">Sign up</NuxtLink>
        <p>
          Get back to
          <NuxtLink class="hover:underline c-blue7 focus:ring outline-none transition" to="/">Home</NuxtLink>
        </p>
      </div>
    </form>
  </div>
</template>
