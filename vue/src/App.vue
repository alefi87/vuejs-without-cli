<template>
  <div id="app">
    <h1>Hello world!</h1>
    <app-message-field />
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
