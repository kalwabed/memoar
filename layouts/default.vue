<template>
  <div class="flex flex-col h-full font-sans">
    <Suspense>
      <Navbar />
    </Suspense>
    <main class="mt-4 px-4 md:mt-12 lg:px0">
      <slot />
    </main>
  </div>
</template>
