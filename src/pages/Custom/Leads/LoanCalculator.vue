<template>
  <BreadCrumb pageTitle="Loan Calculator" />

  <div class="card mb-25 border-0 rounded-0 bg-white create-new-project-box">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
      <form @submit.prevent="submit">
        <div class="row">
          <div class="col-md-12">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Select Loan Type
              </label>
              <select v-model="form.loan_type" class="form-control shadow-none rounded-0 text-black" required>
                <option value="">Select</option>
                <option v-for="loanType in loanTypes" :value="loanType.id" :key="loanType">{{ loanType.name }}</option>
              </select>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Select Banks
              </label>
              <select v-model="form.bank_code" class="form-control shadow-none rounded-0 text-black" required>
                <option value="">Select</option>
                <option v-for="bank in banks" :value="bank.code" :key="bank">{{ bank.name }}</option>
              </select>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Salary Account Number
              </label>
              <input type="text" required v-model="form.account_number"
                class="form-control shadow-none rounded-0 text-black" placeholder="Enter Account Number" />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                First Name
              </label>
              <input type="text" required v-model="form.first_name"
                class="form-control shadow-none rounded-0 text-black" placeholder="Enter First Name" />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Last Name
              </label>
              <input type="text" required v-model="form.last_name" class="form-control shadow-none rounded-0 text-black"
                placeholder="Enter Last Name" />
            </div>
          </div>
          <div class="col-md-12">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Select Loan Tenor
              </label>
              <select v-model="form.loan_tenor" class="form-control shadow-none rounded-0 text-black" required>
                <option value="">Select</option>
                <option v-for="tenor in 12" :key="'tenor-'+tenor">{{ tenor }}</option>
              </select>
            </div>
          </div>
          <div class="col-md-12">
            <button
              class="default-btn transition border-0 fw-medium text-white pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-35 pe-md-35 rounded-1 fs-md-15 fs-lg-16 bg-success"
              type="submit" :disabled="form.processing">
              {{form.processing ? "Processing..." : "Submit"}}
            </button>
          </div>
          <div v-if="processed" class="card mb-25 border-0 rounded-0 bg-white letter-spacing lead-info-box">
            <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30">
              <ul v-if="offerDetails && offerDetails?.loan_amount > 0" class="info mt-25 ps-0 mb-0 list-unstyled row">
                <li class="position-relative col-md-6">
                  <div class="icon text-info rounded-circle text-center">
                    <i class="flaticon-folder"></i>
                  </div>
                  <span class="d-block text-black mb-5 fw-semibold">Loan Amount</span>
                  <span class="d-inline-block fs-md-15 fs-lg-16 text-muted">
                    ₦ {{ formatNumber(offerDetails?.loan_amount) }}
                  </span>
                </li>
                <li class="position-relative col-md-6" v-if="offerDetails?.loan_type == 'top up'">
                  <div class="icon text-info rounded-circle text-center">
                    <i class="flaticon-folder"></i>
                  </div>
                  <span class="d-block text-black mb-5 fw-semibold">Available to Customer</span>
                  <span class="d-inline-block fs-md-15 fs-lg-16 text-muted">
                    ₦ {{ formatNumber(offerDetails?.available_amount) }}
                  </span>
                </li>
                <li class="position-relative col-md-6" v-if="offerDetails?.loan_type == 'top up'">
                  <div class="icon text-info rounded-circle text-center">
                    <i class="flaticon-folder"></i>
                  </div>
                  <span class="d-block text-black mb-5 fw-semibold">Loan Type</span>
                  <span class="d-inline-block fs-md-15 fs-lg-16 text-muted">
                    TOP-UP
                  </span>
                </li>
                <li class="position-relative col-md-6">
                  <div class="icon text-success rounded-circle text-center">
                    <i class="flaticon-clock"></i>
                  </div>
                  <span class="d-block text-black mb-5 fw-semibold">Tenor</span>
                  <span class="d-inline-block fs-md-15 fs-lg-16 text-muted">

                    {{ offerDetails?.tenor }}
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
                    ₦ {{ formatNumber(offerDetails?.monthly_repayment) }}
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
                    ₦ {{ formatNumber(offerDetails?.total_repayment) }}
                  </span>
                </li>
              </ul>
              <div class="text-lg mt-3 fs-lg-16 fs-md-15 text-danger" v-else>{{ form.error ? form.error : 'No offer for this customer' }}
              </div>
            </div>
            <div v-if="affordabilityData && Object.keys(affordabilityData).length">
              <div class="row">
                <div class="col-lg-6 col-xxxl-3">
                  <div class="card mb-25 border-0 rounded-0 bg-white order-details-box letter-spacing">
                    <div class="card-head">
                      <h5 class="mb-0 fw-bold text-white">RSP Details</h5>
                    </div>
                    <div class="card-body">
                      <ul class="list ps-0 mb-0 list-unstyled">
                        <li class="d-flex align-items-center justify-content-between">
                          <div class="title text-black fs-md-15 fs-lg-16 fw-semibold position-relative">
                            Remita Name:
                          </div>
                          <span class="d-block fs-md-15 fs-lg-16">{{ affordabilityData.remitaSearchData?.customerName
                            }}</span>
                        </li>
                        <li class="d-flex align-items-center justify-content-between">
                          <div class="title text-black fs-md-15 fs-lg-16 fw-semibold position-relative">
                            Remita MDA:
                          </div>
                          <span class="d-block fs-md-15 fs-lg-16">{{ affordabilityData.remitaSearchData?.companyName
                            }}</span>
                        </li>
                        <li class="d-flex align-items-center justify-content-between">
                          <div class="title text-black fs-md-15 fs-lg-16 fw-semibold position-relative">
                            Salary Bank Name:
                          </div>
                          <span class="d-block fs-md-15 fs-lg-16">{{ loan?.bank_name }}</span>
                        </li>
                        <li class="d-flex align-items-center justify-content-between">
                          <div class="title text-black fs-md-15 fs-lg-16 fw-semibold position-relative">
                            Salary Account Number:
                          </div>
                          <span class="d-block fs-md-15 fs-lg-16">{{ affordabilityData.remitaSearchData?.accountNumber
                            }}</span>
                        </li>
                        <li class="d-flex align-items-center justify-content-between">
                          <div class="title text-black fs-md-15 fs-lg-16 fw-semibold position-relative">
                            BVN:
                          </div>
                          <span class="d-block fs-md-15 fs-lg-16">{{ affordabilityData.remitaSearchData?.bvn }}</span>
                        </li>
                        <li class="d-flex align-items-center justify-content-between">
                          <div class="title text-black fs-md-15 fs-lg-16 fw-semibold position-relative">
                            Verified Remita Name:
                          </div>
                          <span class="d-block fs-md-15 fs-lg-16">{{ affordabilityData.remitaSearchData?.customerName
                            }}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="col-lg-6 col-xxxl-3">
                  <div class="card mb-25 border-0 rounded-0 order-details-box letter-spacing text-white"
                    :class="{ 'bg-success': affordabilityData.affordabilityCheckData?.customerQualificationStatus, 'bg-danger': !affordabilityData.affordabilityCheckData?.customerQualificationStatus }">
                    <div class="card-head">
                      <h5 class="mb-0 fw-bold text-white">Request Details</h5>
                    </div>
                    <div class="card-body">
                      <ul class="list ps-0 mb-0 list-unstyled">
                        <li class="d-flex align-items-center justify-content-between">
                          <div class="title text-white fs-md-15 fs-lg-16 fw-semibold position-relative">
                            Amount:
                          </div>
                          <span class="d-block fs-md-15 fs-lg-16">{{
                            formatNumber(affordabilityData?.affordabilityCheckData?.amount) }}</span>
                        </li>
                        <li class="d-flex align-items-center justify-content-between">
                          <div class="title text-white fs-md-15 fs-lg-16 fw-semibold position-relative">
                            Amount:
                          </div>
                          <span class="d-block fs-md-15 fs-lg-16">{{
                            formatNumber(affordabilityData?.affordabilityCheckData?.amount) }}</span>
                        </li>
                        <li class="d-flex align-items-center justify-content-between">
                          <div class="title text-white fs-md-15 fs-lg-16 fw-semibold position-relative">
                            Tenor:
                          </div>
                          <span class="d-block fs-md-15 fs-lg-16">{{ affordabilityData.affordabilityCheckData?.tenor }}
                            Months</span>
                        </li>
                        <li class="d-flex align-items-center justify-content-between">
                          <div class="title text-white fs-md-15 fs-lg-16 fw-semibold position-relative">
                            New Loans Repayment:
                          </div>
                          <span class="d-block fs-md-15 fs-lg-16">{{
                            formatNumber(affordabilityData.affordabilityCheckData?.monthlyRepayment) }}</span>
                        </li>
                        <li class="d-flex align-items-center justify-content-between">
                          <div class="title text-white fs-md-15 fs-lg-16 fw-semibold position-relative">
                            Average Net Pay:
                          </div>
                          <span class="d-block fs-md-15 fs-lg-16">{{
                            formatNumber(affordabilityData.affordabilityCheckData?.netPay) }}</span>
                        </li>
                        <li class="d-flex align-items-center justify-content-between">
                          <div class="title text-white fs-md-15 fs-lg-16 fw-semibold position-relative">
                            Adjusted Net Pay:
                          </div>
                          <span class="d-block fs-md-15 fs-lg-16">{{
                            formatNumber(offerDetails['validityData']['adjustedNetPay']) }}</span>
                        </li>
                        
                        <li class="d-flex align-items-center justify-content-between">
                          <div class="title text-white fs-md-15 fs-lg-16 fw-semibold position-relative">
                            Other Deductions:
                          </div>
                          <span class="d-block fs-md-15 fs-lg-16">{{
                            affordabilityData.affordabilityCheckData?.otherDeductions
                            }}</span>
                        </li>
                        <!-- <li class="d-flex align-items-center justify-content-between">
                          <div
                            class="title text-white fs-md-15 fs-lg-16 fw-semibold position-relative"
                          >
                            Net Pay:
                          </div>
                          <span class="d-block fs-md-15 fs-lg-16">{{ formatNumber(affordabilityData.affordabilityCheckData?.netPay) }}</span>
                        </li> -->
                        <li class="d-flex align-items-center justify-content-between">
                          <div class="title text-white fs-md-15 fs-lg-16 fw-semibold position-relative">
                            Remita Loan:
                          </div>
                          <span class="d-block fs-md-15 fs-lg-16">{{
                            affordabilityData.affordabilityCheckData?.remitaLoan
                            }}</span>
                        </li>
                        
                        <!-- <li class="d-flex align-items-center justify-content-between">
                          <div class="title text-white fs-md-15 fs-lg-16 fw-semibold position-relative">
                            Average Net Pay:
                          </div>
                          <span class="d-block fs-md-15 fs-lg-16">{{
                            formatNumber(affordabilityData.affordabilityCheckData?.netPay) }}</span>
                        </li> -->
                      
                        <li class="d-flex align-items-center justify-content-between">
                          <div class="title text-white fs-md-15 fs-lg-16 fw-semibold position-relative">
                            Salary Count:
                          </div>
                          <span class="d-block fs-md-15 fs-lg-16">{{ offerDetails['validityData']['salaryHistoryCount'] }}</span>
                        </li>
                        <li class="d-flex align-items-center justify-content-between">
                          <div class="title text-white fs-md-15 fs-lg-16 fw-semibold position-relative">
                            New Loans Count:
                          </div>
                          <span class="d-block fs-md-15 fs-lg-16">{{ offerDetails['validityData']['newLoansCount'] }}</span>
                        </li>
                        <li class="d-flex align-items-center justify-content-between">
                          <div class="title text-white fs-md-15 fs-lg-16 fw-semibold position-relative">
                            Last Salary Date:
                          </div>
                          <span class="d-block fs-md-15 fs-lg-16">{{ formatDate(offerDetails['validityData']['lastSalaryDate']) }}</span>
                        </li>
                        <li class="d-flex align-items-center justify-content-between">
                          <div class="title text-white fs-md-15 fs-lg-16 fw-semibold position-relative">
                            First Salary Date:
                          </div>
                          <span class="d-block fs-md-15 fs-lg-16">{{ formatDate(offerDetails['validityData']['firstSalaryDate']) }}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="col-lg-8">
                  <div class="card mb-25 border-0 rounded-0 bg-white order-details-box letter-spacing">
                    <div class="card-head bg-white d-flex align-items-center">
                      <i class="flaticon-sterile-box text-primary"></i>
                      <h5 class="mb-0 fw-bold text-black ms-10 ms-md-15">
                        RSP Loan Details
                      </h5>
                    </div>
                    <div class="card-body">
                      <div class="table-responsive">
                        <table class="table text-nowrap align-middle mb-0">
                          <thead>
                            <tr>
                              <th scope="col"
                                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 ps-0">
                                Provider
                              </th>
                              <th scope="col"
                                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 ps-0">
                                Status
                              </th>
                              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13">
                                Outstanding Amount
                              </th>
                              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13">
                                Date
                              </th>
                              <th scope="col"
                                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pe-0">
                                Repayment Amount
                              </th>
                              <th scope="col"
                                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pe-0">
                                Loan Amount
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="details in affordabilityData?.remitaLoanData" :key="details">
                              <td class="shadow-none lh-1 fw-medium text-paragraph">
                                {{ details.loanProvider }}
                              </td>
                              <td class="shadow-none lh-1 fw-medium text-paragraph">
                                {{ details.status }}
                              </td>
                              <td class="shadow-none lh-1 fw-medium text-paragraph">
                                {{ formatNumber(details.outstandingAmount) }}
                              </td>
                              <td class="shadow-none lh-1 fw-medium text-paragraph">
                                {{ details.loanDisbursementDate.split(' ')[0] }}
                              </td>
                              <td class="shadow-none lh-1 fw-medium text-paragraph">
                                {{ formatNumber(details.repaymentAmount) }}
                              </td>
                              <td class="shadow-none lh-1 fw-medium text-paragraph pe-0">
                                {{ formatNumber(details.loanAmount) }}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="card mb-25 border-0 rounded-0 bg-white order-details-box letter-spacing">
                    <div class="card-head bg-white d-flex align-items-center">
                      <i class="flaticon-document text-info"></i>
                      <h5 class="mb-0 fw-bold text-black ms-10 ms-md-15">RSP Salary Details</h5>
                    </div>
                    <div class="card-body">
                      <ul class="order-summary-list ps-0 mb-0 list-unstyled">
                        <li class="d-flex align-items-center justify-content-between">
                          <span class="d-block text-muted text-uppercase fw-medium fs-13">
                            AMOUNT
                          </span>
                          <span class="d-block text-muted text-uppercase fw-medium fs-13">
                            PAYMENT DATE
                          </span>
                        </li>
                        <li class="d-flex align-items-center justify-content-between"
                          v-for="payment in affordabilityData?.remitaSearchData?.salaryPaymentDetails" :key="payment">
                          <span class="d-block text-black fs-md-15 fs-lg-16 fw-medium">
                            {{ formatNumber(payment?.amount) }}
                          </span>
                          <span class="d-block text-paragraph fw-medium">
                            {{ payment?.paymentDate }}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
    name: "LoanCalculatorPage",
    data(){
        return {
            loanTypes: [],
            banks: [],
            processed: false,
            offerDetails: null,
            affordabilityData: {},
            form: {
                first_name: null,
                last_name: null,
                loan_type: null,
                bank_code: null,
                account_number: null,
                loan_tenor: null,
                processing: false,
                error: null
            }
        }
    },
    mixins: [global],
    components: {BreadCrumb},

    mounted() {
        Loan.loanTypes().then(data => {
          this.loanTypes = data.data.data;
        });

        Loan.banks().then(data => {
          this.banks = data.data.data;
        });
    },
    methods: {
        submit(){
          this.form.processing = true;

            Loan.calculateOffer(this.form).then((response) => {
            this.form.processing = false;
            this.processed = true;
            this.offerDetails = response.data.data;
              console.log('offer details:', this.offerDetails);
              if (this.offerDetails) {
                if (this.offerDetails['validityData']['rejectionReason']) {
                  this.form.error = this.offerDetails['validityData']['rejectionReason'];
                } else {
                  this.form.error = null;
                }

                if (this.offerDetails['affordabilityData']) {
                  this.affordabilityData = this.offerDetails['affordabilityData'];
                }
              
            }
          })
          .catch(error => {
            this.processed = true;
            this.form.processing = false;
              if (error.response?.status === 422 || error.response?.status === 400) {
                // toast.error(error.response.data.message);
                this.offerDetails = null;
                this.form.error = error.response.data.message;
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
    }
  });
  </script>