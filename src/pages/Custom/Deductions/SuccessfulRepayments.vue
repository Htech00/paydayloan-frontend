<template>
  <div>
    <BreadCrumb pageTitle="Successful Repayments" />
    <div style="text-align: right;" class="my-3">
      <a class="default-btn position-relative transition border-0 fw-medium text-white pt-11 pb-11 ps-25 pe-25 pt-md-12 pb-md-12 ps-md-30 pe-md-30 rounded-1 bg-success fs-md-15 fs-lg-16 d-inline-block me-10 mb-10 mb-lg-0 text-nowrap mx-2" style="text-decoration: none;" @click.prevent="showUploadRepayments" href="#">Upload Repayments</a>
    </div>
    <CustomTable :propData="dataToPass" :callBack="moreRecords" :viewDetails="viewDetails" report="repayments"
      :webAccessToken="webAccessToken" webAction="download-repayments-report" :downloadStatusOptions="statusOptions"
          downloadReportUrl="http://192.168.1.46/reports/download/credit" />

    <div class="modal fade uploadRepaymentFileModal" id="uploadRepaymentFileModal" ref="uploadRepaymentFileModal" tabindex="-1"
      aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content p-15 p-md-40">
          <div class="modal-header d-block ps-0 pe-0 pt-0 pb-15 pb-md-25">
            <h5 class="modal-title fw-bold text-black">Update Loan File</h5>
          </div>
          <div class="modal-body ps-0 pe-0 pb-0 pt-15 pt-md-25">
            <div class="row">
                <div class="col-md-12 mb-3">
                  <div class="form-group mb-15 mb-sm-20 mb-md-25">
                    <label class="d-block text-black fw-semibold mb-10">
                      Select Statement Bank
                    </label>
                    <select class="form-control shadow-none rounded-0 text-black" v-model="statementBank">
                      <option value="">Select</option>
                      <option value="wema">Wema Bank</option>
                    </select>
                  </div>
                </div>
            </div>
            <repayments-file-upload v-if="statementBank" :callBack="closeModal" :bank="statementBank"></repayments-file-upload>
          </div>
          <button type="button" class="btn-close shadow-none" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
      </div>
      <button class="invisible" id="uploadRepaymentFileModalButton" data-bs-toggle="modal"
        data-bs-target="#uploadRepaymentFileModal"></button>
    </div>
  </div>
  
</template>
  
  <script>
  import { defineComponent } from "vue";
  
  import BreadCrumb from "@/components/Common/BreadCrumb.vue";
  import CustomTable from "@/components/Custom/CustomTable.vue";
  import global from "@/mixins/global";
  import Deduction from "@/apis/Deduction";
  import Admin from "@/apis/Admin";
  import RepaymentsFileUpload from "../Partials/RepaymentsFileUpload.vue";
  
  export default defineComponent({
    name: "SuccessfulRepaymentsPage",
    components: {
      BreadCrumb,
      CustomTable,
      RepaymentsFileUpload
    },
    computed: {
      downloadReport() {
        return this.hasAnyPermission(['download-repayments-report'])
      }
    },
    mounted() {
      Deduction.payments('successful').then(data => {
        this.retrieveRecords(data)
      });

      if (this.downloadReport) {
        Admin.getWebAccess({
          'action': 'download-repayments-report'
        }).then(response => {
          this.webAccessToken = response.data?.data?.token
          console.log('web acCESS', this.webAccessToken)
        });
      }

    },
    mixins: [global],
    methods: {
      showUploadRepayments() {
        if (this.hasAnyPermission(['add-repayment'])) {
          document.getElementById("uploadRepaymentFileModalButton")?.click();
        }
      },
      viewDetails() {
        //
      },
      moreRecords(url, search){
        if (url != null && typeof url != undefined) {
          Deduction.payments('successful', url).then(data => {
            this.retrieveRecords(data)
          });
        }

        if (search != null && typeof search != undefined) {
          Deduction.payments('successful', url, search).then(data => {
            this.retrieveRecords(data)
          });
        }
      },
      async retrieveRecords (response) {

        const responseData = response.data; 
        const mappedData = responseData.data.data.map((item) => [
          item.payment_date?.split('+')[0],
          item.loan?.reference,
          item.loan?.user?.name,
          this.formatNumber(item.amount),
          item.reference,
          item.payment_method?.name,
          item.initiator?.name ?? 'System',
          item.id
        ]);
        
        let linksData = responseData.data;
        // links.pop()
        // links.shift()
        this.dataToPass = {
          headers: [
            "Payment Date",
            "Loan Ref",
            "Name",
            "Amount",
            "Reference",
            "Payment Method",
            "Initiator"
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
    data() {
      return {
        webAccessToken: null,
        statusOptions: null,
        statementBank: "",
        dataToPass: {
      }, // Define the dataToPass property
      };
    },
  });
  </script>