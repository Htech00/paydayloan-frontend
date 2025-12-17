<template>
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
      allowed="jpg,jpeg,png,pdf"
      @change="handleFileChange"
    />
  </div>
  <div class="text-center">
    <button
          type="button"
          @click="uploadFile"
          class="btn btn-primary btn-md my-5"
        >{{ uploadingImage ? 'Please Wait!' : 'Upload File' }}</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useToast } from "vue-toastification";
import Product from "@/apis/Product";

const toast = useToast();

export default defineComponent({
  name: "ProductImageUpload",
  props: ['callBack', 'productId'],
  data() {
    return {
      selectedFile: null as File | null,
      audioUrl: "",
      uploadingImage: false
    };
  },
  mounted()
  {
    this.selectedFile = null;
    this.uploadingImage = false
  },
  methods: {
    handleFileChange(event: Event) {
      const input = event.target as HTMLInputElement;
      this.selectedFile = input.files?.[0] || null;
      // this.previewImage();
    },
    // previewImage() {
    //   if (this.selectedFile) {
    //     const reader = new FileReader();
    //     reader.onload = (event) => {
    //       this.audioUrl = event.target?.result as string;
    //     };
    //     reader.readAsDataURL(this.selectedFile);
    //   } else {
    //     this.audioUrl = "";
    //   }
    // },
    async uploadFile() {
        this.uploadingImage = true;
      if (!this.selectedFile) return;

      const formData = new FormData();
        formData.append("image_file", this.selectedFile);
        // formData.append('file_name', this.fileName)

      try {
          Product.createImage(this.productId, formData).then(data => {
                this.uploadingImage = false;
                toast.success('Product image uploaded successfully')
                this.audioUrl = "";
                this.selectedFile = null;
            this.callBack('uploadImageModal');
            }).catch(error => {
                this.uploadingImage = false;
                this.callBack()
                this.audioUrl = "";
                this.selectedFile = null;
                if([422, 403].includes(error.response.status)) {
                    toast.error(error.response.data.message);
                }
            })
      } catch (error) {
        console.error("Error updating loan file:", error);
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