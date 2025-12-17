<template>
  <div>
    <BreadCrumb pageTitle="All Special Approvals" />
    <div class="my-3 align-right" style="text-align: right;">
      <button class="invisible" id="createNewModalButton" v-if="hasAnyPermission(['create-special-approval'])"
        data-bs-toggle="modal" data-bs-target="#createNewModal">Create New</button>
    </div>
    <CustomTable :propData="dataToPass" :callBack="moreRecords" :viewDetails="allItemActions" button-text="Edit"
      :headAction="mainAction" headActionText="Add New Approval" />

    <div class="modal fade createNewModal" id="createNewModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content p-15 p-md-40">
          <div class="modal-header d-block ps-0 pe-0 pt-0 pb-15 pb-md-25">
            <h5 class="modal-title fw-bold text-black">Add Special Approval</h5>
          </div>
          <div class="modal-body ps-0 pe-0 pb-0 pt-15 pt-md-25">
            <form @submit.prevent="createApproval">
              <div class="row">
                <div class="col-lg-12 col-md-12">
                  <div class="form-group mb-15 mb-md-25">
                    <label class="d-block text-black fw-semibold mb-10">
                      Customer Name
                    </label>
                    <input type="text" required v-model="createForm.name"
                      class="form-control shadow-none rounded-0 text-black" placeholder="Enter Customer Name" />
                  </div>
                </div>

                <div class="col-lg-6 col-md-6">
                  <div class="form-group mb-15 mb-md-25">
                    <label class="d-block text-black fw-semibold mb-10">
                      Banks
                    </label>
                    <select class="form-control shadow-none rounded-0 text-black" v-model="createForm.remita_bank_code" 
                      required>
                      <option value="">Select</option>
                      <option v-for="bank in banks" :value="bank.code" :key="bank">{{ bank.name }}</option>
                    </select>

                  </div>
                </div>

                <div class="col-lg-6 col-md-6">
                  <div class="form-group mb-15 mb-md-25">
                    <label class="d-block text-black fw-semibold mb-10">
                      Account Number
                    </label>
                    <input type="string" v-model="createForm.account_number" required maxlength="10"
                      class="form-control shadow-none rounded-0 text-black"
                      placeholder="e.g. 1234567890" />
                  </div>
                </div>

              </div>
              <button
                class="default-btn transition border-0 fw-medium text-white pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-35 pe-md-35 rounded-1 fs-md-15 fs-lg-16"
                type="submit" :disabled="createForm.processing">
                {{ createForm.processing ? "Please Wait..." : "Submit"}}
              </button>
            </form>
          </div>
          <button type="button" class="btn-close shadow-none" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

      </div>
    </div>

    <!-- Confirm Reset Modal -->
    <div class="modal fade  modal-lg confirmDeactivateModal" id="confirmDeactivateModal" data-bs-keyboard="false" tabindex="-1"
      aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5">Deactivate Approval</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p class="fs-md-16 fs-lg-18">Are you sure you deactivate this approval?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              Nevermind
            </button>
            <button type="button" data-bs-dismiss="modal" class="btn btn-success" @click="deactivateApproval">
              Deactivate
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <button class="invisible" id="confirmDeactivateModalButton" data-bs-toggle="modal"
    data-bs-target="#confirmDeactivateModal"></button>
</template>

  <script>
  import { defineComponent } from "vue";
  
  import BreadCrumb from "../../components/Common/BreadCrumb.vue";
  import CustomTable from "@/components/Custom/CustomTable.vue";
  import global from "@/mixins/global";
  import { useToast } from "vue-toastification";
  import Loan from "@/apis/Loan";
  import SpecialApproval from "@/apis/SpecialApproval";

  const toast = useToast();
  
  export default defineComponent({
    name: "SpecialApprovalsPage",
    components: {
      BreadCrumb,
      CustomTable,
    },
    computed: {
      allItemActions() {
        return [
          {
            'buttonText': 'Deactivate',
            'method': this.handleDeactivate,
            'hasPermission': this.hasAnyPermission(['create-admin'])
          },
        ]
      }
    },
    data() {
      return {
        dataToPass: {
        }, // Define the dataToPass property
        banks: [],
        allApprovals: [],
        deactivateApprovalForm: {
          id: null,
          processing: false
        },
        createForm: {
          name: null,
          remita_bank_code: null,
          account_number: null,
          processing: false
        },
      };
    },
    mounted() {
      this.getApprovals();
      Loan.banks().then(data => {
        this.banks = data.data.data;
      });

    },
    mixins: [global],
    methods: {
      handleDeactivate(id) {
        this.deactivateApprovalForm.id = id;

        document.getElementById("confirmDeactivateModalButton")?.click();

      },
      deactivateApproval() {
        this.deactivateApprovalForm.processing = true;

        SpecialApproval.deactivate(this.deactivateApprovalForm.id).then(() => {
          this.deactivateApprovalForm.processing = false;

        this.getApprovals();

          toast.success('Special Approval deactivated successfully');
        }).catch(error => {
          this.deactivateApprovalForm.processing = false;

          if ([422, 403].includes(error.response.status)) {
            toast.error(error.response.data.message);
            // this.errors = error.response.data.errors;
          }
        });  
      },
      mainAction() {
        this.createForm = {
          name: null,
          remita_bank_code: null,
          account_number: null,
          processing: false
        };

        if(this.hasAnyPermission(['create-special-approval'])){
          document.getElementById('createNewModalButton')?.click();
        }
      },
      getApprovals(){
        SpecialApproval.allSpecialApprovals().then(data => {
          this.allApprovals = data.data.data.data;

          this.retrieveRecords(data)
        });
      },
      createApproval(){
          this.createForm.processing = true;
          SpecialApproval.create(this.createForm).then((response) => {
            this.createForm.processing = false;
            toast.success('Special Approval Created successfully');
            this.closeModal('createNewModal');
            this.getApprovals();
          })
          .catch(error => {
            this.createForm.processing = false;

              if (error.response.status === 422) {
              toast.error(error.response.data.message);
              // this.errors = error.response.data.errors;
              }
          });
        
      },
      moreRecords(url, search){
        if(url != null && typeof url != undefined){
          SpecialApproval.allSpecialApprovals(search, url).then(data => {
            this.allUsers = data.data.data.data;

            this.retrieveRecords(data)
          });
        }

        if(search != null && typeof search != undefined){
          SpecialApproval.allSpecialApprovals(search).then(data => {
            this.allUsers = data.data.data.data;

            this.retrieveRecords(data)
          });
        }
      },
      async retrieveRecords (response) {
        var now = new Date();
        const responseData = response.data; 
        const mappedData = responseData.data.data.map((item) => [
          item.name,
          item.bank_name,
          item.account_number,
          new Date(item.expires_at) < now ? 'EXPIRED' : 'ACTIVE',
          item.id
        ]);
        
        let linksData = responseData.data;
        // links.pop()
        // links.shift()
        this.dataToPass = {
          headers: [
            "Name",
            "Bank",
            "Account Number",
            "Status",
            "Action"
          ],
          data: [...mappedData],
          from: linksData.from,
          to: linksData.to,
          currentPage: linksData.current_page,
          total: linksData.total,
          previousPageUrl: linksData.prev_page_url,
          nextPageUrl: linksData.next_page_url,
          links: linksData.links,
        };
      },
      closeModal(modalId){
        document.getElementsByClassName(`${modalId}`)[0].classList.remove('show')
        document.getElementsByClassName(`${modalId}`)[0].removeAttribute('style');
        document.getElementsByClassName('modal-open')[0].removeAttribute('style');
        document.getElementsByClassName('modal-open')[0].classList.remove('modal-open')
        document.getElementsByClassName('modal-backdrop')[0].remove()
      }
    },
    
  });
  </script>