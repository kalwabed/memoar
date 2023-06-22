<script setup lang="ts">
useHead({
  title: 'Login',
})

definePageMeta({
  layout: 'auth',
})

const authClient = useSupabaseAuthClient()

const loginForm = reactive({
  email: '',
  password: '',
})

const onLogin = async () => {
  const { error } = await authClient.auth.signInWithPassword(loginForm)

  if (error) {
    alert(error.message)
    return
  }

  await navigateTo('/')
}
</script>

<template>
  <div class="max-w-xl w-full mx-auto mt-20 h-full">
    <h1 class="text-4xl font-bold leading-relaxed">Login</h1>
    <p class="c-gray5">Somehow you need to login to get access.</p>
    <form @submit.prevent="onLogin" class="flex flex-col gap-4 mt-4">
      <div role="group" class="flex flex-col gap-2">
        <label for="email" class="font-medium">Email</label>
        <input
          type="email"
          class="px-4 py-2 rd b b-gray3 hover:b-gray4 transition outline-none focus:(ring-2 b-transparent)"
          id="email"
          v-model="loginForm.email"
        />
      </div>
      <div class="flex flex-col gap-2" role="group">
        <label for="password">Password</label>
        <input
          type="password"
          class="px-4 py-2 rd b b-gray3 hover:b-gray4 transition outline-none focus:(ring-2 b-transparent)"
          id="password"
          v-model="loginForm.password"
        />
      </div>
      <button class="btn-teal" type="submit">Login</button>
      <div class="mt-4">
        <span> Don't have an account? </span>
        <NuxtLink class="hover:underline c-blue7 focus:ring outline-none transition" to="/signup">Sign up</NuxtLink>
      </div>
    </form>
  </div>
</template>
