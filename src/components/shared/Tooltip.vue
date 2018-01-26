<template>
  <div class="tooltip">
    <span class="tooltip__icon">i</span>
    <div class="tooltip__content" v-html="content"></div>
  </div>
</template>

<script>
export default {
  props: ['content']
}
</script>