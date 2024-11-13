<template>
  <div class="custom-image-select-component" @click="chooseImage" :style="{'width': width, 'height': height}">
    <input type="file" accept="image/*" hidden ref="image" @change="onFileChange">
    <img alt="" :src="img" v-if="img">
    <div class="custom-image-select-content" v-else>
      <v-icon x-large>mdi-plus</v-icon>
    </div>
  </div>
</template>

<script>
export default {
  name: "CustomImageSelectComponent",
  props: {
    thumbnail: {
      type: String,
      default: ""
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "100%"
    },
    slider: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      img: this.thumbnail,
      uploaded: false
    }
  },
  methods: {
    chooseImage() {
      this.$refs.image.value = null
      this.$refs.image.click()
    },
    onFileChange(e) {
      if (e.target.files[0]) {
        this.uploadFile(e.target.files[0])
      }
    },
    uploadFile(file) {
      const data = new FormData()
      data.set("upload", file)
      this.$store.dispatch('upload/upload', data)
        .then((res) => {
          if(!this.slider) {
            this.img = res.data.url
          }
          this.uploaded = true
          this.$emit('uploaded', res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  mounted() {
  },
  watch: {
    'thumbnail'() {
      if (!this.uploaded) {
        this.img = this.thumbnail
      }
    }
  }
}
</script>

<style scoped lang="scss">
.custom-image-select-component {
  border: 1px solid #757575;
  border-radius: 15px;
  cursor: pointer;

  aspect-ratio: 1 !important;

  .custom-image-select-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
  }

  img {
    width: 100%;
    height: 100%;
    border-radius: 15px;
  }
}
</style>
