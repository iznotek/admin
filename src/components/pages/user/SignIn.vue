<template>
  <article class="t-page t-page--signIn">
    <h1 class="t-page__heading">Sign in</h1>
    <div class="t-page__content t-page__content--user">
      <div v-if="loading">Loading...</div>
      <div v-if="error">{{error.message}} Add Alert.vue component</div>
      <form class="c-form c-form--user" v-on:submit.prevent="signIn">
        <div class="c-form__fieldsets">
          <fieldset>
            <div class="c-form__field">
              <div class="c-form__label">
                <label class="c-form__labelName" for="email">Email</label>
              </div>
              <input class="c-form__input" id="email" type="email" autocomplete
                v-model="email"
                @focus="resetLabel" 
                @blur="checkLabel">
            </div>
            <div class="c-form__field">
              <div class="c-form__label">
                <label class="c-form__labelName" for="password">Password</label>
              </div>
              <input class="c-form__input" id="password" type="password" autocomplete
                v-model="password"
                @focus="resetLabel" 
                @blur="checkLabel">
            </div>
          </fieldset>
        </div>
        <div class="c-form__actions">
          <router-link to="/" exact>Forgot password?</router-link>
          <input class="c-button c-button--submit" :class="{'c-button--loading': loading}" type="submit" value="Sign in" :disabled="!formIsValid">
        </div>
      </form>
    </div>
  </article>
</template>

<script>
import { labelTransform } from '@/components/mixins/labelTransform'

export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    error () {
      return this.$store.getters.error
    },
    formIsValid () {
      return this.email !== '' && this.password !== ''
    },
    // Add buttonLoading or something
    loading () {
      return this.$store.getters.loading
    },
    user () {
      return this.$store.getters.user
    }
  },
  watch: {
    user (value) {
      if (value !== null && value !== undefined) {
        this.$router.push('/')
      }
    }
  },
  methods: {
    signIn () {
      this.$store.dispatch('signUserIn', {email: this.email, password: this.password})
    }
  },
  mixins: [labelTransform]
}
</script>
