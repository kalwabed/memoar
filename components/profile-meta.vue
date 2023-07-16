<script setup lang="ts">
import { Database } from 'types/database'
import { User } from 'types/entities'

const props = defineProps<{ user: User }>()

const usernameInput = ref('')
const fullnameInput = ref('')
const isEdit = ref(false)

const client = useSupabaseClient<Database>()

const onEdit = () => {
  isEdit.value = !isEdit.value
  usernameInput.value = props.user?.username
  fullnameInput.value = props.user?.fullname
}

const handleUpdateProfile = async () => {
  try {
    await client
      .from('users')
      .update({
        username: usernameInput.value,
        fullname: fullnameInput.value,
      })
      .eq('id', props.user?.id)
    isEdit.value = false
    alert('Profile updated!')

    if (usernameInput.value !== props.user?.username) {
      return navigateTo(`/${usernameInput.value}`, { replace: true })
    }

    await refreshNuxtData()
  } catch (error) {
    console.error(error)
  }
}

const logout = async () => {
  await client.auth.signOut()
  await navigateTo('/login')
}
</script>

<template>
  <div class="flex gap-4 pb-4 mb-3 border-b">
    <ProfilePicture
      :src="user?.avatar_url"
      :username="user?.username"
      alt="profile"
      title="Your generated profile picture"
      :width="70"
      :height="70"
    />
    <form @submit.prevent="handleUpdateProfile" class="flex flex-col gap-4" v-if="isEdit">
      <div role="group">
        <label for="username">Username</label>
        <input class="input" id="username" type="text" v-model="usernameInput" />
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
