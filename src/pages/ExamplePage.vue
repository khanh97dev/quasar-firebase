<template>example</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useTodoStore } from 'stores/todo'

export default defineComponent({
  name: 'ExamplePage',
  setup() {
    const todoStore = useTodoStore()
    const todos = todoStore.todos
    const todo = ref('')

    const addTodo = () => {
      if (todo.value.trim()) {
        todoStore.addTodo(todo.value.trim())
        todo.value = ''
      }
    }

    const deleteTodo = (id) => {
      todoStore.deleteTodo(id)
    }

    const updateTodo = (id, updatedTodo) => {
      todoStore.updateTodo(id, updatedTodo)
    }

    return {
      todos,
      addTodo,
      deleteTodo,
      updateTodo,
    }
  },
})
</script>
