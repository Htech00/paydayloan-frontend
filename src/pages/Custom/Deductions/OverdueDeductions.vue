<template>
  <div>
    <BreadCrumb pageTitle="Overdue Deductions" />
    <CustomTable :propData="dataToPass" :callBack="moreRecords" :viewDetails="allItemActions"
      button-text="Add Repayment" />
    <div class="modal fade createManualRepayment" id="createManualRepayment" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content p-15 p-md-40">
          <div class="modal-header d-block ps-0 pe-0 pt-0 pb-15 pb-md-25">
            <h5 class="modal-title fw-bold text-black">Add Manual Repayment</h5>
          </div>
          <div class="modal-body ps-0 pe-0 pb-0 pt-15 pt-md-25">
            <form @submit.prevent="createRepayment">
              <div class="row">
                <div class="col-lg-6 col-md-6">
                  <div class="form-group mb-15 mb-md-25">
                    <label class="d-block text-black fw-semibold mb-10">
                      Payment Method
                    </label>
                    <select v-model="createForm.paymentMethodId" class="form-control shadow-none rounded-0 text-black">
                      <option value="">Select</option>
                      <option v-for="method in paymentMethods" :value="method.id" :key="method">{{ method.name }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="col-lg-6 col-md-6">
                  <div class="form-group mb-15 mb-md-25">
                    <label class="d-block text-black fw-semibold mb-10">
                      Reference
                    </label>
                    <input type="text" required v-model="createForm.reference"
                      class="form-control shadow-none rounded-0 text-black" placeholder="Enter Payment Reference" />
                  </div>
                </div>
                <div class="col-lg-6 col-md-6">
                  <div class="form-group mb-15 mb-md-25">
                    <label class="d-block text-black fw-semibold mb-10">
                      Amount
                    </label>
                    <input type="text" required v-model="createForm.amount"
                      class="form-control shadow-none rounded-0 text-black" placeholder="Enter Amount" />
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
      <button class="invisible" id="repaymentModalButton" data-bs-toggle="modal"
        data-bs-target="#createManualRepayment"></button>
    </div>

    <div class="modal fade repaymentScheduleModal" id="repaymentScheduleModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content p-15 p-md-40">
          <div class="modal-header d-block ps-0 pe-0 pt-0 pb-15 pb-md-25">
            <h5 class="modal-title fw-bold text-black">Repayment Schedule</h5>
          </div>
          <div class="modal-body ps-0 pe-0 pb-0 pt-15 pt-md-25">

            <table class="ps-0 mb-0 w-100">
              <thead>
                <tr>
                  <th class="fs-13 fw-medium text-dark-emphasis">DUE DATE</th>
                  <th class="fs-13 fw-medium text-dark-emphasis mx-2">BALANCE</th>
                  <th class="fs-13 fw-medium text-dark-emphasis mx-2">STATUS</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border border-light" v-for="item in selectedLoan?.scheduled_deductions" :key="item.id">
                  <td class="py-3 text-left" style="width: 50% !important;">
                    <span class="d-block fw-bold text-black-emphasis me-15">
                      {{ formatDate(item.due_date) }}.
                    </span>

                  </td>

                  <td class="p-2 text-left w-25">
                    {{ formatNumber(item.balance) }}
                  </td>
                  <td class="p-2 text-left w-25">
                    <div class="badge" :class="{ 'text-outline-success': !item.active, 'text-outline-primary': item.active && !dateHasPassed(item.due_date), 'text-outline-danger': item.active && dateHasPassed(item.due_date) }">
                      {{ item.active && !dateHasPassed(item.due_date) ? 'ACTIVE' : (item.active && dateHasPassed(item.due_date) ?  'OVERDUE' : 'COMPLETED') }}
                    </div>
                  </td>
                </tr>
              </tbody>

            </table>
          </div>
          <button type="button" class="btn-close shadow-none" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

      </div>
      <button class="invisible" id="repaymentScheduleModalButton" data-bs-toggle="modal"
        data-bs-target="#repaymentScheduleModal"></button>
    </div>

        <div class="modal fade mandateHistoryModal" id="mandateHistoryModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content p-15 p-md-40">
          <div class="modal-header d-block ps-0 pe-0 pt-0 pb-15 pb-md-25">
            <h5 class="modal-title fw-bold text-black">Mandate History</h5>
          </div>
          <div class="modal-body ps-0 pe-0 pb-0 pt-15 pt-md-25">

            <table class="ps-0 mb-0 w-100">
              <thead>
                <tr>
                  <th class="fs-13 fw-medium text-dark-emphasis">DUE DATE</th>
                  <th class="fs-13 fw-medium text-dark-emphasis mx-2">MANDATE</th>
                  <th class="fs-13 fw-medium text-dark-emphasis mx-2">STATUS</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border border-light" v-for="item in selectedLoan?.mandate_histories" :key="item.id">
                  <td class="py-3 text-left" style="width: 50% !important;">
                    <span class="d-block fw-bold text-black-emphasis me-15">
                      {{ formatDate(item.due_date) }}.
                    </span>

                  </td>

                  <td class="p-2 text-left w-25">
                    {{ item.remita_mandate_reference }}
                  </td>
                  <td class="p-2 text-left w-25">
                    <div class="badge"
                      :class="{ 'text-outline-success': item.status == 'active', 'text-outline-danger': item.status == 'stop'}">
                      {{ item.status?.toUpperCase() }}
                    </div>
                  </td>
                </tr>
              </tbody>

            </table>
          </div>
          <button type="button" class="btn-close shadow-none" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

      </div>
      <button class="invisible" id="mandateHistoryModalButton" data-bs-toggle="modal"
        data-bs-target="#mandateHistoryModal"></button>
    </div>
  </div>

</template>
  
  <script>
  import { defineComponent } from "vue";
  
  import BreadCrumb from "@/components/Common/BreadCrumb.vue";
  import CustomTable from "@/components/Custom/CustomTable.vue";
  import global from "@/mixins/global";
  import Deduction from "@/apis/Deduction";
  import { useToast } from "vue-toastification";

  const toast = useToast();
  
  export default defineComponent({
    name: "OverdueDeductionsPage",
    components: {
      BreadCrumb,
      CustomTable,
    },
    data() {
      return {
        dataToPass: {
        }, // Define the dataToPass property
        paymentMethods: null,
        selectedLoan: null,
        pendingLoans: [],
        createForm: {
          loanId: null,
          amount: null,
          reference: null,
          paymentMethodId: null,
          processing: false
        }
      };
    },
    computed: {
   
      allItemActions() {
        return [
          {
            'buttonText': 'Add Repayment',
            'method': this.showRepaymentDialog,
            'hasPermission': this.hasAnyPermission(['add-repayment'])
          },
          {
            'buttonText': 'View Schedule',
            'method': this.showRepaymentSchedule,
            'hasPermission': true
          },
          {
            'buttonText': 'View Mandates',
            'method': this.showMandateHistory,
            'hasPermission': true
          },
        ]
      }
    },
    mounted() {
      
      Deduction.getPaymentMethods().then(data => {
        this.paymentMethods = data.data.data;
      });
      this.fetchDeductions();

    },
    mixins: [global],
    methods: {
      fetchDeductions() {
        Deduction.overdueDeductions().then(data => {
          this.pendingLoans = data.data.data.data;
          console.log('pending loans', data.data.data.data)
          this.retrieveRecords(data)
        });
      },
      dateHasPassed(date) {
        let selectedDate = Date.parse(date);
        var now = new Date();
        now.setHours(0, 0, 0, 0);

        if (selectedDate < now) {
          return true;
        } else {
          false;
        }
      },
      showMandateHistory(itemId) {
        let loan = this.pendingLoans.filter(e => e.id == itemId);
        this.selectedLoan = loan[0]
        console.log('loan:', loan);
        document.getElementById("mandateHistoryModalButton").click();
      },
      showRepaymentSchedule(itemId) {
        let loan = this.pendingLoans.filter(e => e.id == itemId);
        this.selectedLoan = loan[0]
        console.log('loan:', loan, itemId, this.pendingLoans);
        document.getElementById("repaymentScheduleModalButton").click();
      },
      showRepaymentDialog(itemId){
        if(this.hasAnyPermission(['add-repayment'])){
          this.createForm.loanId = itemId;
          document.getElementById("repaymentModalButton").click(); 
        }
        
      },
      moreRecords(url, search){

          if(url != null && typeof url != undefined){
            Deduction.overdueDeductions(url, search).then(data => {
              this.pendingLoans = data.data.data.data;
              this.retrieveRecords(data)
            });
          }

          if(search != null && typeof search != undefined){
            Deduction.overdueDeductions(url, search).then(data => {
              this.pendingLoans = data.data.data.data;

              this.retrieveRecords(data)
            });
          }
      },
      retrieveRecords (response) {

        const responseData = response.data; 
        const mappedData = responseData.data.data.map((item) => [
          item.user?.name,
          item.user?.phone_number,
          this.formatNumber(item.balance),
          item.reference,
          item.mandate_reference,
          this.formatDate(item.created_at),
          item.days_overdue,
          item.id
        ]);
        
        let linksData = responseData.data;
        // links.pop()
        // links.shift()
        this.dataToPass = {
          headers: [
            "Name",
            "Phone",
            "Total Balance",
            "Loan ID",
            "Mandate Reference",
            "Loan Date",
            "Days Overdue",
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
      createRepayment(){
        this.createForm.processing = true;
        Deduction.manualRepayment(this.createForm).then((response) => {
          this.createForm.processing = false;
          toast.success('Repayment Added successfully');
          this.closeModal('createManualRepayment');
          this.fetchDeductions();
        })
        .catch(error => {
            this.createForm.processing = false;

            if (error.response.status === 422) {
              toast.error(error.response.data.message);
            // this.errors = error.response.data.errors;
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
    },
    
  });
  </script>