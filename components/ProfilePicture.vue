<script setup lang="ts">
const props = defineProps<{
  username?: string
  src?: string
}>()

const profilePicture = computed(() => {
  if (props.src) return props.src

  return `https://api.dicebear.com/6.x/notionists-neutral/svg?seed=${props.username}`
})
</script>

<template>
  <img :src="profilePicture" alt="Profile" />
</template>
