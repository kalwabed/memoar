<script setup lang="ts">
import { User } from '~/types/entities'
import { Database } from '~/types/database'

const { user } = defineProps<{
  user: User
}>()

const usernameInput = ref('')
const fullnameInput = ref('')
const isEdit = ref(false)

const { user: userStore } = useAuthStore()
const client = useSupabaseClient<Database>()

const isCurrentUser = computed(() => {
  return userStore.value?.id === user?.id
})

const onEdit = () => {
  isEdit.value = !isEdit.value
  usernameInput.value = userStore.value?.username
  fullnameInput.value = userStore.value?.fullname
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

    if (savedUser?.data.username !== userStore.value?.username) {
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
      .eq('id', userStore.value?.id)

    isEdit.value = false
    useNuxtApp().$toast.success('Profile updated!')

    userStore.value = {
      ...userStore.value,
      fullname: fullnameInput.value,
    }
    if (usernameInput.value !== userStore.value?.username) {
      userStore.value = {
        ...userStore.value,
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
  userStore.value = null
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
    <form v-if="isEdit" @submit.prevent="handleUpdateProfile" class="flex flex-col gap-4">
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
        <Button type="reset" label="Cancel" @click="isEdit = false" severity="secondary" size="small" />
        <Button type="submit" label="Save Changes" size="small" />
      </div>
      <small class="c-gray">NB: Currently you can just update your username and fullname.</small>
    </form>
    <div v-else class="flex flex-col">
      <h3 class="text-2xl font-bold leading-relaxed">{{ user?.fullname }}</h3>
      <span>@{{ user?.username }}</span>
    </div>
    <div v-if="isCurrentUser" class="flex ml-auto gap-3 h-fit">
      <Button size="small" severity="secondary" outlined @click="onEdit" label="Edit" />
      <Button size="small" severity="danger" outlined @click="logout" icon="i-ph-sign-out" label="Sign out" />
    </div>
  </div>
</template>
