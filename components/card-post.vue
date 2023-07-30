<script setup lang="ts">
import { useConfirm } from 'primevue/useconfirm'

import type { Post } from '~/types/entities'

const { post } = defineProps<{
  post: Post & {
    users: {
      username: string
    }
  }
  enableDelete?: boolean
}>()

const emit = defineEmits<{
  (e: 'deleteArticle', postId: string): void
}>()

const confirm = useConfirm()

const publishedAt = computed(() => {
  const dateUpload = new Date(post.created_at)

  return useDateFormat(dateUpload, 'DD MMM, HH:mm', { locales: 'id' }).value
})

const handleDelete = () => {
  confirm.require({
    header: 'Confirmation',
    icon: 'i-ph:trash',
    message: 'Are you sure you want to delete this article?',
    accept: () => {
      emit('deleteArticle', post.id)
    },
  })
}
</script>

<template>
  <div class="relative p4 flex mb-2 rd bg-gray1 c-gray-900 b b-gray3 shadow-sm hover:shadow-md transition">
    <div class="flex flex-col">
      <NuxtLink
        :to="post.users.username"
        class="font-medium text-sm c-gray7 hover:underline inline-flex items-center gap-2 mb-.5"
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
    <Button
      v-if="enableDelete"
      @click.stop.prevent="handleDelete"
      text
      size="small"
      icon="i-ph:trash"
      severity="danger"
    />
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
