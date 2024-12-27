import { initializeApp } from 'firebase/app'

import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyB_rqZBBj6vfZIamLlYIm0AGwhOwimz_LA',
  authDomain: 'vuejs-firebase-e80cf.firebaseapp.com',
  databaseURL: 'https://vuejs-firebase-e80cf.firebaseio.com',
  projectId: 'vuejs-firebase-e80cf',
  storageBucket: 'vuejs-firebase-e80cf.appspot.com',
  messagingSenderId: '287975772246',
  appId: '1:287975772246:web:66d39f49f10d15c4edabf7',
}

const firebaseApp = initializeApp(firebaseConfig)
const firebaseAuth = getAuth(firebaseApp)
const db = getFirestore(firebaseApp)

export { firebaseApp, firebaseAuth, db }
