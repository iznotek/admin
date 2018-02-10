<template>
  <div class="c-dropdown" @click="toggleDropdown">
    <div class="c-dropdown__dots" role="button">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <ul class="c-dropdown__actions" data-dropdown="actions">
      <slot></slot>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    toggleDropdown () {
      const dropdown = this.$el.querySelector('[data-dropdown="actions"]')

      dropdown.classList.contains('c-dropdown__actions--open')
        ? dropdown.classList.remove('c-dropdown__actions--open')
        : dropdown.classList.add('c-dropdown__actions--open')
    }
  }
}
</script>
