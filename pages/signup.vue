<script setup lang="ts">
import { Database } from '@/types/database'

useHead({
  title: 'Sign Up',
})

definePageMeta({
  layout: 'auth',
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
    .from(USERS_TABLE)
    .insert({ username, fullname: signUpForm.fullname, id: authData.user?.id })
    .select('fullname')

  alert(`Welcome ${data?.length && data[0].fullname}!`)
  await navigateTo('/')
}
</script>

<template>
  <div class="p8 shadow b mt8">
    <h1 class="text-4xl font-bold leading-relaxed">Sign Up</h1>
    <form @submit.prevent="onSignUp" class="flex flex-col gap-4 mt-6">
      <div role="group" class="form-group">
        <label for="fullname">Fullname</label>
        <InputText id="fullname" v-model="signUpForm.fullname" />
      </div>
      <div role="group" class="form-group">
        <label for="email">Email</label>
        <InputText type="email" id="email" v-model="signUpForm.email" />
      </div>
      <div role="group" class="form-group">
        <label for="password">Password</label>
        <Password id="password" toggle-mask class="w-full" input-class="w-full" v-model="signUpForm.password" />
      </div>
      <div class="form-group" role="group">
        <label for="rePassword">Repeat Password</label>
        <Password
          id="rePassword"
          toggle-mask
          class="w-full"
          input-class="w-full"
          :feedback="false"
          v-model="signUpForm.repeatPassword"
        />
      </div>

      <Button type="submit" label="Sign Up" />
      <div class="mt-4">
        <span>Already have an account?</span>
        <NuxtLink class="hover:underline c-blue7 focus:ring outline-none transition ml-1" to="/login">Login</NuxtLink>
      </div>
    </form>
  </div>
</template>
