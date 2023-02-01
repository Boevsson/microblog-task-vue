<template>
  <b-container class="pa-10">
    <b-row>
      <b-col class="text-center">
        <span class="grey--text">Welcome! Please log in to your account.</span>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <b-form ref="LoginForm" @submit.prevent="authenticate">
          <b-form-input
            id="login-email"
            v-model="email"
            :error-messages="emailErrors"
            class="mb-6"
            hint="Enter your e-mail"
            label="E-mail"
            name="input-email"
            type="text"
            @blur="$v.email.$touch()"
          />
          <span v-if="emailErrors.length > 0">{{emailErrors[0]}}</span>

          <b-form-input
            id="password"
            v-model="password"
            type="password"
            autocomplete="off"
            hint="Enter your password"
            label="Password"
            name="input-password"
            @blur="$v.password.$touch()"
          />
          <span v-if="passwordErrors.length > 0">{{passwordErrors[0]}}</span>

          <b-row>
            <b-col class="text-center">
              <b-btn
                id="login-btn"
                :disabled="$v.$anyError"
                color="primary"
                raised
                rounded
                type="submit"
                width="200"
                x-large
              >
                Log in
              </b-btn>
            </b-col>
          </b-row>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { email, required } from 'vuelidate/lib/validators'
// import authService from '@/services/auth.service'

export default {
  name: 'AuthLoginView',

  validations: {
    email: {
      required,
      email
    },

    password: {
      required
    }
  },

  data () {
    return {
      email: null,
      password: null,
    }
  },

  computed: {
    emailErrors () {
      const errors = []
      
      if (!this.$v.email.$dirty) {
        return errors
      }

      !this.$v.email.required && errors.push('E-mail is required')
      !this.$v.email.email && errors.push('E-mail format is invalid')
      return errors
    },

    passwordErrors () {
      const errors = []

      if (!this.$v.password.$dirty) {
        return errors
      }

      !this.$v.password.required && errors.push('Password is required')
      return errors
    }
  },

  methods: {
    async authenticate () {
      
      this.$v.$touch()

      if (this.$v.$anyError) {
        return
      }
      console.log(this.$store)
      try {
        await this.$store.dispatch('auth/login', {
          email: this.email,
          password: this.password
        })
        await this.$router.replace('/dashboard')
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
