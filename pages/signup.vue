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
    .from('users')
    .insert({ username, fullname: signUpForm.fullname, id: authData.user?.id })
    .select('fullname')

  alert(`Welcome ${data?.length && data[0].fullname}!`)
  await navigateTo('/')
}
</script>

<template>
  <div class="container paper">
    <h1 class="text-4xl font-bold leading-relaxed">Sign Up</h1>
    <form @submit.prevent="onSignUp" class="flex flex-col gap-4 mt-4">
      <div role="group" class="flex flex-col gap-2">
        <label for="fullname">Fullname</label>
        <input
          id="fullname"
          class="px-4 py-2 rd b b-gray3 hover:b-gray4 transition outline-none focus:(ring-2 b-transparent)"
          v-model="signUpForm.fullname"
        />
      </div>
      <div role="group" class="flex flex-col gap-2">
        <label for="email">Email</label>
        <input
          type="email"
          class="px-4 py-2 rd b b-gray3 hover:b-gray4 transition outline-none focus:(ring-2 b-transparent)"
          id="email"
          v-model="signUpForm.email"
        />
      </div>
      <div role="group" class="flex flex-col gap-2">
        <label for="password">Password</label>
        <input
          type="password"
          class="px-4 py-2 rd b b-gray3 hover:b-gray4 transition outline-none focus:(ring-2 b-transparent)"
          id="password"
          v-model="signUpForm.password"
        />
      </div>
      <div class="flex flex-col gap-2" role="group">
        <label for="rePassword">Repeat Password</label>
        <input
          type="password"
          class="px-4 py-2 rd b b-gray3 hover:b-gray4 transition outline-none focus:(ring-2 b-transparent)"
          id="rePassword"
          v-model="signUpForm.repeatPassword"
        />
      </div>

      <button
        class="py-2 px-4 rd text-center font-semibold outline-none b b-teal3 bg-teal2 c-teal9 hover:(bg-teal1) transition"
        type="submit"
      >
        Sign Up
      </button>
      <div class="mt-4">
        <span>Already have an account?</span>
        <NuxtLink class="hover:underline c-blue7 focus:ring outline-none transition" to="/login">Login</NuxtLink>
      </div>
    </form>
  </div>
</template>

<style scoped>
.container {
  max-width: 600px;
  margin-top: 4rem;
}
</style>
