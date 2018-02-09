<template>
  <aside class="c-modal">
    <div class="c-modal__container">
      <header class="c-modal__content">
        <!-- Named slots with specific classes for heading and content? -->
        <slot></slot>
      </header>
      <div class="c-modal__actions">
        <button class="c-button c-button--secondary" @click.prevent="closeModal">Cancel</button>
        <button class="c-button c-button--l c-button--danger" @click.prevent="submitModal">{{event}}</button>
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  methods: {
    closeModal () {
      this.$emit('closeModal')
    },
    submitModal () {
      this.$emit('submitModal')
    }
  },
  props: ['event']
}
</script>
