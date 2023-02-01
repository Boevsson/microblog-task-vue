<template>
  <div>
    <transition mode="out-in" name="scale">
      <b-container :key="$router.currentRoute.path" class="pa-10" fluid>
        <router-view></router-view>
      </b-container>
    </transition>
  </div>
</template>

<script>

export default {
  name: 'TheLayoutWrap',
  components: {},

  data () {
    return {
      menuItems: [
        {
          title: 'Posts',
          to: '/dashboard',
          class: 'nav-item-products',
        },
      ],
    }
  },

  methods: {
    redirectToHomePage () {
      if (this.$route.path === '/dashboard') {
        return
      }

      this.$router.push(`/dashboard`)
    },
  },
}
</script>

<style>

</style>
