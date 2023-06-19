<template>
  <div class="flex flex-col h-full font-sans">
    <Suspense>
      <Navbar />
    </Suspense>
    <main>
      <slot />
    </main>
  </div>
</template>
