<template>
  <NuxtLayout>
    <NuxtLoadingIndicator />
    <ClientOnly>
      <ConfirmDialog />
      <Toast position="top-center" />
    </ClientOnly>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
html,
body,
#__nuxt,
#nuxt-test {
  height: 100%;
}

button,
input {
  line-height: initial;
}
</style>
