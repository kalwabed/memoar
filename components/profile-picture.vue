<script setup lang="ts">
const {
  src,
  username,
  height = 50,
  width = 50,
} = defineProps<{
  width?: number
  height?: number
  username?: string
  src?: string
}>()

const profilePicture = computed(() => {
  if (src) return src

  return `https://api.dicebear.com/6.x/notionists-neutral/svg?seed=${username}`
})
</script>

<template>
  <img
    :src="profilePicture"
    class="rd-full"
    :width="width"
    :height="height"
    alt="Profile"
    decoding="async"
    loading="lazy"
  />
</template>
