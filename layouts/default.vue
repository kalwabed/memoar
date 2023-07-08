<template>
  <div class="flex flex-col h-full font-sans">
    <Suspense>
      <Navbar />
    </Suspense>
    <main class="h-full">
      <slot />
    </main>
    <footer class="wfull py-2">
      <p class="text-center">All rights reserved. &copy; 2023</p>
    </footer>
  </div>
</template>
