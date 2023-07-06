<script setup lang="ts">
import '@vueup/vue-quill/dist/vue-quill.snow.prod.css'
import { QuillEditor } from '@vueup/vue-quill'
</script>

<template>
  <QuillEditor
    class="text-base! font-sans!"
    theme="snow"
    :toolbar="['bold', 'italic', 'underline', 'code', 'strike', 'link']"
  />
</template>
