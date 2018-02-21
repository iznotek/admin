<template>
  <ul class="c-toggle" data-toggle>
    <li v-for="(item, i) in buttons" :key="i" class="c-toggle__item">
      <button class="c-toggle__button c-button" :class="{ 'c-toggle__button--active': item.active }" @click="onToggle($event, item.type)">{{item.type}}</button>
    </li>
  </ul>
</template>

<script>
export default {
  methods: {
    onToggle (e, type) {
      const btn = e.currentTarget
      const activeClass = 'c-toggle__button--active'

      btn.closest('[data-toggle]').querySelector(`.${activeClass}`).classList.remove(`${activeClass}`)
      btn.classList.add(`${activeClass}`)

      this.$emit('toggle', type)
    }
  },
  props: ['buttons']
}
</script>
