<template>
  <q-card v-if="user">
    <img :src="user.avatar" />

    <q-card-section>
      <div class="text-h6">{{ user.name }}</div>
      <div class="text-subtitle2">{{ user.email }}</div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, computed, ref, reactive, onMounted } from 'vue'
import { useUserStore } from '../../stores/user'
import { storeToRefs } from 'pinia'

export default defineComponent({
  name: 'SettingPage',
  setup() {
    const userStore = useUserStore()
    const { users, user } = storeToRefs(userStore)

    return {
      user,
      users,
    }
  },
})
</script>
