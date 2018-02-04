<template>
  <div class="lazyImage">
    <img class="lazyImage__target" :class="classes" :data-src="src" :alt="alt" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      ticking: false
    }
  },
  methods: {
    requestTick () {
      if (!this.ticking) {
        // requestAnimationFrame(this.isVisible)
      }
      this.ticking = true
    },

    useEvents () {
      window.addEventListener('scroll', (e) => {
        this.requestTick()
      })

      window.addEventListener('resize', (e) => {
        this.requestTick()
      })
    },
    // EVENTS ^^^

    addVisibleClass (elm) {
      if (window.getComputedStyle(elm).getPropertyValue('width')) {
        elm.classList.add('u-isVisible')
      }
    },

    setSource (elm, src) {
      elm.src = src
    },

    loadImg (url) {
      return new Promise((resolve, reject) => {
        const image = new Image()
        image.src = url
        image.onload = resolve
        image.onerror = reject
      })
    },

    showElm (entry) {
      const target = entry[0].target.querySelector('img')
      const url = target.dataset.src

      if (target.classList.contains('u-isVisible')) {
        return
      }

      if (entry[0].isIntersecting) {
        this.loadImg(url)
          .then(() => this.setSource(target, url))
          .then(() => this.addVisibleClass(target))
          .catch((err) => {
            console.log('Image error: ', err)
          })
      }
    },

    useIntersectionObserver () {
      const options = {
        threshold: 0
      }

      const io = new IntersectionObserver(this.showElm, options)
      io.observe(this.$el)
    },

    chooseIntersectionTechnique () {
      'IntersectionObserver' in window
        ? this.useIntersectionObserver()
        : console.log('use scroll event')
        // useEvents();
    }
  },
  mounted () {
    this.chooseIntersectionTechnique()
  },
  props: ['classes', 'src', 'alt']
}
</script>