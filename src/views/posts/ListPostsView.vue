<template>
  <div class="home">
    <nav>
      <router-link to="/create-post">Create post</router-link>
    </nav>
    <b-container>
      <b-row>
        <b-col>
          ID
        </b-col>
        <b-col>
          Title
        </b-col>
        <b-col>
          Actions
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
          <b-button @click="redirectToUpdate(post.id)">Edit</b-button>
          <b-button @click="deletePost(post.id)">Delete</b-button>
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
