<template>
  <b-container class="">
      <post-form-view @submitForm="create"></post-form-view>
  </b-container>
</template>

<script>
import PostFormView from '@/views/posts/PostFormView.vue'
import PostService from '@/services/post.service'

export default {
  name: 'CreateAccountSetupQuestionView',

  components: {
    PostFormView
  },

  data () {
    return {
    }
  },

  computed: {},

  methods: {

    create (data) {

      let bodyFormData = new FormData()

      bodyFormData.set('title', data.title)
      bodyFormData.set('content', data.content)
      bodyFormData.set('file', data.file)
      
      PostService.create(bodyFormData).then(() => {

        this.$router.push(`/dashboard`)
      })
    }
  },
  created () {
  },
}
</script>

<style lang="scss" scoped>

</style>
