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
  const { error, data: authData } = await authClient.auth.signUp(signUpForm)

  if (error) {
    alert(error.message)
    return
  }

  const username = uniqueUsername(signUpForm.fullname)

  const { data } = await dbClient
    .from('users')
    .insert({ username, fullname: signUpForm.fullname, id: authData.user?.id })
    .select('fullname')

  alert(`Welcome ${data?.length && data[0].fullname}!`)
  await navigateTo('/')
}
</script>

<template>
  <div class="container paper">
    <h1>Sign Up</h1>
    <form @submit.prevent="onSignUp">
      <div class="form-group" role="group">
        <label for="fullname">Fullname</label>
        <input id="fullname" class="input-block" v-model="signUpForm.fullname" />
      </div>
      <div class="form-group" role="group">
        <label for="email">Email</label>
        <input type="email" class="input-block" id="email" v-model="signUpForm.email" />
      </div>
      <div class="form-group" role="group">
        <label for="password">Password</label>
        <input type="password" class="input-block" id="password" v-model="signUpForm.password" />
      </div>
      <div class="form-group" role="group">
        <label for="rePassword">Repeat Password</label>
        <input type="password" class="input-block" id="rePassword" v-model="signUpForm.repeatPassword" />
      </div>

      <button class="btn-primary" type="submit">Sign Up</button>
      <div class="margin-top-large"><span>Already have an account?</span> <NuxtLink to="/login">Login</NuxtLink></div>
    </form>
  </div>
</template>

<style scoped>
.container {
  max-width: 600px;
  margin-top: 4rem;
}
</style>
