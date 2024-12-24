
<script>
import { defineComponent, ref, reactive } from 'vue'
import Play from '../../components/Play.vue'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'HomePage',
  components: {
    Play,
  },
  data: function () {
    return {
      isPlay: false,
      video: {},
    }
  },
  mounted() {
    const { loadingBar } = useQuasar()
    loadingBar.start()
    loadingBar.increment(1)
    loadingBar.stop()
  },
  methods: {
    handleOpenVideo: function (video) {
      this.isPlay = true
      this.video = video
    },
    onOpen: function () {
      this.isPlay = false
    },
    onPause: function () {
      console.log('pause')
    },
    onForward: function () {
      console.log('forward')
    },
    onRewind: function () {
      console.log('rewind')
    },
  },
  setup() {
    const videos = reactive([
      {
        title: 'Video 1',
        thumbnail:
          'https://img.freepik.com/premium-vector/abstract-dynamic-flow-fluid-wavy-background-design-template_151987-330.jpg',
        url: 'https://img.freepik.com/premium-vector/abstract-dynamic-flow-fluid-wavy-background-design-template_151987-330.jpg',
      },
      {
        title: 'Video 2',
        thumbnail:
          'https://img.freepik.com/premium-vector/abstract-dynamic-flow-fluid-wavy-background-design-template_151987-330.jpg',
        url: 'https://img.freepik.com/premium-vector/abstract-dynamic-flow-fluid-wavy-background-design-template_151987-330.jpg',
      },
      {
        title: 'Video 3',
        thumbnail:
          'https://img.freepik.com/premium-vector/abstract-dynamic-flow-fluid-wavy-background-design-template_151987-330.jpg',
        url: 'https://img.freepik.com/premium-vector/abstract-dynamic-flow-fluid-wavy-background-design-template_151987-330.jpg',
      },
    ])

    return {
      videos,
    }
  },
})
</script>

<template>
  <div class="q-pa-md row justify-between">
    <div v-for="(video, index) in videos" :key="index" class="col-12 col-md-4 q-mb-md q-px-md">
      <q-card class="bg-grey-10">
        <q-card-section>
          <q-img
            :src="video.thumbnail"
            :alt="video.title"
            class="q-mb-md"
            @click="handleOpenVideo(video)"
          />
          <title>{{ video.title }}</title>
        </q-card-section>
        <q-card-section>
          <q-btn
            label="Play Video"
            color="blue-grey-10"
            @click="handleOpenVideo(video)"
            icon="play_arrow"
          />
        </q-card-section>
      </q-card>
    </div>
    <!-- Modal -->
    <Play
      ref="play"
      :opened="isPlay"
      :title="video.title"
      :key="1"
      @onOpen="onOpen"
      @onPause="onPause"
      @onForward="onForward"
      @onRewind="onRewind"
    />
  </div>
</template>
