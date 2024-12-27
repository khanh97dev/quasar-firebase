<template>
  <router-view />
</template>

<script>
import { defineComponent, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from 'stores/user'

export default defineComponent({
  name: 'App',
  setup() {
    const userStore = useUserStore()
    userStore.fetchUsers().then(async () => {
      if (!userStore.users.length) {
        await userStore.addUser({
          email: 'hkngokhong@gmail.com',
          name: 'kai',
          username: 'kai.t',
          avatar: 'https://cdn.quasar.dev/img/mountains.jpg',
        })
      }
      userStore.findUser({
        email: 'hkngokhong@gmail.com',
        username: null,
      })
    })
  },
})
</script>
