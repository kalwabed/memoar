<script setup lang="ts">
import { Database } from '~/types/database'

const client = useSupabaseClient<Database>()

const { data: topics, error } = await client.from('topics').select('*')

if (error) {
  console.error(error)
}
</script>

<template>
  <ul>
    <li class="margin-top-small" v-for="topic in topics" :key="topic.id">
      <NuxtLink :to="'/topics/' + topic.slug">{{ topic.title }}</NuxtLink>
    </li>
  </ul>
</template>
