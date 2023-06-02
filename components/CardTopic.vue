<script setup lang="ts">
defineProps<{
  topicTitle: string
  enableDelete?: boolean
  topicId: string
}>()

defineEmits<{
  (e: 'deleteArticle', topicId: string): void
}>()
</script>

<template>
  <div class="card margin-top">
    <div class="card-body">
      <h4 class="card-title">
        {{ $props.topicTitle }}
      </h4>
    </div>
    <button
      v-if="$props.enableDelete"
      popover-top="Delete article"
      @click.stop.prevent="$emit('deleteArticle', $props.topicId)"
      class="card-link btn-small btn-danger"
    >
      🔥
    </button>
  </div>
</template>

<style scoped>
.card {
  position: relative;
}

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
