<template>
  <div class="home">
    <b-container>
      <b-row>
        <b-col>
          ID
        </b-col>
        <b-col>
          Title
        </b-col>
        <b-col>
          Image
        </b-col>
      </b-row>

      <b-row v-for="(post, index) in posts" :key="index">
        <b-col>
          {{ post.id }}
        </b-col>
        <b-col>
          {{ post.title }}
        </b-col>
        <b-col>
          <b-img width="300" v-if="post.image_file_name" :src="'http://localhost:8080/uploads/' + post.image_file_name"></b-img>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>

import PostService from '@/services/post.service'

export default {
  name: 'DashboardView',
  components: {
  },
  data () {
    return {
      posts: null,
    }
  },
  methods: {
    redirectToUpdate (id) {
      this.$router.push(`/update-post/` + id)
    },
    deletePost (id) {
      if (confirm('Are you sure you want to delete this post?')) {
        PostService.delete(id).then(() => {

          this.loadPosts()
        })
      }
    },
    loadPosts () {
      PostService.getAll().then((res) => {
        this.posts = res
      })
    },
  },
  created(){

    this.loadPosts()
  }  
}
</script>
