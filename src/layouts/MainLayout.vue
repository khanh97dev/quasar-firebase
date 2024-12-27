<template>
  <q-layout view="hHh LpR fFf" :class="{ 'bg-grey-7': $q.dark.mode }">
    <q-header
      :class="{ 'bg-grey-9': $q.dark.mode, 'bg-grey-1': !$q.dark.mode }"
      reveal
      height-hint="60"
    >
      <q-toolbar class="GPLAY__toolbar">
        <div class="q-pr-lg" v-if="$q.screen.gt.xs">
          <img
            class="GPLAY__logo"
            src="https://cdn.quasar.dev/img/layout-gallery/logo-google-play.png"
          />
        </div>

        <q-space />

        <div class="GPLAY__toolbar-input-container row no-wrap">
          <q-input
            dense
            outlined
            square
            v-model="search"
            placeholder="Search"
            :class="{
              col: true,
              'bg-white': !$q.dark.mode,
              'bg-grey-7': $q.dark.mode,
            }"
          />
          <!-- TODO search -->
          <q-btn class="GPLAY__toolbar-input-btn" color="teal-9" icon="search" unelevated />
        </div>

        <q-space />

        <div class="q-pl-md q-gutter-sm row no-wrap items-center">
          <q-btn
            round
            dense
            flat
            :color="$q.dark.mode ? 'grey-5' : 'grey-8'"
            size="14px"
            icon="apps"
          >
            <q-tooltip>Google Apps</q-tooltip>
          </q-btn>

          <q-btn round dense flat :color="$q.dark.mode ? 'grey-5' : 'grey-8'" icon="notifications">
            <q-badge color="red" floating><span v-text="2"></span></q-badge>
            <q-tooltip>Notifications</q-tooltip>
          </q-btn>

          <q-btn round flat>
            <q-avatar v-if="user" size="26px">
              <img :src="user.avatar" />
            </q-avatar>
            <q-tooltip>Account</q-tooltip>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :class="{
        'bg-grey-8': $q.dark.mode,
        'text-grey-7': $q.dark.mode,
      }"
    >
      <q-list>
        <q-item
          clickable
          :to="item?.to ?? '/'"
          exact-active-class="menu-active"
          :class="{
            'GPLAY__drawer-link': true,
            ['GPLAY__drawer-link--' + item.id]: true,
            'bg-grey-10': true,
            'text-grey-3': true,
          }"
          v-for="(item, i) in menu"
          :key="i"
        >
          <q-item-section
            avatar
            :class="{
              'text-grey-1': true,
              [item.bg]: true,
            }"
          >
            <q-icon :name="item.icon" />
          </q-item-section>
          <q-item-section
            :class="{
              'text-grey-3': $q.dark.mode,
              'text-dark-8': !$q.dark.mode,
            }"
          >
            <q-item-label>{{ item.label }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator class="q-mb-md" />

        <q-item
          v-for="link in links1"
          :key="link.text"
          v-ripple
          dense
          clickable
          class="GPLAY__drawer-item"
        >
          <q-item-section
            :class="{
              'text-grey-3': $q.dark.mode,
              'text-dark-8': !$q.dark.mode,
            }"
          >
            <q-item-label>{{ link.text }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <q-page class="q-mt-xl">
        <router-view />
      </q-page>

      <q-page-sticky expand position="top">
        <q-toolbar
          :class="{
            GPLAY__sticky: true,
            'bg-grey-7': $q.dark.mode,
            'bg-primary': !$q.dark.mode,
            'q-px-md': true,
          }"
        >
          <q-btn
            color="grey-4"
            dense
            flat
            @click="toggleLeftDrawer"
            aria-label="Menu"
            icon="menu"
            size="12px"
            class="q-mr-sm GPLAY__sticky-help"
          />
          <q-space />
          <q-btn v-if="false" icon="help" color="grey-3" dense flat class="GPLAY__sticky-help" />
          <!-- TODO to help -->
          <q-btn
            icon="settings"
            color="white"
            dense
            flat
            round
            class="GPLAY__sticky-settings q-ml-md"
            to="/setting"
          />
          <!-- TODO open setting -->
        </q-toolbar>
      </q-page-sticky>
    </q-page-container>

    <q-footer :class="{ 'bg-grey-8': $q.dark.mode, 'text-grey-3': $q.dark.mode }">
      <q-tabs align="justify" v-model="tab">
        <q-route-tab icon="list" exact name="todo" label="Todo" to="/todo" />
        <q-route-tab icon="music_video" exact name="videos" label="Videos" to="/videos" />
        <q-route-tab icon="pages" exact name="articles" label="Articles" to="/articles" />
      </q-tabs>
    </q-footer>
    <!-- TODO footer -->
  </q-layout>
</template>

<script>
import { ref, defineComponent, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from 'stores/user'

export default defineComponent({
  name: 'MainLayout',

  data: () => ({
    tab: 'images',
  }),

  setup() {
    const leftDrawerOpen = ref(false)
    const search = ref('')
    const storage = ref(0.26)
    const userStore = useUserStore()
    const { user } = storeToRefs(userStore)

    function toggleLeftDrawer() {
      leftDrawerOpen.value = !leftDrawerOpen.value
    }

    return {
      user,
      leftDrawerOpen,
      search,
      storage,
      menu: [
        {
          label: 'Table APP',
          icon: 'list',
          id: 'green-item',
          bg: 'bg-green',
          to: '/table',
          active: true,
        },
        {
          label: 'Camera',
          icon: 'camera',
          id: 'red-item',
          bg: 'bg-red-7',
          to: '/camera',
          active: false,
        },
        {
          label: 'Music',
          icon: 'music_note',
          id: 'yellow-item',
          bg: 'bg-orange-7',
          active: false,
        },
        {
          label: 'Books',
          icon: 'book',
          id: 'blue-item',
          bg: 'bg-blue-7',
          active: false,
        },
        {
          label: 'Devices',
          icon: 'devices',
          id: 'gray-item',
          bg: 'bg-blue-grey-7',
          active: false,
        },
      ],
      links1: [
        { text: 'Account' },
        { text: 'Payment methods' },
        { text: 'My subscriptions' },
        { text: 'Redeem' },
        { text: 'Buy gift card' },
        { text: 'My wishlist' },
        { text: 'My Play activity' },
        { text: 'Parent guide' },
      ],
      toggleLeftDrawer,
    }
  },
})
</script>

<style lang="sass">
.GPLAY
  &__toolbar
    height: 60px

  &__logo
    width: 183px
    height: 39px

  &__toolbar-input-container
    min-width: 100px
    width: 55%

  &__toolbar-input-btn
    border-radius: 0
    max-width: 60px
    width: 100%

  &__drawer-link
    .q-item__section--avatar
      margin: -8px 0 -8px -16px
      padding: 8px 0 8px 16px

    .q-item__section--main
      margin: -8px -16px -8px 16px
      padding: 8px 16px 8px 2px
      font-size: 18px
      font-weight: 300

    &--*-item
      background: #22092C!important
      &:hover
        color: #eee !important
      &.menu-active
        color: #eee !important

    &--apps:hover
      background: #43a047!important

    &--green-item.menu-active
      background: #43a047!important

    &--red-item:hover
      background: #e53935!important
    &--red-item.menu-active
      background: #e53935!important

    &--yellow-item:hover
      background: #fb8c00!important
    &--yellow-item.menu-active
      background: #fb8c00!important

    &--blue-item:hover
      background: #1e88e5!important
    &--blue-item.menu-active
      background: #1e88e5!important

    &--gray-item:hover
      background: #546e7a!important
    &--gray-item.menu-active
      background: #546e7a!important

  &__drawer-item
    padding: 6px 12px 6px 23px

  &__sticky
    min-height: 49px
    border-bottom: 1px solid rgba(0,0,0,0.12)

  &__sticky-help
    border: 1px solid #ccc
    padding-left: 8px
    padding-right: 8px

  &__sticky-settings
    padding-left: 17px
    padding-right: 17px
    border: 1px solid #ccc
</style>
