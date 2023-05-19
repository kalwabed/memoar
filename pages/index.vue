<script lang="ts" setup>
useHead({
  title: 'Home',
})

definePageMeta({
  layout: 'auth',
})

const authClient = useSupabaseAuthClient()

const onLogout = async () => {
  await authClient.auth.signOut()
  navigateTo('/login')
}
</script>

<template>
  <div>
    <p>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel at quae quia ea aut. Dolorem, aspernatur eos dicta
      sed adipisci placeat odio. Eos possimus natus quisquam incidunt temporibus, maxime repellat!
    </p>

    <button @click="onLogout">Logout</button>
  </div>
</template>
