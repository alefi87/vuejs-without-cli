<template>
  <div id="app">
    <h1>Hello world!</h1>
    <app-message-field />
    <p>
      <img
        src="./assets/image-icon.png"
        alt="Image icon"
      >
      A tiny icon which should be base64 encoded
    </p>
  </div>
</template>

<script>
import MessageField from '@/components/MessageField.vue'
export default {
  components: {
    appMessageField: MessageField
  },
  data () {}
}
</script>

<style>
</style>
