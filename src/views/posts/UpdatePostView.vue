<template>
  <b-container class="">
    <post-form-view @submitForm="updatePost" v-if="post" :post-prop="post"></post-form-view>
  </b-container>
</template>

<script>
import PostFormView from '@/views/posts/PostFormView.vue'
import PostService from '@/services/post.service'

export default {
  name: 'UpdateIntroScreenView',

  components: {
    PostFormView,
  },

  data () {
    return {
      post: null,
    }
  },

  computed: {},

  methods: {

    updatePost (data) {

      let bodyFormData = new FormData()

      bodyFormData.set('id', data.id)
      bodyFormData.set('title', data.title)
      bodyFormData.set('content', data.content)
      
      if (data.file) {

        bodyFormData.set('file', data.file)
      }

      PostService.update(data.id, bodyFormData).then(() => {

        this.$router.push(`/dashboard`)
      })
    },
    loadPost (id) {

      PostService.getOne(id).then((res) => {
        this.post = res
      })
    },
  },
  mounted () {
    this.loadPost(this.$route.params.id)
  },
}
</script>

<style lang="scss" scoped>

</style>
