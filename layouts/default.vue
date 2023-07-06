<template>
  <div class="flex flex-col h-full font-sans">
    <Suspense>
      <Navbar />
    </Suspense>
    <main class="h-full">
      <slot />
    </main>
  </div>
</template>
