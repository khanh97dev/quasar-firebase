<script>
import { ref, defineComponent, watch } from "vue";

export default defineComponent({
  name: "PlayComponent",
  props: {
    opened: {
      type: Boolean,
    },
    title: {
      type: String,
      default: "The Music",
    },
  },
  methods: {
    _rewind() {
      this.$emit("onRewind");
    },
    _pause() {
      this.$emit("onPause");
    },
    _forward() {
      this.$emit("onForward");
    },
  },
  watch: {},
  setup(props, { emit }) {
    const OPENED = ref(false);
    const TITLE = ref("");

    watch(OPENED, (value) => (value ? null : emit("onOpen", false)));

    watch(
      () => props.opened,
      (value) => (value ? (OPENED.value = true) : null)
    );

    watch(
      () => props.title,
      (value) => (TITLE.value = value)
    );

    return {
      OPENED,
      TITLE,
      ...props,
    };
  },
});
</script>


<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="OPENED" position="bottom">
      <q-card style="width: 350px">
        <q-linear-progress :value="0.6" color="pink" />

        <q-card-section class="row items-center no-wrap">
          <div>
            <div class="text-weight-bold"><span v-text="TITLE"></span></div>
          </div>
          <q-space />
          <q-btn flat round icon="fast_rewind" @click="_rewind" />
          <q-btn flat round icon="pause" @click="_pause" />
          <q-btn flat round icon="fast_forward" @click="_forward" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
