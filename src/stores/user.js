import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import { collection, addDoc, getDocs, deleteDoc, updateDoc, doc, query } from 'firebase/firestore'
import { db } from 'boot/firebase'
import { useCollection } from 'vuefire'

const TABLE = 'users'

export const useUserStore = defineStore('user', () => {
  let users = useCollection(collection(db, TABLE))
  const user = ref(null)

  const fetchUsers = async () => {
    const snapshot = await getDocs(collection(db, TABLE))
    users = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  }

  const findUser = ({ username, email }) => {
    console.log(username, email)
    if (email) {
      user.value = users.find((user) => user.email === email)
    }

    if (username) {
      user.value = users.find((user) => user.username === username)
    }

    return user.value
  }

  const addUser = async ({ email, username, name, avatar }) => {
    await addDoc(collection(db, TABLE), {
      email,
      username,
      name,
      avatar,
    })
    await fetchUsers()
  }

  const deleteUser = async ({ email, username }) => {
    const user = findUser({ email, username })
    await deleteDoc(doc(db, TABLE, user.id))
    await fetchUsers()
  }

  const updateUser = async ({ email, username }, { name, avatar }) => {
    const user = findUser({ email, username })
    const doc = doc(db, TABLE, user.id)
    await updateDoc(doc, {
      name,
      avatar,
    })
    await fetchUsers()
  }

  return {
    user,
    users,
    fetchUsers,
    findUser,
    addUser,
    deleteUser,
    updateUser,
  }
})
