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
  <div>
    <h1 class="text-4xl font-bold leading-relaxed">Login</h1>
    <p class="c-gray5">Somehow you need to login to get access.</p>
    <form @submit.prevent="onLogin" class="flex flex-col gap-4 mt-4">
      <div role="group" class="form-group">
        <label for="email">Email</label>
        <input type="email" class="input" id="email" v-model="loginForm.email" />
      </div>
      <div class="form-group" role="group">
        <label for="password">Password</label>
        <input type="password" class="input" id="password" v-model="loginForm.password" />
      </div>
      <button class="btn-teal" type="submit">Login</button>
      <div class="mt-4">
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
