export default {
  methods: {
    $emit (...args) {
      this.triggerEvent(...args)
    }
  }
}