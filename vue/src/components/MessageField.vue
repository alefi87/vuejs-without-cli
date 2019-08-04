<template>
  <div>
    <input
      v-model="message"
      type="text"
      placeholder="Type something"
    >
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
