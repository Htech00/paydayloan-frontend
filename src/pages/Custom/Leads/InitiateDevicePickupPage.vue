<template>
  <BreadCrumb pageTitle="Loan Pickup" />

  <div class="card mb-25 border-0 rounded-0 bg-white create-new-project-box">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
      <form @submit.prevent="submit">
        <div class="row">
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Loan Reference
              </label>
              <input type="text" required v-model="form.loan_reference" class="form-control shadow-none rounded-0 text-black"
                placeholder="Enter Loan Reference" />
            </div>
          </div>
          <div class="col-md-12">
            <button
              class="default-btn transition border-0 fw-medium text-white pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-35 pe-md-35 rounded-1 fs-md-15 fs-lg-16 bg-success"
              type="submit" :disabled="form.processing">
              {{form.processing ? "Processing..." : "Submit"}}
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>

</template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  import { useToast } from "vue-toastification";
  import global from "@/mixins/global";
  import Loan from "@/apis/Loan";
  import BreadCrumb from "@/components/Common/BreadCrumb.vue";
  
  const toast = useToast();

    
  export default defineComponent({
    name: "InitiateDevicePickupPage",
    data(){
        return {
            form: {
              loan_reference: null,
              processing: false,
            }
        }
    },
    mixins: [global],
    components: {BreadCrumb},
    methods: {
        submit(){
            this.form.processing = true;

            Loan.initiateDevicePickup(this.form.loan_reference).then((response) => {
              this.form.processing = false;
              const loan = response.data.data;
              this.$router.push('/loans/'+loan.id)
            })
            .catch(error => {
                this.form.processing = false;
                if (error.response?.status === 422 || error.response?.status === 400) {
                    toast.error(error.response.data.message);
                // this.errors = error.response.data.errors;
                }

                if (error.response?.status === 404) {
                    toast.error('No valid record found');
                }
            });
        },
        closeModal(modalId){
          document.getElementsByClassName(`${modalId}`)[0].classList.remove('show')
          document.getElementsByClassName(`${modalId}`)[0].removeAttribute('style');
          document.getElementsByClassName('modal-open')[0].removeAttribute('style');
          document.getElementsByClassName('modal-open')[0].classList.remove('modal-open')
          document.getElementsByClassName('modal-backdrop')[0].remove()
        }
    }
  });
  </script>