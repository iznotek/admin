export const swapArrayItems = {
  methods: {
    swapItems (arr, key, newKey) {
      // Make more flexible when building drag and drop
      if (newKey < 0) {
        return this.content[key] === 0
      } else if (newKey >= this.content.length) {
        return this.content[key] === this.content.length
      } else {
        const temp = this.content[key]
        this.content[key] = this.content[newKey]
        this.content[newKey] = temp
      }
      return arr
    }
  }
}
