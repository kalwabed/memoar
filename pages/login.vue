<script setup lang="ts">
import { useToast } from 'primevue/usetoast'
import * as zod from 'zod'

useHead({
  title: 'Login',
})

definePageMeta({
  layout: 'auth',
})

const emailSchema = toTypedSchema(zod.string().nonempty("Email is required").email("Must be a valid email"))
const passwordSchema = toTypedSchema(zod.string().nonempty("Password is required"))

const { auth } = useSupabaseClient()
const toast = useToast()
const { handleSubmit } = useForm()
const { value: emailValue, errorMessage: errorEmail } = useField('email', emailSchema)
const { value: passwordValue, errorMessage: errorPassword } = useField('password', passwordSchema)

const onLogin = handleSubmit(async (values) => {
  const { error } = await auth.signInWithPassword({
    email: values.email,
    password: values.password
  })

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
)
</script>

<template>
  <div class="p8 shadow b mt8">
    <h1 class="text-4xl font-bold leading-relaxed">Login</h1>
    <p class="c-gray5">Somehow you need to login to get access.</p>
    <form @submit.prevent="onLogin" class="flex flex-col gap-4 mt-6">
      <div role="group" class="form-group">
        <label for="email">Email</label>
        <InputText type="email" id="email" :class="{ 'p-invalid': errorEmail }" v-model="emailValue" />
        <small v-if="errorEmail" class="p-error" id="text-error">{{ errorEmail || '&nbsp;' }}</small>
      </div>
      <div class="form-group" role="group">
        <label for="password">Password</label>
        <Password id="password" input-class="w-full" class="w-full" v-model="passwordValue" :feedback="false"
          toggle-mask />
        <small v-if="errorPassword" class="p-error" id="text-error">{{ errorPassword || '&nbsp;' }}</small>
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
