<template>
  <div>
    <BreadCrumb pageTitle="All Leads" />
    <div style="text-align: right;" class="my-3">
      <a class="btn btn-sm btn-secondary mx-2"
        href="http://sapphire-api.digisparksolutions.ng/leads/downloadLeadsTemplate" target="_blank">Download
        Template</a>
    </div>
    <CustomTable :propData="dataToPass" :head-action="mainAction" head-action-text="Upload Leads"
      :callBack="moreRecords" :viewDetails="allItemActions" buttonText="View Offer" report="leads"
      :webAccessToken="webAccessToken" webAction="download-leads-report" :downloadStatusOptions="statusOptions" />
    <div class="modal fade updateStatusModal" id="updateStatusModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content p-15 p-md-40">
          <div class="modal-header d-block ps-0 pe-0 pt-0 pb-15 pb-md-25">
            <h5 class="modal-title fw-bold text-black">Update Status</h5>
          </div>
          <div class="modal-body ps-0 pe-0 pb-0 pt-15 pt-md-25">
            <form @submit.prevent="updateStatus">
              <div class="row">
                <div class="col-lg-12 col-md-6">
                  <div class="form-group mb-15 mb-md-25">
                    <label class="d-block text-black fw-semibold mb-10">
                      Status
                    </label>
                    <select v-model="updateForm.status" class="form-control shadow-none rounded-0 text-black">
                      <option value="">Select</option>
                      <option v-for="option in statusOptions" :value="option" :key="option">{{ option?.toUpperCase() }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="col-lg-12 col-md-6">
                  <div class="form-group mb-15 mb-md-25">
                    <label class="d-block text-black fw-semibold mb-10">
                      Remark (Optional)
                    </label>
                    <textarea type="text" v-model="updateForm.remark"
                      class="form-control shadow-none rounded-0 text-black" placeholder="Enter Remark"></textarea>
                  </div>
                </div>

              </div>
              <button
                class="default-btn transition border-0 fw-medium text-white pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-35 pe-md-35 rounded-1 fs-md-15 fs-lg-16"
                type="submit" :disabled="updateForm.processing">
                {{ updateForm.processing ? "Please Wait..." : "Submit"}}
              </button>
            </form>
          </div>
          <button type="button" class="btn-close shadow-none" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

      </div>
      <button class="invisible" id="updateStatusModalButton" data-bs-toggle="modal"
        data-bs-target="#updateStatusModal"></button>
    </div>

    <div class="modal fade leadHistoryModal" id="leadHistoryModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content p-15 p-md-40">
          <div class="modal-header d-block ps-0 pe-0 pt-0 pb-15 pb-md-25">
            <h5 class="modal-title fw-bold text-black">Lead History</h5>
          </div>
          <div class="modal-body ps-0 pe-0 pb-0 pt-15 pt-md-25">
            <table class="ps-0 mb-0 w-100">
              <thead>
                <tr>
                  <th class="fs-13 fw-medium text-dark-emphasis">REMARK</th>
                  <th class="fs-13 fw-medium text-dark-emphasis mx-2">DATE</th>
                  <th class="fs-13 fw-medium text-dark-emphasis mx-2">UPDATED BY</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border border-light" v-for="history in leadToDisplay?.lead_histories" :key="history.id">
                  <td class="py-3 text-left" style="width: 50% !important;">
                    <span class="d-block fw-bold text-black-emphasis me-15">
                      {{ history.remark }}.
                    </span>

                  </td>

                  <td class="p-2 text-left w-25">
                    {{ formatDateTime(history.created_at) }}
                  </td>
                  <td class="p-2 text-left w-25">
                    {{ history.user?.name }}
                  </td>
                </tr>
              </tbody>

            </table>
          </div>
          <button type="button" class="btn-close shadow-none" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

      </div>
      <button class="invisible" id="leadHistoryModalButton" data-bs-toggle="modal"
        data-bs-target="#leadHistoryModal"></button>
    </div>
    <div class="modal fade leadDetailsModal" id="leadDetailsModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content p-15 p-md-40">
          <div class="modal-header d-block ps-0 pe-0 pt-0 pb-15 pb-md-25">
            <h5 class="modal-title fw-bold text-black">Lead Details</h5>
          </div>
          <div class="modal-body ps-0 pe-0 pb-0 pt-15 pt-md-25">
            <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing lead-info-box">
              <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30">
                <div class="profile-info d-sm-flex align-items-center">

                  <div class="title mt-12 mt-sm-0">
                    <h5 class="text-black fw-medium mb-8">{{ leadToDisplay?.name }}</h5>

                    <span class="d-block fw-bold text-primary"> {{ leadToDisplay?.organization_name }} </span>
                  </div>
                </div>
                <div class="border-top mt-15 mb-15 mt-sm-20 mb-sm-20 mt-md-25 mb-md-25 mt-lg-30 mb-lg-30"></div>
                <div class="d-flex align-items-center justify-content-between">
                  <h5 class="fw-medium text-black-emphasis mb-0">Lead’s Information</h5>
                  <a href="#" @click.prevent="closeModal('leadDetailsModal'); showUpdateStatus(leadToDisplay?.id)"
                    class="d-inline-block text-decoration-none lh-1 text-muted fw-medium">
                    <i class="ph-duotone ph-pencil text-black position-relative top-1 fs-16 me-1"></i>
                    Update Status
                  </a>
                </div>
                <ul class="info mt-25 ps-0 mb-0 list-unstyled row">
                  <li class="position-relative col-md-6">
                    <div class="icon text-info rounded-circle text-center">
                      <i class="flaticon-telephone-call"></i>
                    </div>
                    <span class="d-block text-black mb-5 fw-semibold">Phone No</span>
                    <a :href="'tel:+234'+leadToDisplay?.phone_number"
                      class="d-inline-block fs-md-15 fs-lg-16 text-muted text-decoration-none">
                      {{ leadToDisplay?.phone_number }}
                    </a>
                  </li>
                  <li class="position-relative col-md-6">
                    <div class="icon text-success rounded-circle text-center">
                      <i class="flaticon-maps-and-flags"></i>
                    </div>
                    <span class="d-block text-black mb-5 fw-semibold">City/State</span>
                    <a href="mailto:johnathon23@gmail.com"
                      class="d-inline-block fs-md-15 fs-lg-16 text-primary text-decoration-none">
                      {{ leadToDisplay?.city_name }}, {{ leadToDisplay?.state_name }}
                    </a>
                  </li>
                  <li class="position-relative col-md-6">
                    <div class="icon text-info rounded-circle text-center">
                      <i class="flaticon-comment"></i>
                    </div>
                    <span class="d-block text-black mb-5 fw-semibold">
                      Remark
                    </span>
                    <span class="d-inline-block fs-md-15 fs-lg-16 text-muted"> {{ leadToDisplay?.remark }} </span>
                  </li>

                  <li class="position-relative col-md-6">
                    <div class="icon text-warning rounded-circle text-center">
                      <i class="flaticon-industry"></i>
                    </div>
                    <span class="d-block text-black mb-5 fw-semibold">Priority</span>
                    <span class="d-inline-block fs-md-15 fs-lg-16 text-muted">
                      {{ leadToDisplay?.priority_level }}
                    </span>
                  </li>

                  <li class="position-relative col-md-6">
                    <div class="icon text-success rounded-circle text-center">
                      <i class="flaticon-money"></i>
                    </div>
                    <span class="d-block text-black mb-5 fw-semibold">
                      Net Pay
                    </span>
                    <span class="d-inline-block fs-md-15 fs-lg-16 text-muted">
                      ₦ {{ formatNumber(leadToDisplay?.net_pay) }}
                    </span>
                  </li>
                  <li class="position-relative col-md-6">
                    <div class="icon text-info rounded-circle text-center">
                      <i class="flaticon-date-1"></i>
                    </div>
                    <span class="d-block text-black mb-5 fw-semibold">
                      Last Contacted
                    </span>
                    <span class="d-inline-block fs-md-15 fs-lg-16 text-muted">
                      {{ formatDateTime(leadToDisplay?.last_called_at) }}
                    </span>
                  </li>
                  <li class="position-relative col-md-6">
                    <div class="icon text-primary rounded-circle text-center">
                      <i class="flaticon-web"></i>
                    </div>
                    <span class="d-block text-black mb-5 fw-semibold">Bank Name</span>
                    <a href="#" target="_blank"
                      class="d-inline-block fs-md-15 fs-lg-16 text-muted text-decoration-none">
                      {{ leadToDisplay?.bank_name }}
                    </a>
                  </li>
                  <li class="position-relative col-md-6">
                    <div class="icon text-primary rounded-circle text-center">
                      <i class="flaticon-web"></i>
                    </div>
                    <span class="d-block text-black mb-5 fw-semibold">Bank Account</span>
                    <a href="#" target="_blank"
                      class="d-inline-block fs-md-15 fs-lg-16 text-muted text-decoration-none">
                      {{ leadToDisplay?.account_number }}
                    </a>
                  </li>
                  <li class="position-relative col-md-6">
                    <div class="icon text-primary rounded-circle text-center">
                      <i class="flaticon-user"></i>
                    </div>
                    <span class="d-block text-black mb-5 fw-semibold">Assigned To</span>
                    <a href="#" target="_blank"
                      class="d-inline-block fs-md-15 fs-lg-16 text-muted text-decoration-none">
                      {{leadToDisplay?.sales_officer?.name}}
                    </a>
                  </li>

                  <!-- <li class="position-relative">
                        <div class="icon text-primary rounded-circle text-center">
                          <i class="flaticon-search-1"></i>
                        </div>
                        <span class="d-block text-black mb-5 fw-semibold"> Lead Source </span>
                        <span class="d-inline-block fs-md-15 fs-lg-16 text-muted">
                          Social media advertisement
                        </span>
                      </li> -->
                  <li class="position-relative col-md-6">
                    <div class="icon text-warning rounded-circle text-center">
                      <i class="flaticon-status"></i>
                    </div>
                    <span class="d-block text-black mb-5 fw-semibold"> Lead Status </span>
                    <span class="badge text-outline-info">{{ leadToDisplay?.status?.toUpperCase() }}</span>
                  </li>
                </ul>
                <div class="border-bottom mt-15 mb-15 mt-sm-20 mb-sm-20 mt-md-25 mb-md-25 mt-lg-30 mb-lg-30"></div>
                <div class="d-flex align-items-center justify-content-between">
                  <h5 class="fw-medium text-black-emphasis mb-0">Offer Information</h5>

                </div>
                <ul v-if="leadToDisplay?.offer_details" class="info mt-25 ps-0 mb-0 list-unstyled row">
                  <li class="position-relative col-md-6">
                    <div class="icon text-info rounded-circle text-center">
                      <i class="flaticon-folder"></i>
                    </div>
                    <span class="d-block text-black mb-5 fw-semibold">Loan Amount</span>
                    <span class="d-inline-block fs-md-15 fs-lg-16 text-muted">
                      ₦ {{ formatNumber(leadToDisplay?.offer_details?.loan_amount) }}
                    </span>
                  </li>
                  <li class="position-relative col-md-6">
                    <div class="icon text-success rounded-circle text-center">
                      <i class="flaticon-clock"></i>
                    </div>
                    <span class="d-block text-black mb-5 fw-semibold">Tenor</span>
                    <span class="d-inline-block fs-md-15 fs-lg-16 text-muted">

                      {{ leadToDisplay?.offer_details?.tenor }}
                    </span>
                  </li>
                  <li class="position-relative col-md-6">
                    <div class="icon text-info rounded-circle text-center">
                      <i class="flaticon-recycle"></i>
                    </div>
                    <span class="d-block text-black mb-5 fw-semibold">
                      Monthly Repayment
                    </span>
                    <span class="d-inline-block fs-md-15 fs-lg-16 text-muted">
                      ₦ {{ formatNumber(leadToDisplay?.offer_details.monthly_repayment) }}
                    </span>
                  </li>

                  <li class="position-relative col-md-6">
                    <div class="icon text-success rounded-circle text-center">
                      <i class="flaticon-money"></i>
                    </div>
                    <span class="d-block text-black mb-5 fw-semibold">
                      Total Repayment
                    </span>
                    <span class="d-inline-block fs-md-15 fs-lg-16 text-muted">
                      ₦ {{ formatNumber(leadToDisplay?.offer_details.total_repayment) }}
                    </span>
                  </li>
                </ul>
                <div class="text-lg mt-3 fs-lg-16 fs-md-15" v-else>No offer at the moment</div>
              </div>

            </div>
          </div>
          <button type="button" class="btn-close shadow-none" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

      </div>
      <button class="invisible" id="leadDetailsModalButton" data-bs-toggle="modal"
        data-bs-target="#leadDetailsModal"></button>
    </div>
    <div class="modal fade uploadLeadsModal" id="uploadLeadsModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content p-15 p-md-40">
          <div class="modal-header d-block ps-0 pe-0 pt-0 pb-15 pb-md-25">
            <h5 class="modal-title fw-bold text-black">Upload Leads</h5>
          </div>
          <div class="modal-body ps-0 pe-0 pb-0 pt-15 pt-md-25">
            <lead-upload :callBack="closeModal"></lead-upload>
          </div>
          <button type="button" class="btn-close shadow-none" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
      </div>
    </div>
    <button class="invisible" id="uploadLeadsModalButton" data-bs-toggle="modal"
      data-bs-target="#uploadLeadsModal"></button>
  </div>

</template>
  
  <script>
  import { defineComponent } from "vue";
  
  import BreadCrumb from "@/components/Common/BreadCrumb.vue";
  import CustomTable from "@/components/Custom/CustomTable.vue";
  import global from "@/mixins/global";
  import Lead from "@/apis/Lead";
  import { useToast } from "vue-toastification";
  import LeadUpload from "../Partials/LeadUpload.vue";
  import Api from '@/apis/Api';
  import BASEURL from '@/apis/Api';
  import Admin from "@/apis/Admin";
  

  const toast = useToast();
  
  export default defineComponent({
    name: "LeadsPage",
    components: {
      BreadCrumb,
      CustomTable,
      LeadUpload
    },
    data() {
      return {
        dataToPass: {
        }, // Define the dataToPass property
        statusOptions: null,
        allLeads: [],
        leadToDisplay:  null,
        baseUrl: null,
        webAccessToken: null,
        updateForm: {
          leadId: null,
          remark: null,
          status: null,
          processing: false
        }
      };
    },
    
    computed:{
      allItemActions(){
        return [
          {
            'buttonText' : 'View Details',
            'method': this.viewDetails,
            'hasPermission': this.hasAnyPermission(['process-leads', 'view-all-leads'])
          },
          {
            'buttonText' : 'View History',
            'method': this.viewHistory,
            'hasPermission': this.hasAnyPermission(['process-leads'])
          },
          {
            'buttonText' : 'Update Report',
            'method': this.showUpdateStatus,
            'hasPermission': this.hasAnyPermission(['process-leads'])
          },
        ]
      },
      downloadReport(){
        return this.hasAnyPermission(['download-leads-report'])
      }
    },
    mounted() {
     this.baseUrl = BASEURL
      if(this.downloadReport){
        Admin.getWebAccess({
          'action': 'download-leads-report'
        }).then(response => {
          this.webAccessToken = response.data?.data?.token
          console.log('web acCESS', this.webAccessToken)
        });
      }

      Lead.statusOptions().then(data => {
        this.statusOptions = data.data.data;
      });
      Lead.allLeads().then(data => {
        this.allLeads = data.data;
        this.retrieveRecords(data)
      });

    },
    mixins: [global],
    methods: {  
      mainAction(){
        if(this.hasAnyPermission(['upload-leads'])){
          document.getElementById("uploadLeadsModalButton").click(); 
        }
      },
      getLeads() {
          Lead.allLeads().then(data => {
          this.allLeads = data.data;
          this.retrieveRecords(data)
        });

      },
      showUpdateStatus(itemId){
        if(this.hasAnyPermission(['process-leads'])){
         let lead = this.allLeads.data.filter(e => e.id == itemId)[0];
         this.updateForm.leadId = lead.id;
         this.updateForm.status = lead.status;
          document.getElementById("updateStatusModalButton").click(); 
        }
        
      },
      viewHistory(itemId){
        if(this.hasAnyPermission(['process-leads', 'view-all-leads']) || this.hasAnyPermission(['view-all-leads'])){
          this.leadToDisplay = this.allLeads.data.filter(e => e.id == itemId)[0];
          console.log(this.leadToDisplay, itemId);
          document.getElementById("leadHistoryModalButton").click(); 
        }
        
      },
      viewDetails(itemId){
        if(this.hasAnyPermission(['process-leads', 'view-all-leads'])){
          this.leadToDisplay = this.allLeads.data.filter(e => e.id == itemId)[0];
          console.log(this.leadToDisplay, itemId);
          document.getElementById("leadDetailsModalButton").click(); 
        }
        
      },
      moreRecords(url, search){
        if(url != null && typeof url != undefined){
          Lead.allLeads(search, url).then(data => {
            this.retrieveRecords(data)
          });
        }

        if(search != null && typeof search != undefined){
          Lead.allLeads(search).then(data => {
            this.retrieveRecords(data)
          });
        }
      },
      async retrieveRecords (response) {

        const responseData = response.data; 
        console.log('response payload:', responseData)
        const mappedData = responseData.data.map((item) => [
          item.name,
          item.phone_number,
          item.sales_officer?.name,
          item.city_name + ', ' +item.state_name,
          this.formatNumber(item.offer),
          item.status,
          item.id
        ]);
        
        let linksData = responseData;
        console.log(linksData);
        // links.pop()
        // links.shift()
        this.dataToPass = {
          headers: [
            "Name",
            "Phone Number",
            "Assigned To",
            "City/State",
            "Offer",
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
      updateStatus(){
        this.updateForm.processing = true;
        Lead.updateStatus(this.updateForm).then((response) => {
          this.updateForm.processing = false;
          toast.success('Lead Status Updated successfully');
          this.closeModal('updateStatusModal');
          this.getLeads();
        })
        .catch(error => {
            this.updateForm.processing = false;

            if (error.response.status === 422) {
              toast.error(error.response.data.message);
            // this.errors = error.response.data.errors;
            }
        });
      },
      closeModal(modalId = 'uploadLeadsModal'){
        document.getElementsByClassName(`${modalId}`)[0].classList.remove('show')
        document.getElementsByClassName(`${modalId}`)[0].removeAttribute('style');
        document.getElementsByClassName('modal-open')[0].removeAttribute('style');
        document.getElementsByClassName('modal-open')[0].classList.remove('modal-open')
        document.getElementsByClassName('modal-backdrop')[0].remove()
      }
    },
    
  });
  </script>