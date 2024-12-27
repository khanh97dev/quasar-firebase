import { defineBoot } from '#q-app/wrappers'
import { VueFire, VueFireFirestoreOptionsAPI } from 'vuefire'
import { db } from './firebase'
export default defineBoot(({ app }) => {
  // Set i18n instance on app
  app.use(VueFire, { firebaseApp: app, modules: [VueFireFirestoreOptionsAPI(db)] })
})
