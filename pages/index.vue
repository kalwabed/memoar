<script lang="ts" setup>
useHead({
  title: 'Home',
})

const { user } = useAuthStore()
</script>

<template>
  <div class="flex flex-col">
    <section v-if="user" class="bg-slate2 c-slate9 b-y b-slate3 py1">
      <div class="container">
        <h2 class="text-sm font-bold leading-tight">Welcome, {{ user?.username }}</h2>
        <small class="text-sm">Thanks for joining memoar!</small>
      </div>
    </section>

    <div class="container">
      <section class="mt-8 mb-4">
        <h3 class="text-xl font-bold">Latest posts</h3>
        <small class="c-gray-5">Hope you enjoy</small>
      </section>
      <Suspense>
        <Posts :enable-delete="false" />
      </Suspense>
    </div>
  </div>
</template>
