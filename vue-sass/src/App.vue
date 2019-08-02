<template>
  <div id="app">
    <h1>Hello world!</h1>
    <app-message-field></app-message-field>
  </div>
</template>

<script>
import MessageField from '@/components/MessageField.vue'
export default {
  data () {},
  components: {
    appMessageField: MessageField
  }
}
</script>

<style>
</style>
