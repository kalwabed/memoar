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
  <div class="container mt-12">
    <h1 class="text-4xl font-bold leading-relaxed">Login</h1>
    <form @submit.prevent="onLogin" class="flex flex-col gap-4 mt-8">
      <div role="group" class="flex flex-col gap-2">
        <label for="email" class="font-medium">Email</label>
        <input type="email" class="px-4 py-2 rd b b-gray3 hover:b-gray4 transition outline-none focus:(ring-2 b-transparent)" id="email" v-model="loginForm.email" />
      </div>
      <div class="flex flex-col gap-2" role="group">
        <label for="password">Password</label>
        <input type="password" class="px-4 py-2 rd b b-gray3 hover:b-gray4 transition outline-none focus:(ring-2 b-transparent)" id="password" v-model="loginForm.password" />
      </div>
      <button class="py-2 px-4 rd text-center font-semibold outline-none b b-teal3 bg-teal2 c-teal9 hover:(bg-teal1) transition" type="submit">Login</button>
      <div class="margin-top-large">
        <span> Don't have an account? </span>
        <NuxtLink class="hover:underline c-blue7 focus:ring outline-none transition" to="/signup">Sign up</NuxtLink>
      </div>
    </form>
  </div>
</template>

<style scoped>
.container {
  max-width: 600px;
  margin-top: 5rem;
}
</style>
