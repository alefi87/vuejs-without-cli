<template>
  <div>
    <input type="text" placeholder="Type something" v-model="message">
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      message: ''
    }
  }
}
</script>

<style>
p {
  font-family: 'Courier New', Courier, monospace;
}
</style>

