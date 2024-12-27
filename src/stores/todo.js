import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import { useCollection } from 'vuefire'
import { collection, addDoc, getDocs, deleteDoc, updateDoc, doc } from 'firebase/firestore'
import { db } from 'boot/firebase'
import { useQuasar } from 'quasar'

const TABLE = 'todos'

export const useTodoStore = defineStore('todo', () => {
  const $q = useQuasar()
  let todos = useCollection(collection(db, TABLE))

  const fetchTodos = async () => {
    const snapshot = await getDocs(collection(db, TABLE))
    todos = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  }

  const addTodo = async (todo) => {
    await addDoc(collection(db, TABLE), { text: todo, completed: true })
    await fetchTodos()
  }

  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, TABLE, id))
    await fetchTodos()
  }

  const updateTodo = async (id, updatedTodo) => {
    const todoDoc = doc(db, TABLE, id)
    await updateDoc(todoDoc, updatedTodo)
    await fetchTodos()
  }

  return {
    todos,
    fetchTodos,
    addTodo,
    deleteTodo,
    updateTodo,
  }
})
