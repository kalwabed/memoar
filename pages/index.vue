<script lang="ts" setup>
useHead({
  title: 'Home',
})

const user = useSupabaseUser()
</script>

<template>
  <div class="flex b b-gray-200 bg-gray-100 p8 flex-col max-w-screen-lg w-full mx-auto">
    <section>
      <h2 class="text-4xl font-bold leading-relaxed">Welcome, {{ user?.email }}</h2>
      <p>Here we go again</p>
    </section>

    <section class="mt-8 mb-4">
      <h3 class="text-2xl font-bold">Latest topics</h3>
      <small>Hope you enjoy</small>
    </section>
    <Suspense>
      <Topics :enable-delete="false" />
    </Suspense>
  </div>
</template>
