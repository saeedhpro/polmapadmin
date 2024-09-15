<template>
  <div class="crop-image-component">
    <v-dialog
      v-model="dialog"
      :max-width="dialogMaxWidth"
      :max-height="dialogMaxHeight"
      hide-overlay
      :disabled="!imgSrc"
    >
      <!--      <img-->
      <!--        v-show="cropSrc"-->
      <!--        :src="cropSrc"-->
      <!--        style="width: 200px; border: 1px solid gray"-->
      <!--        alt="Cropped Image"-->
      <!--      />-->
      <v-card>
        <v-card-title><span class="headline"></span></v-card-title>
        <v-card-text>
          <cropper
            ref="cropper"
            :guides="false"
            :view-mode="0"
            drag-mode="move"
            :auto-crop-area="2"
            :min-container-width="100"
            :min-container-height="180"
            :background="true"
            :rotatable="true"
            :src="imgSrc"
            alt="Source Image"
            :modal="true"
            :img-style="{ width: '400px', height: '400px' }"
            :center="true"
            :highlight="true"
            :crop-box-resizable="true"
            :scalable="true"
          />
        </v-card-text>
        <v-card-actions>
          <v-btn
            class="cancel-button"
            color="blue darken-1 white--text" @click="cropImage"
          >
            برش
          </v-btn>
          <v-btn
            class="cancel-button"
            color="blue darken-1 white--text" @click="newImage"
          >
            تصویر جدید
          </v-btn>
          <!--          <v-icon color="blue" @click="cropImage">mdi-crop</v-icon>-->
          <v-icon color="blue" dark @click="rotate('r');">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.42578 16.6004L12.8591 11.1671C13.5008 10.5254 13.5008 9.47539 12.8591 8.83372L7.42578 3.40039"
                    stroke="#E85C2F" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </v-icon>
          <v-icon color="blue" dark @click="rotate('l');">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.5005 16.6004L7.06719 11.1671C6.42552 10.5254 6.42552 9.47539 7.06719 8.83372L12.5005 3.40039"
                    stroke="#E85C2F" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </v-icon>

          <v-spacer></v-spacer>

          <v-btn
            color="red darken-1 white--text" @click="dialog = false;"
          >
            لغو
          </v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "crop.vue",
  props: {
    value: {},
    pk: {default: "image_key"},
    dialogMaxWidth: {default: "600px"},
    // dialogMaxHeight: {default: "0.8vh"},
    dialogMaxHeight: {default: "600px"},
    maxWidth: {default: 1200},
    maxHeight: {default: 1200},
    aspectRatio: 16 / 9,
    // the URL of the blob image
    objectUrl: {default: ""}
  },
  data() {
    return {
      imgSrc: "",
      cropImg: null,
      dialog: false,
      file: null,
      filename: null,
      cropBlob: null
    };
  },
  computed: {
    croppedFile() {
      return new File([this.cropImg], this.file.name, {type: this.file.type});
    },
    cropSrc() {
      return this.cropImg || this.value;
    }
  },
  methods: {
    setImage(e) {
      // const file = e;
      const file = e.target.files[0];
      if (!file) return;
      // this.file = file
      this.filename = file.name;

      if (!file.type.includes("image/")) {
        alert("Please select an image file");
        return;
      }

      if (typeof FileReader === "function") {
        const reader = new FileReader();

        reader.onload = event => {
          this.imgSrc = event.target.result;
          // rebuild cropperjs with the updated source
          this.$refs.cropper.replace(event.target.result);
          this.$emit("update:dataUrl", this.imgSrc);
        };

        reader.readAsDataURL(file);
        this.dialog = true;
      } else {
        alert("Sorry, FileReader API not supported");
      }
    },
    cropImage() {
      // get image data for post processing, e.g. upload or setting image src
      // this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL()
      this.$refs.cropper
        .getCroppedCanvas({
          maxWidth: this.maxWidth,
          maxHeight: this.maxHeight
        })
        .toBlob(
          async (blob) => {
            const base64 = await this.toBase64(blob)
            this.cropImg = URL.createObjectURL(blob);
            this.croppedBlob = blob;
            this.$emit("update:objectUrl", this.cropImg);
            this.$emit("imaged", base64);
            this.$emit("changed", this.cropImg);
          },
          "image/jpeg",
          1
        );
      this.dialog = false;
    },
    toBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      })
    },
    rotate(dir) {
      if (dir === "r") {
        this.$refs.cropper.rotate(90);
      } else {
        this.$refs.cropper.rotate(-90);
      }
    },
    flip(vert) {
      let {scaleX, scaleY, rotate} = this.$refs.cropper.getData();
      // when image is rotated, direction must be flipped
      if (rotate === 90 || rotate === 270) {
        vert = !vert;
      }
      if (vert) {
        this.$refs.cropper.scale(scaleX, -1 * scaleY);
      } else {
        this.$refs.cropper.scale(-1 * scaleX, scaleY);
      }
    },
    newImage() {
      this.$emit('newImage');
    }
  }
}
</script>

<style scoped lang="scss">
.v-icon.v-icon.v-icon--link {
  padding: 0 10px;
}
</style>


<!--<crop-image-component-->
<!--  ref="crop"-->
<!--  @changed="cropped"-->
<!--  @imaged="imaged"-->
<!--  @newImage="openChooseImage"-->
<!--/>-->
<!--cropped(file) {-->
<!--},-->
<!--imaged(file) {-->
<!--if (!file) return-->
<!--this.form.file = file-->
<!--this.form.ext = file.split(",")[0].match(/[^:\s*]\w+\/[\w-+\d.]+(?=[;| ])/)[0].split('/')[1]-->
<!--this.toggleShowSendFileModal()-->
<!--},-->

<!--openChooseImage() {-->
<!--this.$refs.image.value = null-->
<!--this.$refs.image.click()-->
<!--},-->

<!--chooseImage(e) {-->
<!--this.$refs.crop.setImage(e)-->
<!--},-->
