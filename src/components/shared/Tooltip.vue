<template>
  <div class="c-tooltip">
    <span class="c-tooltip__icon">i</span>
    <div class="c-tooltip__content" v-html="content"></div>
  </div>
</template>

<script>
export default {
  props: ['content']
}
</script>