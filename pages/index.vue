<script lang="ts" setup>
useHead({
  title: 'Home',
})

definePageMeta({
  layout: 'auth',
})

const authClient = useSupabaseAuthClient()
const user = useSupabaseUser()

const onLogout = async () => {
  await authClient.auth.signOut()
  navigateTo('/login')
}
</script>

<template>
  <div class="paper container">
    <section>
      <h2>Welcome, {{ user?.email }}</h2>
      <p>Here we go again</p>
    </section>

    <button class="paper-btn btn-small btn-danger-outline" @click="onLogout">Logout</button>

    <section class="margin-top-large">
      <h3>Latest topics</h3>
      <small>Hope you enjoy</small>
    </section>
    <div class="margin-top-small">
      <Suspense>
        <Topics />
      </Suspense>
    </div>
  </div>
</template>
