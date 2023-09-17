<script setup lang="ts">
import { useToast } from 'primevue/usetoast'

import { User } from '~/types/entities'
import { Database } from '~/types/database'

const { user } = defineProps<{
  user: User
}>()

const usernameInput = ref('')
const fullnameInput = ref('')
const twitterInput = ref('')
const instagramInput = ref('')
const webInput = ref('')

const [isEdit, toggleIsEdit] = useToggle(false)
const { user: userStore } = useAuthStore()
const toast = useToast()
const client = useSupabaseClient<Database>()

const isCurrentUser = computed(() => {
  return userStore.value?.id === user?.id
})

const onEdit = () => {
  toggleIsEdit()
  usernameInput.value = userStore.value?.username
  fullnameInput.value = userStore.value?.fullname
  instagramInput.value = user?.instagram
  twitterInput.value = user?.twitter
  webInput.value = user?.website
}

const handleUpdateProfile = async () => {
  const username = usernameInput.value
  // regex for valid username
  const usernameRegex = /^[a-zA-Z0-9_]{3,15}$/

  // test if username is valid
  if (!usernameRegex.test(username)) {
    return toast.add({
      severity: 'warn',
      summary: 'Invalid',
      detail: 'Username can only contain alphanumeric and underscore!',
      life: 3000,
    })
  }

  try {
    const savedUser = await client.from('users').select('username').eq('username', username).single()

    if (savedUser?.data.username !== userStore.value?.username) {
      return toast.add({
        severity: 'error',
        summary: 'Invalid',
        detail: 'Username is already taken!',
        life: 3000,
      })
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
        instagram: instagramInput.value,
        twitter: twitterInput.value,
        website: webInput.value,
      })
      .eq('id', userStore.value?.id)

    toggleIsEdit()

    userStore.value = {
      ...userStore.value,
      fullname: fullnameInput.value,
    }
    if (usernameInput.value !== userStore.value?.username) {
      userStore.value = {
        ...userStore.value,
        username,
      }

      toast.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Profile updated. Redirecting...',
        life: 2000,
      })
      setTimeout(() => {
        return navigateTo(`/${usernameInput.value}`, { replace: true })
      }, 2200)
    } else {
      toast.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Profile updated!',
        life: 3000,
      })

      await refreshNuxtData()
    }
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

    <div class="flex flex-col">
      <h3 class="text-2xl font-bold leading-relaxed">{{ user?.fullname }}</h3>
      <span>@{{ user?.username }}</span>
      <p>Apabila</p>
      <div class="flex gap3 items-center mt4">
        <a
          v-if="user.instagram"
          class="outline-none hover:c-blue6 focus:(ring-2 c-blue6) transition"
          title="Instagram"
          :href="`https://www.instagram.com/${user.instagram}`"
          rel="noreferrer noopener"
          target="_blank"
          ><i class="i-radix-icons:instagram-logo block"></i
        ></a>
        <a
          v-if="user.twitter"
          class="outline-none hover:c-blue6 focus:(ring-2 c-blue6) transition"
          title="X Twitter"
          :href="`https://twitter.com/${user.twitter}`"
          rel="noreferrer noopener"
          target="_blank"
          ><i class="i-radix-icons:twitter-logo block"></i
        ></a>
        <a
          v-if="user.website"
          class="outline-none hover:c-blue6 focus:(ring-2 c-blue6) transition"
          title="Website"
          :href="user.website"
          rel="noreferrer noopener"
          target="_blank"
          ><i class="i-radix-icons:globe block"></i
        ></a>
      </div>
    </div>
    <div v-if="isCurrentUser" class="flex ml-auto gap-3 h-fit">
      <Button size="small" severity="secondary" outlined @click="onEdit" label="Edit" />
      <Button size="small" severity="danger" outlined @click="logout" icon="i-ph-sign-out" label="Sign out" />
    </div>

    <Dialog v-model:visible="isEdit" modal header="Update your profile">
      <form @submit.prevent="handleUpdateProfile" class="flex flex-col">
        <div role="group" class="form-group">
          <label for="username">Username</label>
          <InputText id="username" v-model="usernameInput" />
          <span class="text-xs c-gray5">Minimal 3 huruf, maksimal 15 huruf.</span>
        </div>
        <div role="group" class="form-group mt4">
          <label for="fullname">Fullname</label>
          <InputText id="fullname" v-model="fullnameInput" />
        </div>
        <div role="group" class="form-group mt4">
          <label for="instagram">Instagram</label>
          <InputText id="instagram" placeholder="Username" v-model="instagramInput" />
        </div>
        <div role="group" class="form-group mt4">
          <label for="twitter">Twitter</label>
          <InputText id="twitter" placeholder="Handle" v-model="twitterInput" />
        </div>
        <div role="group" class="form-group mt4">
          <label for="web">Website</label>
          <InputText id="web" placeholder="https://..." type="url" v-model="webInput" />
        </div>
        <div class="flex justify-between gap2 mt8">
          <Button type="reset" label="Cancel" @click="toggleIsEdit()" severity="secondary" size="small" />
          <Button type="submit" label="Save Changes" size="small" />
        </div>
      </form>
      <template #footer>
        <small class="c-gray">NB: Currently you can just update your username and fullname.</small>
      </template>
    </Dialog>
  </div>
</template>
