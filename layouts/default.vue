<template>
  <div>
    <Suspense>
      <Navbar />
    </Suspense>
    <main>
      <slot />
    </main>
  </div>
</template>

<style scoped>
div {
  display: flex;
  flex-direction: column;
  height: 100%;
}

main {
  margin-top: 1rem;
}

@media (min-width: 768px) {
  main {
    margin-top: 3rem;
  }
}
</style>
