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

<style lang="scss">
p {
  @include global-monospace;
}
</style>
