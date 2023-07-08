<script setup lang="ts">
defineProps<{ isLoading: boolean }>()
defineEmits<{
  toggleEdit: []
  updatePost: []
}>()

// TODO: maybe we can use defineExpose here to expose the title and editorModel
// const title = ref('')
// defineExpose({ title })

const editorModel = defineModel<string>('editor')
const titleModel = defineModel<string>('title')
</script>

<template>
  <div class="flex flex-col">
    <input
      type="text"
      v-model="titleModel"
      class="outline-none b-b b-transparent transition py2 mb-4 text-4xl font-bold focus:(ring-0 b-b b-b-gray5) hover:b-gray2"
    />
    <LazyEditor contentType="html" id="content" v-model:content="editorModel" :readOnly="isLoading" />
    <div class="flex gap-2 ml-auto">
      <button class="btn-gray btn-sm mt-2" @click="$emit('toggleEdit')" :disabled="isLoading">Cancel</button>
      <button class="btn-blue btn-sm mt-2" @click="$emit('updatePost')" :disabled="isLoading">
        <template v-if="isLoading"> Loading... </template>
        <template v-else>
          <i class="i-ph:floppy-disk-bold w-4 h-4"></i>
          Save
        </template>
      </button>
    </div>
  </div>
</template>
