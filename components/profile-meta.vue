<script setup lang="ts">
import { Database } from '~/types/database'

const usernameInput = ref('')
const fullnameInput = ref('')
const isEdit = ref(false)

const { user } = useAuthStore()
const client = useSupabaseClient<Database>()

const onEdit = () => {
  isEdit.value = !isEdit.value
  usernameInput.value = user.value?.username
  fullnameInput.value = user.value?.fullname
}

const handleUpdateProfile = async () => {
  const username = usernameInput.value
  // regex for valid username
  const usernameRegex = /^[a-zA-Z0-9_]{3,15}$/

  // test if username is valid
  if (!usernameRegex.test(username)) {
    return useNuxtApp().$toast.error('Username can only contain alphanumeric and underscore!', {
      autoClose: 3000,
    })
  }

  try {
    const savedUser = await client.from('users').select('username').eq('username', username).single()

    if (savedUser?.data.username !== user.value?.username) {
      return useNuxtApp().$toast.error('Username is already taken!')
    }
  } catch (error) {
    console.error(error)
  }

  try {
    await client
      .from('users')
      .update({
        username,
        fullname: fullnameInput.value,
      })
      .eq('id', user.value?.id)

    isEdit.value = false
    useNuxtApp().$toast.success('Profile updated!')

    user.value = {
      ...user.value,
      fullname: fullnameInput.value,
    }
    if (usernameInput.value !== user.value?.username) {
      user.value = {
        ...user.value,
        username,
      }
      return await navigateTo(`/${usernameInput.value}`, { replace: true })
    }

    await refreshNuxtData()
  } catch (error) {
    console.error(error)
  }
}

const logout = async () => {
  await client.auth.signOut()
  user.value = null
  await navigateTo('/')
}
</script>

<template>
  <div class="flex gap-4 pb-4 mb-3 border-b">
    <div>
      <ProfilePicture
        :src="user?.avatar_url"
        :username="user?.username"
        alt="profile"
        title="Your generated profile picture"
        :width="70"
        :height="70"
      />
    </div>
    <form @submit.prevent="handleUpdateProfile" class="flex flex-col gap-4" v-if="isEdit">
      <div role="group">
        <label for="username">Username</label>
        <input class="input mb1" id="username" type="text" v-model="usernameInput" />
        <span class="text-xs c-gray5">Minimal 3 huruf, maksimal 15 huruf.</span>
      </div>
      <div role="group">
        <label for="fullname">Fullname</label>
        <input class="input" id="fullname" type="text" v-model="fullnameInput" />
      </div>
      <div class="flex gap2">
        <button type="reset" class="btn-gray" @click="isEdit = false">Cancel</button>
        <button type="submit" class="btn-blue">Save Changes</button>
      </div>
      <small class="c-gray">NB: Currently you can just update your username and fullname.</small>
    </form>
    <div class="flex flex-col" v-else>
      <h3 class="text-2xl font-bold leading-relaxed">{{ user?.fullname }}</h3>
      <span>@{{ user?.username }}</span>
    </div>
    <div class="flex ml-auto gap-3 h-fit">
      <button class="btn-gray btn-sm" @click="onEdit">Edit</button>
      <button @click="logout" class="btn-red btn-sm">
        <span>Sign out</span>
        <i class="i-ph-sign-out w4 h4" />
      </button>
    </div>
  </div>
</template>
