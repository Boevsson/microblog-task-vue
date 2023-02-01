<template>
  <b-row>
    <b-col>

      <b-form-group label="Title" label-cols-sm="2" label-size="sm">
        <b-input
          id="name-field"
          v-model="title"
          clearable
          required
        />
      </b-form-group>

      <b-form-group label="Content" label-cols-sm="2" label-size="sm">
        <b-textarea
          id="title-field"
          v-model="content"
          clearable
          required
        />
      </b-form-group>
      <b-form-group label="Image" label-cols-sm="2" label-size="sm">
        <b-img width="300" v-if="image_file_name" :src="'http://localhost:8080/uploads/' + image_file_name"></b-img>
        <b-form-file accept=".jpg, .png, .gif" v-model="file"></b-form-file>
      </b-form-group>
      <b-button @click="submitForm">Save</b-button>

    </b-col>
  </b-row>
</template>

<script>
// import AppButton from '@/components/app/AppButton.vue'

export default {
  name: 'PostnFormView',

  components: {},
  props: {
    postProp: {
      type: Object,
      required: false,
      default: null,
    },
  },

  data () {
    return {
      id: null,
      title: null,
      content: null,
      image_file_name: null,
      file: null,
      updateMode: false,
    }
  },

  computed: {},

  methods: {
    submitForm () {

      this.$emit('submitForm', {
        id: this.id,
        title: this.title,
        content: this.content,
        file: this.file,
      })
    },
  },
  created () {

    if (this.postProp) {

      this.id = this.postProp.id
      this.title = this.postProp.title
      this.content = this.postProp.content
      this.image_file_name = this.postProp.image_file_name

      this.updateMode = true
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
