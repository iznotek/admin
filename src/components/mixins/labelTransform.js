import { checkField } from '@/components/mixins/checkField'

export const labelTransform = {
  methods: {
    checkLabel (e) {
      const elm = e.currentTarget
      const label = elm.parentNode.querySelector('label')

      this.hasText(elm.value)
        ? label.classList.add('u-isUntransformed')
        : label.classList.remove('u-isUntransformed')
    },
    resetLabel (e) {
      const label = e.currentTarget.parentNode.querySelector('label')
      label.classList.add('u-isUntransformed')
    }
  },
  mixins: [checkField]
}
