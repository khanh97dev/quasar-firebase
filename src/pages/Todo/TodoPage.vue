<template>
  <q-page>
    <q-input v-model="todo" filled />
    <q-btn @click="addTodo(todo)" size="lg">ADD</q-btn>
    <q-list>
      <q-item v-for="obj in todos" :key="obj.id">
        {{ obj.text }}
        <q-btn @click="deleteTodo(obj.id)" size="sm">Delete</q-btn>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import { defineComponent, computed, ref, reactive, onMounted } from 'vue'
import { useTodoStore } from 'stores/todo'
import { storeToRefs } from 'pinia'

export default defineComponent({
  name: 'TodoPage',
  setup() {
    const todo = ref('')
    const store = useTodoStore()
    const { todos } = storeToRefs(store)

    onMounted(() => {
      store.fetchTodos()
    })

    return {
      todo,
      todos,
      addTodo: store.addTodo,
      deleteTodo: store.deleteTodo,
      updateTodo: store.updateTodo,
    }
  },
})
</script>
