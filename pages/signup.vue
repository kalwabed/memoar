<script setup lang="ts">
import { useToast } from 'primevue/usetoast'

import { Database } from '@/types/database'
import { email, getOutput, getPipeIssues, minLength, string } from 'valibot';

useHead({
  title: 'Sign Up',
})

definePageMeta({
  layout: 'auth',
})

const dbClient = useSupabaseClient<Database>()
const toast = useToast()

const emailSchema = toTypedSchema(string([email("Must be a valid email"), minLength(1, "Email is required")]))
const passwordSchema = toTypedSchema(string([minLength(1, "Password is required")]))
const fullnameSchema = toTypedSchema(string([minLength(1, "Fullname is required")]))

const { value: emailValue, errorMessage: errorEmail } = useField('email', emailSchema)
const { value: fullnameValue, errorMessage: errorFullname } = useField('fullname', fullnameSchema)
const { value: passwordValue, errorMessage: errorPassword } = useField('password', passwordSchema)

const repeatPasswordSchema = toTypedSchema(string([(input) => {
  if (input !== passwordValue.value) {
    return getPipeIssues("custom", "Repeat password must be same", input)
  }

  return getOutput(input)
}, minLength(1, "Password is required")]))

const { value: repeatPasswordValue, errorMessage: errorRepeatPassword } = useField('repeatPassword', repeatPasswordSchema)
const { handleSubmit } = useForm()

const onSignUp = handleSubmit(async (values) => {
  const { error, data: authData } = await dbClient.auth.signUp({ email: emailValue.value, password: passwordValue.value })

  if (error) {
    toast.add({
      severity: 'error',
      summary: 'Sign Up failed',
      detail: error.message,
      life: 3000,
    })
    return
  }

  const username = uniqueUsername(values.fullname)

  const { data } = await dbClient
    .from(USERS_TABLE)
    .insert({ username, fullname: values.fullname, id: authData.user?.id })
    .select('fullname')
    .single()

  toast.add({
    severity: 'success',
    summary: 'Sign Up success',
    detail: `Welcome to the club, ${data.fullname}!`,
    life: 3000,
  })
  await navigateTo('/')
})
</script>

<template>
  <div class="p8 shadow b mt8">
    <h1 class="text-4xl font-bold leading-relaxed">Sign Up</h1>
    <form @submit.prevent="onSignUp" class="flex flex-col gap-4 mt-6">
      <div role="group" class="form-group">
        <label for="fullname">Fullname</label>
        <InputText id="fullname" :class="{ 'p-invalid': errorFullname }" v-model="fullnameValue" />
        <small v-if="errorFullname" class="p-error" id="text-error">{{ errorFullname || '&nbsp;' }}</small>
      </div>
      <div role="group" class="form-group">
        <label for="email">Email</label>
        <InputText type="email" id="email" :class="{ 'p-invalid': errorEmail }" v-model="emailValue" />
        <small v-if="errorEmail" class="p-error" id="text-error">{{ errorEmail || '&nbsp;' }}</small>
      </div>
      <div role="group" class="form-group">
        <label for="password">Password</label>
        <Password id="password" toggle-mask class="w-full" input-class="w-full" :class="{ 'p-invalid': errorPassword }"
          v-model="passwordValue" />
        <small v-if="errorPassword" class="p-error" id="text-error">{{ errorPassword || '&nbsp;' }}</small>
      </div>
      <div class="form-group" role="group">
        <label for="rePassword">Repeat Password</label>
        <Password id="rePassword" toggle-mask class="w-full" :class="{ 'p-invalid': errorRepeatPassword }"
          input-class="w-full" :feedback="false" v-model="repeatPasswordValue" />
        <small v-if="errorRepeatPassword" class="p-error" id="text-error">{{ errorRepeatPassword || '&nbsp;' }}</small>
      </div>

      <Button type="submit" label="Sign Up" />
      <div class="mt-4">
        <span>Already have an account?</span>
        <NuxtLink class="hover:underline c-blue7 focus:ring outline-none transition ml-1" to="/login">Login</NuxtLink>
      </div>
    </form>
  </div>
</template>
