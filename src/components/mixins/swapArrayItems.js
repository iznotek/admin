export const swapArrayItems = {
  methods: {
    swapItems (arr, key, newKey) {
      // Make more flexible when building drag and drop
      if (newKey < 0) {
        return arr[key] === 0
      } else if (newKey >= arr.length) {
        return arr[key] === arr.length
      } else {
        const temp = arr[key]
        arr[key] = arr[newKey]
        arr[newKey] = temp
      }
    }
  }
}
