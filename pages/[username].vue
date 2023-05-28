<script setup lang="ts">
import { Database, User } from '~/types/database'

const editorValue = ref('')
const title = ref('')
const isAddTopic = ref(false)

const route = useRoute()

const client = useSupabaseClient<Database>()
const userAuth = useSupabaseUser()

// @ts-ignore
const username: string = route.params.username

const { data: user } = await useAsyncData(username, async () => {
  const { data } = (await client.from('users').select('*').eq('username', username).single()) as { data: User }

  return data
})

const isCurrentUser = computed(() => {
  return userAuth?.value?.id === user?.value?.id
})

const onSubmit = async () => {
  await client.from('topics').insert([
    {
      title: title.value,
      user_id: userAuth.value?.id,
      content: editorValue.value,
      slug: generateSlug(title.value),
    },
  ])

  await refreshNuxtData(`${userAuth.value?.id}-topics`)
  editorValue.value = ''
  title.value = ''
}

useHead({
  title: username,
})
</script>

<template>
  <div class="paper container">
    <div v-if="user?.id">
      <div class="profile">
        <img :src="user?.avatar_url" alt="profile" width="100" height="100" />
        <div class="name">
          <h3>{{ user?.fullname }}</h3>
          <span>@{{ username }}</span>
        </div>
        <button v-if="isCurrentUser" @click="isAddTopic = !isAddTopic" class="btn-small btn-secondary">
          Add Topic
        </button>
      </div>
      <Transition>
        <form @submit.prevent="onSubmit" v-if="isAddTopic" class="margin-top">
          <div class="form-group">
            <label for="title">Title</label>
            <input type="text" id="title" v-model="title" />
          </div>
          <div class="form-group">
            <label for="content">Content</label>
            <LazyEditor
              contentType="html"
              id="content"
              v-model:content="editorValue"
              :toolbar="['bold', 'italic', 'underline', 'code', 'strike', 'link']"
            />
          </div>
          <button type="submit" class="btn-small margin-top">Send</button>
        </form>
      </Transition>
      <h4 v-if="isCurrentUser" class="margin-top">Your Topics</h4>
      <Suspense>
        <Topics :user-id="user?.id" />
      </Suspense>
    </div>

    <div class="error" v-else>
      <h1>404</h1>
      <p>Sorry, we couldn't find the page you're looking for.</p>
      <button class="btn-small btn-primary margin-top" @click="$router.back()">Go back</button>
    </div>
  </div>
</template>

<style scoped>
.profile {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  padding-bottom: 1rem;
  width: 100%;
  border-bottom: 1px solid #eaeaea;
}

.profile button {
  margin-left: auto;
}

.error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  text-align: center;
  padding: 2rem;
  border: 1px solid #eaeaea;
  border-radius: 0.5rem;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
