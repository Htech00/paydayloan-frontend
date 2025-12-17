<template>
  <div>
    <div class="text-center my-3 text-lg text-bold" v-if="selectedFile"> {{selectedFile.name }} : {{selectedFile.size/1000 }}kb</div>

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
        @change="handleFileChange"
      />
    </div>
    <div class="text-center">
      <button
            :disabled="!selectedFile"
            type="button"
            @click="uploadImage"
            class="btn btn-primary btn-md my-5" :class="{'bg-opacity-50': !selectedFile}"
          >{{ uploadingImage ? 'Please Wait!' : 'Upload Document' }}</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Lead from "@/apis/Lead";
import { useToast } from "vue-toastification";

const toast = useToast();

export default defineComponent({
  name: "AudioUpload",
  props: ['callBack'],
  data() {
    return {
      selectedFile: null as File | null,
      uploadingImage: false,
      audioUrl: ''
    };
  },
  methods: {
    handleFileChange(event: Event) {
      console.log('selected file: ',this.selectedFile);
      const input = event.target as HTMLInputElement;
      this.selectedFile = input.files?.[0] || null;
    this.previewImage();
    console.log('selected file: ',this.selectedFile);
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
      if (!this.selectedFile) return;
      this.uploadingImage = true;

      const formData = new FormData();
      formData.append("authorization_file", this.selectedFile);

      try {
            Lead.upload(formData).then(data => {
                this.uploadingImage = false;
                toast.success('Leads uploaded successfully')
                this.selectedFile = null;
                this.callBack(true)
            }).catch(error => {
                this.uploadingImage = false;
                this.callBack(false)
                this.selectedFile = null;
                if([422, 403].includes(error.response.status)) {
                    toast.error(error.response.data.message);
                }
            })
      } catch (error) {
        console.error("Error uploading leads:", error);
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