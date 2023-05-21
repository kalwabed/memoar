<script setup lang="ts">
useHead({
  title: 'Login',
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
  <div class="paper container">
    <h1>Login</h1>
    <form @submit.prevent="onLogin">
      <div role="group" class="form-group">
        <label for="email">Email</label>
        <input type="email" class="input-block" id="email" v-model="loginForm.email" />
      </div>
      <div class="form-group" role="group">
        <label for="password">Password</label>
        <input type="password" class="input-block" id="password" v-model="loginForm.password" />
      </div>
      <button class="btn-primary" type="submit">Login</button>
      <div class="margin-top-large">
        <span> Don't have an account? </span>
        <NuxtLink to="/signup">Sign up</NuxtLink>
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
