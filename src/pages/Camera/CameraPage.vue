<template>
  <div class="q-pa-md">
    <q-btn-group rounded>
      <q-btn color="primary" label="QR Scan" icon="qr_code" @click="startScan" />
      <q-btn v-if="!readyCamera" color="primary" icon="camera_alt" @click="startCamera" />
      <q-btn v-if="readyCamera" color="red" icon="close" @click="stopCamera" />
      <q-btn v-if="readyCamera" color="primary" icon="camera" @click="captureImage" />
    </q-btn-group>
    <div v-if="!readyCamera" class="q-gutter-sm row items-start q-mt-sm">
      <q-img
        :style="{
          zIndex: 0,
        }"
        v-for="(image, index) in images"
        :key="'image-' + index"
        spinner-color="blue"
        :src="image"
      />
    </div>
  </div>
</template>

<script>
import { Notify } from 'quasar'
import { ref, reactive, defineComponent, onBeforeUnmount, onMounted } from 'vue'
import { CameraPreview } from '@capacitor-community/camera-preview'
import { BarcodeScanner } from '@capacitor-community/barcode-scanner'

export default defineComponent({
  setup() {
    const images = reactive([])
    const readyCamera = ref(false)

    const startCamera = async () => {
      try {
        readyCamera.value = true
        await CameraPreview.start({
          position: 'rear',
          y: 170,
          height: 512,
          toBack: true,
        })
      } catch (error) {
        console.error('Error starting camera preview:', error)
      }
    }

    const captureImage = async () => {
      try {
        const result = await CameraPreview.capture()
        images.push(`data:image/jpeg;base64,${result.value}`)
        Notify.create({ message: 'Captured Image', position: 'bottom', color: 'green' })
        console.log('Captured Image:', result)
      } catch (error) {
        console.error('Error capturing image:', error)
      }
    }
    const stopCamera = async () => {
      try {
        readyCamera.value = false
        await CameraPreview.stop()
      } catch (error) {
        console.error('Error stopping camera preview:', error)
      }
    }

    const startScan = async () => {
      document.querySelector('body')?.classList.add('scanner-active')

      await BarcodeScanner.checkPermission({ force: true })

      BarcodeScanner.hideBackground()

      console.log({ BarcodeScanner })
      const result = await BarcodeScanner.startScan()
      console.log({ result })

      if (result.hasContent) {
        Notify.create(result.content)
        stopScan()
      }
    }

    const stopScan = async () => {
      document.querySelector('body')?.classList.remove('scanner-active')
      BarcodeScanner.showBackground()
      BarcodeScanner.stopScan()
    }

    onBeforeUnmount(() => {
      stopCamera()
      stopScan()
    })

    return {
      images,
      readyCamera,
      startCamera,
      startScan,
      stopScan,
      stopCamera,
      captureImage,
    }
  },
})
</script>
