<script setup lang="ts">
import type { Post } from '~/types/database'

const { post } = defineProps<{
  post: Post & {
    users: {
      username: string
    }
  }
  enableDelete?: boolean
}>()

defineEmits<{
  (e: 'deleteArticle', postId: string): void
}>()

const publishedAt = computed(() => {
  const dateUpload = new Date(post.created_at)

  return useDateFormat(dateUpload, 'DD MMM, HH:mm', { locales: 'id' }).value
})
</script>

<template>
  <div class="relative p4 flex mb-2 rd bg-blue1 c-blue-900 b b-blue3 shadow-sm hover:(b-blue4 shadow-md) transition">
    <div class="flex flex-col">
      <NuxtLink
        :to="post.users.username"
        class="font-medium text-sm c-blue7 hover:underline inline-flex items-center gap-2 mb-.5"
      >
        <ProfilePicture :username="post.users.username" :width="20" :height="20" />
        <span>@{{ post.users.username }}</span>
      </NuxtLink>
      <NuxtLink :to="'/posts/' + post.slug" class="text-xl font-semibold hover:underline leading-relaxed">
        {{ post.title }}
      </NuxtLink>
      <time
        class="text-xs"
        :title="new Date(post.created_at).toString()"
        :datetime="new Date(post.created_at).toISOString()"
        >{{ publishedAt }}</time
      >
    </div>
    <button
      v-if="enableDelete"
      popover-top="Delete article"
      @click.stop.prevent="$emit('deleteArticle', post.id)"
      class="card-link btn-small btn-danger"
    >
      🔥
    </button>
  </div>
</template>

<style scoped>
button {
  position: absolute;
  right: 0;
  top: 0;
  display: inline-flex;
  align-items: center;
  width: 30px;
  height: 20px;
  margin: 10px;
  padding: 4px;
  z-index: 10;
}
</style>
