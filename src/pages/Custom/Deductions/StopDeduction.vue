<template>
      <BreadCrumb pageTitle="Stop Deduction" />

    <div class="card mb-25 border-0 rounded-0 bg-white create-new-project-box">
      <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
        <form @submit.prevent="handleSubmit">
          <div class="row">
            <div class="col-md-12">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Service Provider
                </label>
                <select v-model="form.provider" class="form-control shadow-none rounded-0 text-black">
                    <option value="">Select</option>
                    <option value="remita">Remita</option>
                </select>
              </div>
            </div>
            <div class="col-md-12">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                Mandate Reference
                </label>
                <input
                  type="text"
                  required
                  v-model="form.mandateReference"
                  class="form-control shadow-none rounded-0 text-black"
                  placeholder="Enter Mandate Reference"
                />
              </div>
            </div>
            
            
            <div class="col-md-12">
              <button
                class="default-btn transition border-0 fw-medium text-white pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-35 pe-md-35 rounded-1 fs-md-15 fs-lg-16 bg-success"
                type="submit"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div>
        <div
        class="modal fade confirmModal"
        id="confirmModal"
        tabindex="-1"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content p-15 p-md-40">
            <div class="modal-header d-block ps-0 pe-0 pt-0 pb-15 pb-md-25">
              <h5 class="modal-title fw-bold text-black">Stop Deduction</h5>
            </div>
            <div class="modal-body ps-0 pe-0 pb-0 pt-15 pt-md-25">
              <p class="text-lg py-3">Are you sure you want to stop deduction on {{ form.provider }} with reference <b>{{ form.mandateReference }}</b>?</p>
            </div>
            <div class="modal-footer">
                <div class="d-flex justify-content-between w-100">
                    <button
                        class="btn btn-secondary btn-md shadow-none"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        type="button"
                    >Never Mind</button>
                    <button
                        type="button"
                        class="btn btn-danger btn-md shadow-none"
                        aria-label="Close"
                        @click.prevent="submit"
                    >Confirm</button>
                </div>
                
            </div>
            <button
              type="button"
              class="btn-close shadow-none"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
            
          </div>
        
        </div>
        <button class="invisible" id="confirmModalButton" data-bs-toggle="modal" data-bs-target="#confirmModal"></button>
      </div>
    </div>
    
</template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  import Deduction from "@/apis/Deduction";
import { useToast } from "vue-toastification";
import global from "@/mixins/global";
import BreadCrumb from "@/components/Common/BreadCrumb.vue";
  
  const toast = useToast();

    
  export default defineComponent({
    name: "StopDeductionPage",
    data(){
        return {
            form: {
                mandateReference: null,
                provider: null,
                processing: false
            }
        }
    },
    mixins: [global],
    components: {BreadCrumb},
    methods: {
        handleSubmit(){
          if(this.hasAnyPermission(['edit-repayment'])){
              document.getElementById("confirmModalButton")?.click();
          } 

        },
        submit(){
            Deduction.stopCollection(this.form).then((response) => {
              this.closeModal('confirmModal');

            this.form.processing = false;
            toast.success('Stop collection request successful');
          })
          .catch(error => {
            this.closeModal('confirmModal');

            this.form.processing = false;

              if (error.response.status === 422) {
                toast.error(error.response.data.message);
              // this.errors = error.response.data.errors;
              } else {
                toast.error('Stop collection request failed');
              }
          });
        },
      closeModal(modalId) {
          if (modalId) {
            document.getElementsByClassName(`${modalId}`)[0].classList.remove('show')
            document.getElementsByClassName(`${modalId}`)[0].removeAttribute('style');
            document.getElementsByClassName('modal-open')[0].removeAttribute('style');
            document.getElementsByClassName('modal-open')[0].classList.remove('modal-open')
            document.getElementsByClassName('modal-backdrop')[0].remove()
          }
        }
    }
  });
  </script>