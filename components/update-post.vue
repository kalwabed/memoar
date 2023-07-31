<script setup lang="ts">
defineProps<{ isLoading: boolean }>()
defineEmits<{
  toggleEdit: []
  updatePost: []
}>()

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
    <div class="flex gap-2 ml-auto mt6">
      <Button
        @click="$emit('toggleEdit')"
        size="small"
        severity="secondary"
        outlined
        :disabled="isLoading"
        label="Cancel"
      />
      <Button @click="$emit('updatePost')" size="small" :disabled="isLoading">
        <template v-if="isLoading"> Loading... </template>
        <template v-else>
          <i class="i-ph:floppy-disk-bold w-4 h-4 mr1"></i>
          Save
        </template>
      </Button>
    </div>
  </div>
</template>
