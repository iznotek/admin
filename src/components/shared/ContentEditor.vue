<template>
  <div class="c-form__field">
    <div class="c-form__actions c-form__actions--content">
      <button class="c-button c-button--l" @click.prevent="addContentField('quote')">Quote</button>
      <button class="c-button c-button--l" @click.prevent="addContentField('video')">Video</button>
      <button class="c-button c-button--l" @click.prevent="addContentField('image')">Image</button>
    </div>
    <ul>
      <li v-if="content !== null" class="c-form__input" :class="{'c-form__input--file': item.type.includes('image')}" v-for="(item, i) in content" :key="i">
        <label class="c-form__label" :for="`contentFile--${i}`" v-if="item.type.includes('image')">
          <img class="c-form__thumbnail c-form__thumbnail--s" :src="item.src">
          <span>{{item.name || `Select ${item.type}`}}</span>
          <input type="file" :id="`contentFile--${i}`" @change="handleContentFile($event, item, i)">
        </label>
        <label class="c-form__label" :for="`contentFile--${i}`" v-if="item.type.includes('quote')">
          <textarea class="c-form__input" :id="`contentFile--${i}`" v-model="item.text"></textarea>
        </label>
        <div class="c-form__actions c-form__actions--input">
          <button class="c-button c-button--secondary" @click.prevent="moveContent(i, 'up')">Up</button>
          <button class="c-button c-button--secondary" @click.prevent="moveContent(i, 'down')">Down</button>
          <button class="c-button c-button--secondary" @click.prevent="removeContent(i)">Remove</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    addContentField (type) {
      this.$emit('addContentField', type)
    },
    handleContentFile (e, item, key) {
      this.$emit('handleContentFile', e, item, key)
    },
    moveContent (key, direction) {
      this.$emit('moveContent', key, direction)
      this.$forceUpdate()
    },
    removeContent (key) {
      this.$emit('removeContent', key)
    }
  },
  props: ['content'],
  watch: {
    content () {
      console.log('this.content: ', this.content)
    }
  }
}
</script>