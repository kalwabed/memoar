<script lang="ts" setup>
useHead({
  title: 'Home',
})

const user = useSupabaseUser()
</script>

<template>
  <div class="flex flex-col">
    <section class="bg-slate2 c-slate9 b-y b-slate3 py-15">
      <div class="container">
        <h2 class="text-2xl md:text-4xl font-bold leading-relaxed">Welcome, {{ user?.email }}</h2>
        <p>Here we go again</p>
      </div>
    </section>

    <div class="container">
      <section class="mt-8 mb-4">
        <h3 class="text-xl font-bold">Latest topics</h3>
        <small class="c-gray-5">Hope you enjoy</small>
      </section>
      <Suspense>
        <Topics :enable-delete="false" />
      </Suspense>
    </div>
  </div>
</template>
