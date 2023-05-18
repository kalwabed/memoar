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
  <div class="container">
    <h1>Login</h1>
    <form @submit.prevent="onLogin">
      <div class="input-group" role="group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="loginForm.email" />
      </div>
      <div class="input-group" role="group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="loginForm.password" />
      </div>

      <button type="submit">Login</button>
      <p>Don't have an account? <NuxtLink to="/signup">Sign up</NuxtLink></p>
    </form>
  </div>
</template>

<style scoped>
.container {
  max-width: 600px;
  margin: 10rem auto;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

h1 {
  margin-bottom: 1rem;
  font-size: 2rem;
  font-weight: bold;
}

form {
  display: flex;
  flex-direction: column;
}

.input-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

.input-group label {
  margin-bottom: 0.5rem;
}

.input-group input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.input-group input:focus {
  outline: none;
  border-color: #333;
}

button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background-color: #333;
  color: #fff;
  cursor: pointer;
  margin-left: auto;
}
</style>
