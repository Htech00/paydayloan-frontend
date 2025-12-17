<template>
<div class="text-center">
    <audio class="my-3" v-if="audioUrl" controls="true" autobuffer="autobuffer" :src="audioUrl"/>
</div>
  <div class="file-upload text-center position-relative">
    <!-- <i class="flaticon-gallery-1"></i> -->
    <span class="d-block text-muted">
      Drop Files Here Or
      <span class="text-black fw-medium position-relative">
        Click To Upload
      </span>
    </span>
    <input
      type="file"
      class="d-block shadow-none border-0 position-absolute start-0 end-0 top-0 bottom-0 z-1 opacity-0"
      ref="fileInput"
      accept=".mp3,.aac,.opus,.flac,.wav,.mp4,.webm,.ogg,.wav,.m4a"
      @change="handleFileChange"
    />
  </div>
  <div class="text-center">
    <button
          type="button"
          @click="uploadImage"
          class="btn btn-primary btn-md my-5"
        >{{ uploadingImage ? 'Please Wait!' : 'Upload Image' }}</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "@/store";
import Loan from "@/apis/Loan";
import { useToast } from "vue-toastification";
import router from "@/router";

const toast = useToast();

export default defineComponent({
  name: "AudioUpload",
  props: ['callBack'],
  data() {
    return {
      selectedFile: null as File | null,
      audioUrl: "",
      uploadingImage: false
    };
  },
  methods: {
    handleFileChange(event: Event) {
      const input = event.target as HTMLInputElement;
      this.selectedFile = input.files?.[0] || null;
      this.previewImage();
      console.log('you dey behave thesame?')
    },
    previewImage() {
      if (this.selectedFile) {
        const reader = new FileReader();
        reader.onload = (event) => {
          this.audioUrl = event.target?.result as string;
        };
        reader.readAsDataURL(this.selectedFile);
      } else {
        this.audioUrl = "";
      }
    },
    async uploadImage() {
        this.uploadingImage = true;
      if (!this.selectedFile) return;

      const formData = new FormData();
      formData.append("authorization_file", this.selectedFile);

      try {
            Loan.uploadAuthorization(router.currentRoute.value.params.id, formData).then(data => {
                this.uploadingImage = false;
                toast.success('Authentication uploaded successfully')
                this.audioUrl = "";
                this.selectedFile = null;
              this.callBack(true, "uploadAudioModal")
            }).catch(error => {
                this.uploadingImage = false;
              this.callBack(false, "uploadAudioModal")
                this.audioUrl = "";
                this.selectedFile = null;
                if([422, 403].includes(error.response?.status)) {
                    toast.error(error.response.data.message);
                }
            })
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    },
  },
});
</script>

<style scoped>
.preview-image {
  max-width: 100%;
  max-height: 300px;
  margin-bottom: 30px;
}
</style>