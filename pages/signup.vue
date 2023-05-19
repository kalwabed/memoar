<script setup lang="ts">
import { Database } from '@/types/database'

useHead({
  title: 'Sign Up',
})

const authClient = useSupabaseAuthClient()
const dbClient = useSupabaseClient<Database>()

const signUpForm = reactive({
  fullname: '',
  email: '',
  password: '',
  repeatPassword: '',
})

const onSignUp = async () => {
  const { error } = await authClient.auth.signUp(signUpForm)

  if (error) {
    alert(error.message)
    return
  }

  const username = uniqueUsername(signUpForm.fullname)

  const { data } = await dbClient.from('users').insert({ username, fullname: signUpForm.fullname }).select('fullname')

  alert(`Welcome ${data?.length && data[0].fullname}!`)
  await navigateTo('/')
}
</script>

<template>
  <div class="container">
    <h1>Sign Up</h1>
    <form @submit.prevent="onSignUp">
      <div class="input-group" role="group">
        <label for="fullname">Fullname</label>
        <input id="fullname" v-model="signUpForm.fullname" />
      </div>
      <div class="input-group" role="group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="signUpForm.email" />
      </div>
      <div class="input-group" role="group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="signUpForm.password" />
      </div>
      <div class="input-group" role="group">
        <label for="rePassword">Repeat Password</label>
        <input type="password" id="rePassword" v-model="signUpForm.repeatPassword" />
      </div>

      <button type="submit">Sign up</button>
      <p>Already have an account? <NuxtLink to="/login">Login</NuxtLink></p>
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
