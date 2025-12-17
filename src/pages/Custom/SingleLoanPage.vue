<template>
  <BreadCrumb pageTitle="Loan" />
  <div>

    <div class="row">
      <div class="col-12 my-3" style="text-align: right;">
        <button class="btn btn-md border border-danger text-danger mx-2 mb-3" data-bs-toggle="modal"
          data-bs-target="#rejectLoanModal"
          v-if="(loan?.status == 'pending_approval' || loan?.status == 'pending_customer_confirmation' || loan?.can_force_reject) && (hasAnyPermission(['approve-loan']) || hasAnyPermission(['reject-loan']))">Reject
          Loan</button>
        <button class="btn btn-md border border-success text-success mx-2 mb-3" data-bs-toggle="modal"
          data-bs-target="#approveModal"
          v-if="loan?.status == 'pending_approval'  && hasAnyPermission(['approve-loan'])">Approve Loan</button>
        <button class="btn btn-md border border-success text-success mx-2 mb-3" data-bs-toggle="modal"
          data-bs-target="#deductionSetupModal"
          v-if="loan?.status == 'pending_deduction_setup'  && hasAnyPermission(['setup-deduction'])">Setup
          Deduction</button>
        <button class="btn btn-md border border-success text-success mx-2 mb-3" data-bs-toggle="modal"
          data-bs-target="#manualDisbursementModal"
          v-if="loan?.status == 'pending_disbursement' && hasAnyPermission(['disburse-loan'])">Disburse Loan</button>
        <button class="btn btn-md border border-secondary text-secondary mx-2 mb-3" data-bs-toggle="modal"
          data-bs-target="#uploadAudioModal"
          v-if="(loan?.status == 'pending_customer_confirmation') && hasAnyPermission(['edit-loan']) || (loan?.status == 'pending_approval') && hasAnyPermission(['edit-loan-file'])">Upload
          Video/Audio</button>
        <button class="btn btn-md border border-success text-success mx-2 mb-3" @click="sendDevicePickupOTP"
          v-if="(loan?.status == 'pending_pickup') && hasAnyPermission(['process-device-pickup'])">
          Confirm Device Pickup</button>
      </div>
    </div>
    <div class="row">

      <div class="col-lg-12 col-xl-12 col-xxl-6">
        <div class="card mb-25 border-0 rounded-0 bg-white order-details-box letter-spacing">
          <div class="card-head bg-white d-flex align-items-center">
            <i class="flaticon-sterile-box text-primary"></i>
            <h5 class="mb-0 fw-bold text-black ms-10 ms-md-15">
              Loan Details (Ref {{ loan?.reference }})
            </h5>
          </div>
          <div class="card-body">
            <ul class="list ps-0 mb-0 list-unstyled">
              <li class="d-flex align-items-center justify-content-between">
                <div class="title text-black fs-md-15 fs-lg-16 fw-semibold position-relative">
                  <i class="flaticon-calendar"></i>
                  Data Created:
                </div>
                <span class="d-block text-paragraph fs-md-15 fs-lg-16">
                  {{ formatDateTime(loan?.created_at) }}
                </span>
              </li>
              <li v-if="loan.product" class="d-flex align-items-center justify-content-between">
                <div class="title text-black fs-md-15 fs-lg-16 fw-semibold position-relative">
                  <i class="flaticon-atm"></i>
                  Device Details:
                </div>
                <span class="d-block text-paragraph fs-md-15 fs-lg-16">
                 {{loan?.product?.name ?? '' }}
                </span>
              </li>
              <li v-if="loan.pick_up_location" class="d-flex align-items-center justify-content-between">
                <div class="title text-black fs-md-15 fs-lg-16 fw-semibold position-relative">
                  <i class="flaticon-atm"></i>
                  Device Pickup Location:
                </div>
                <span class="d-block text-paragraph fs-md-15 fs-lg-16">
                 {{loan?.pick_up_location ?? '' }}, {{loan?.state?.name ?? '' }} State
                </span>
              </li>
              <li class="d-flex align-items-center justify-content-between">
                <div class="title text-black fs-md-15 fs-lg-16 fw-semibold position-relative">
                  <i class="flaticon-atm"></i>
                  Marketer:
                </div>
                <span class="d-block text-paragraph fs-md-15 fs-lg-16">
                  {{loan?.referrer?.first_name ?? 'System' }} {{loan?.referrer?.last_name ?? 'User' }}
                </span>
              </li>
              <li class="d-flex align-items-center justify-content-between">
                <div class="title text-black fs-md-15 fs-lg-16 fw-semibold position-relative">
                  <i class="flaticon-express-delivery"></i>
                  Referral Code:
                </div>
                <span class="d-block text-paragraph fs-md-15 fs-lg-16">
                  {{ loan?.referral_code ?? 'N/A' }}
                </span>
              </li>
              <li class="d-flex align-items-center justify-content-between">
                <div class="title text-black fs-md-15 fs-lg-16 fw-semibold position-relative">
                  <i class="flaticon-express-delivery"></i>
                  Status:
                </div>
                <span class="d-block text-paragraph fs-md-15 fs-lg-16">
                  {{ loan?.status?.toUpperCase() }}
                </span>
              </li>
              <li class="d-flex align-items-center justify-content-between">
                <div class="title text-black fs-md-15 fs-lg-16 fw-semibold position-relative">
                  <i class="flaticon-express-delivery"></i>
                  Digisign Email:
                </div>
                <span class="d-block text-paragraph fs-md-15 fs-lg-16">
                  {{ loan?.document_link ? 'Yes' : 'No' }}
                </span>
              </li>
              <li class="d-flex align-items-center justify-content-between">
                <div class="title text-black fs-md-15 fs-lg-16 fw-semibold position-relative">
                  <i class="flaticon-express-delivery"></i>
                  Digisign Link:
                </div>
                <span class="d-block fs-md-15 fs-lg-16">
                  <div style="width: 300px;" class="d-flex align-items-baseline">
                    <div class="text-truncate flex-grow-1">
                      {{ loan?.document_link }}...</div>
                    <div class="flex-shrink-0">
                      <i style="cursor: pointer;"  @click="copyText(loan?.document_link)"
                        class="flaticon-copy p-2 cursor"></i>
                    </div>
                  </div>

                </span>
              </li>
              <li class="d-flex align-items-center justify-content-between">
                <div class="title text-black fs-md-15 fs-lg-16 fw-semibold position-relative">
                  <i class="flaticon-express-delivery"></i>
                  Digisign Verification:
                </div>
                <span class="d-block text-paragraph fs-md-15 fs-lg-16">
                  {{ loan?.document_id ? 'Yes' : 'No' }}
                </span>
              </li>
              <li v-if="loan.rejection_reason" class="d-flex align-items-center justify-content-between">
                <div class="title text-black fs-md-15 fs-lg-16 fw-semibold position-relative">
                  <i class="flaticon-warning"></i>
                  Rejection Reason:
                </div>
                <span class="d-block text-paragraph fs-md-15 fs-lg-16">
                  {{ loan.rejection_reason }}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-xl-12 col-xxl-6">
        <div class="card mb-25 border-0 rounded-0 bg-white order-details-box letter-spacing">
          <div class="card-head bg-white d-flex align-items-center">
            <i class="flaticon-user-3 text-success"></i>
            <h5 class="mb-0 fw-bold text-black ms-10 ms-md-15">
              Customer Details
            </h5>
          </div>
          <div class="card-body">
            <ul class="list ps-0 mb-0 list-unstyled">
              <li class="d-flex align-items-center justify-content-between">
                <div class="title text-black fs-md-15 fs-lg-16 fw-semibold position-relative">
                  <i class="flaticon-user-1"></i>
                  Title:
                </div>
                <span class="d-block text-paragraph fs-md-15 fs-lg-16">
                  {{ loan?.user?.title }}
                </span>
              </li>
              <li class="d-flex align-items-center justify-content-between">
                <div class="title text-black fs-md-15 fs-lg-16 fw-semibold position-relative">
                  <i class="flaticon-envelope"></i>
                  First Name:
                </div>
                <span class="d-block text-paragraph fs-md-15 fs-lg-16">
                  {{ loan?.user?.first_name }}
                </span>
              </li>
              <li class="d-flex align-items-center justify-content-between">
                <div class="title text-black fs-md-15 fs-lg-16 fw-semibold position-relative">
                  <i class="flaticon-envelope"></i>
                  Last Name:
                </div>
                <span class="d-block text-paragraph fs-md-15 fs-lg-16">
                  {{ loan?.user?.last_name }}
                </span>
              </li>
              <li class="d-flex align-items-center justify-content-between">
                <div class="title text-black fs-md-15 fs-lg-16 fw-semibold position-relative">
                  <i class="flaticon-phone-call"></i>
                  Gender:
                </div>
                <span class="d-block text-paragraph fs-md-15 fs-lg-16">
                  {{ loan?.user?.gender }}
                </span>
              </li>
              <li class="d-flex align-items-center justify-content-between">
                <div class="title text-black fs-md-15 fs-lg-16 fw-semibold position-relative">
                  <i class="flaticon-phone-call"></i>
                  Date of Bith:
                </div>
                <span class="d-block text-paragraph fs-md-15 fs-lg-16">
                  {{ formatDate(loan?.user?.date_of_birth) }}
                </span>
              </li>
              <li v-if="loan?.authorization_file_link">
                <div class="title text-black fs-md-15 fs-lg-16 fw-semibold position-relative">
                  <i class="flaticon-phone-call"></i>
                  Authorization Audio:
                </div>
                <span class="d-block text-paragraph fs-md-15 fs-lg-16">
                  <audio class="my-3" controls="true" autobuffer="autobuffer" :src="loan?.authorization_file_link"
                    controlsList="nodownload"></audio>>
                </span>
              </li>

              <li v-if="loan?.valid_id_file_link" class="d-flex align-items-center justify-content-between">
                <div class="title text-black fs-md-15 fs-lg-16 fw-semibold position-relative">
                  <i class="flaticon-document"></i>
                  Valid ID:
                </div>
                <div class="d-inline-block ">

                </div>
                <div>
                  <a class="d-inline-block  fs-md-15 fs-lg-16 text-danger text-decoration-none mx-3" href="#"
                    @click.prevent="showUpdateFileModal(fileName(loan?.valid_id_file))"
                    v-if="hasAnyPermission(['edit-loan-file'])">
                    Edit File
                  </a>
                  <a class="d-inline-block fs-md-15 fs-lg-16 text-primary text-decoration-none" href="#"
                    @click.prevent="showDocumentModal(loan?.valid_id_file_link)">
                    View File
                  </a>
                </div>

              </li>

              <li v-if="loan?.staff_id_file_link" class="d-flex align-items-center justify-content-between">
                <div class="title text-black fs-md-15 fs-lg-16 fw-semibold position-relative">
                  <i class="flaticon-document"></i>
                  Staff ID:
                </div>
                <div>
                  <a class="d-inline-block  fs-md-15 fs-lg-16 text-danger text-decoration-none mx-3" href="#"
                    @click.prevent="showUpdateFileModal(fileName(loan?.staff_id_file))"
                    v-if="hasAnyPermission(['edit-loan-file'])">
                    Edit File
                  </a>
                  <a class="d-inline-block fs-md-15 fs-lg-16 text-primary text-decoration-none" href="#"
                    @click.prevent="showDocumentModal(loan?.staff_id_file_link)">
                    View File
                  </a>
                </div>

              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-xl-12 col-xxl-6">
        <div class="card mb-25 border-0 rounded-0 bg-white order-details-box letter-spacing">
          <div class="card-head bg-white d-flex align-items-center">
            <i class="flaticon-document text-info"></i>
            <h5 class="mb-0 fw-bold text-black ms-10 ms-md-15">Work Information</h5>
          </div>
          <div class="card-body">
            <ul class="list ps-0 mb-0 list-unstyled">
              <li class="d-flex align-items-center justify-content-between">
                <div class="title text-black fs-md-15 fs-lg-16 fw-semibold position-relative">
                  <i class="flaticon-copy"></i>
                  Organization Name:
                </div>
                <span class="d-block fs-md-15 fs-lg-16">
                  {{ loan?.organization_name }}
                </span>
              </li>
              <li class="d-flex align-items-center justify-content-between">
                <div class="title text-black fs-md-15 fs-lg-16 fw-semibold position-relative">
                  <i class="flaticon-express-delivery"></i>
                  IPPIS No:
                </div>
                <span class="d-block text-primary fs-md-15 fs-lg-16">
                  {{ loan?.user?.ippis_number }}
                </span>
              </li>
              <li class="d-flex align-items-center justify-content-between">
                <div class="title text-black fs-md-15 fs-lg-16 fw-semibold position-relative">
                  <i class="flaticon-shield"></i>
                  Salary Bank Name:
                </div>
                <span class="d-block text-paragraph fs-md-15 fs-lg-16">{{ loan?.salary_bank }}</span>
              </li>
              <li class="d-flex align-items-center justify-content-between">
                <div class="title text-black fs-md-15 fs-lg-16 fw-semibold position-relative">
                  <i class="flaticon-shield"></i>
                  Salary Bank Account:
                </div>
                <span class="d-block text-paragraph fs-md-15 fs-lg-16">{{ loan?.salary_account_number }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-xl-12 col-xxl-6">
        <div class="card mb-25 border-0 rounded-0 bg-white order-details-box letter-spacing">
          <div class="card-head bg-white d-flex align-items-center">
            <i class="flaticon-phone text-info"></i>
            <h5 class="mb-0 fw-bold text-black ms-10 ms-md-15">Contact Information</h5>
          </div>
          <div class="card-body">
            <ul class="list ps-0 mb-0 list-unstyled">
              <li class="d-flex align-items-center justify-content-between">
                <div class="title text-black fs-md-15 fs-lg-16 fw-semibold position-relative">
                  <i class="flaticon-copy"></i>
                  Email:
                </div>
                <span class="d-block text-primary fs-md-15 fs-lg-16">
                  {{ loan?.user?.email }}
                </span>
              </li>
              <li class="d-flex align-items-center justify-content-between">
                <div class="title text-black fs-md-15 fs-lg-16 fw-semibold position-relative">
                  <i class="flaticon-express-delivery"></i>
                  House Address:
                </div>
                <span class="d-block fs-md-15 fs-lg-16">
                  {{ loan?.address }}
                </span>
              </li>
              <li class="d-flex align-items-center justify-content-between">
                <div class="title text-black fs-md-15 fs-lg-16 fw-semibold position-relative">
                  <i class="flaticon-express-delivery"></i>
                  City:
                </div>
                <span class="d-block fs-md-15 fs-lg-16">{{ loan?.city }}</span>
              </li>
              <li class="d-flex align-items-center justify-content-between">
                <div class="title text-black fs-md-15 fs-lg-16 fw-semibold position-relative">
                  <i class="flaticon-express-delivery"></i>
                  State:
                </div>
                <span class="d-block fs-md-15 fs-lg-16">{{ loan?.state?.name }}</span>
              </li>
              <li class="d-flex align-items-center justify-content-between">
                <div class="title text-black fs-md-15 fs-lg-16 fw-semibold position-relative">
                  <i class="flaticon-express-delivery"></i>
                  Personal Phone:
                </div>
                <span class="d-block fs-md-15 fs-lg-16">{{ loan?.user?.phone_number }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="mt-5 mb-40">
        <button @click="affordabilityCheck"
          class="btn btn-border text-primary border border-primary border-2 btn-md btn-b w-48">{{checkingAffordability ?
          'Please Wait...' : "Verification Affordability"}}</button>
      </div>

      <div v-if="Object.keys(affordabilityData).length">
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
                    <span class="d-block fs-md-15 fs-lg-16">{{ affordabilityData.remitaSearchData?.companyName }}</span>
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
              :class="{'bg-success': affordabilityData.affordabilityCheckData?.customerQualificationStatus, 'bg-danger': !affordabilityData.affordabilityCheckData?.customerQualificationStatus}">
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
                      Tenor:
                    </div>
                    <span class="d-block fs-md-15 fs-lg-16">{{ affordabilityData.affordabilityCheckData?.tenor }}
                      Months</span>
                  </li>
                  <li class="d-flex align-items-center justify-content-between">
                    <div class="title text-white fs-md-15 fs-lg-16 fw-semibold position-relative">
                      Monthly Repayment:
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
                      Other Deductions:
                    </div>
                    <span class="d-block fs-md-15 fs-lg-16">{{ affordabilityData.affordabilityCheckData?.otherDeductions
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
                    <span class="d-block fs-md-15 fs-lg-16">{{ affordabilityData.affordabilityCheckData?.remitaLoan
                      }}</span>
                  </li>
                  <li class="d-flex align-items-center justify-content-between">
                    <div class="title text-white fs-md-15 fs-lg-16 fw-semibold position-relative">
                      Disposable Income:
                    </div>
                    <span class="d-block fs-md-15 fs-lg-16">{{
                      formatNumber(affordabilityData.affordabilityCheckData?.disposableIncome) }}</span>
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
                        <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 ps-0">
                          Provider
                        </th>
                        <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 ps-0">
                          Status
                        </th>
                        <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13">
                          Outstanding Amount
                        </th>
                        <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13">
                          Date
                        </th>
                        <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pe-0">
                          Repayment Amount
                        </th>
                        <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pe-0">
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
    
    <!-- Reject Modal -->
    <div class="modal fade modal-lg" id="rejectLoanModal" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5">Reject Loan</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p class="fs-md-16 fs-lg-18">Are you sure you want to reject this loan?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              Nevermind
            </button>
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="reject">
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Confirm Deduction Setup Modal -->
    <div class="modal fade modal-lg confirmDeductionSetupModal" id="confirmDeductionSetupModal" data-bs-keyboard="false"
      tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5">Confirm Loan Deduction Setup</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p class="fs-md-16 fs-lg-18">Are you sure you want to setup loan deduction for this loan?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              Nevermind
            </button>
            <button type="button" class="btn btn-success" data-bs-dismiss="modal" @click="setupDeduction">
              Setup
            </button>
            <button class="invisible" id="confirmDeductionSetupModalButton" data-bs-toggle="modal"
              data-bs-target="#confirmDeductionSetupModal"></button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade manualDisbursementModal" id="manualDisbursementModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content p-15 p-md-40">
          <div class="modal-header d-block ps-0 pe-0 pt-0 pb-15 pb-md-25">
            <h5 class="modal-title fw-bold text-black">Manual Dibursement</h5>
          </div>
          <div class="modal-body ps-0 pe-0 pb-0 pt-15 pt-md-25">
            <form @submit.prevent="disburse">
              <div class="row">
                <div class="col-lg-12 col-md-12">
                  <div class="form-group mb-15 mb-md-25">
                    <label class="d-block text-black fw-semibold mb-10">
                      Payment Reference
                    </label>
                    <input type="text" required v-model="disburseForm.reference"
                      class="form-control shadow-none rounded-0 text-black" placeholder="Enter Payment Reference" />
                  </div>
                </div>
                <div class="col-lg-12 col-md-12">
                  <div class="form-group mb-15 mb-md-25">
                    <label class="d-block text-black fw-semibold mb-10">
                      Remark
                    </label>
                    <input type="text" v-model="disburseForm.remark"
                      class="form-control shadow-none rounded-0 text-black" placeholder="Enter Remark" />
                  </div>
                </div>
              </div>
              <button
                class="default-btn transition border-0 fw-medium text-white pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-35 pe-md-35 rounded-1 fs-md-15 fs-lg-16"
                type="submit" :disabled="disburseForm.processing">
                {{ disburseForm.processing ? "Please Wait..." : "Submit"}}
              </button>
            </form>
          </div>
          <button type="button" class="btn-close shadow-none" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

      </div>
      <button class="invisible" id="repaymentModalButton" data-bs-toggle="modal"
        data-bs-target="#createManualRepayment"></button>
    </div>

    <div class="modal fade confirmDevicePickupModal" id="confirmDevicePickupModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content p-15 p-md-40">
          <div class="modal-header d-block ps-0 pe-0 pt-0 pb-15 pb-md-25">
            <h5 class="modal-title fw-bold text-black">Device Pickup Verification</h5>
          </div>
          <div class="modal-body ps-0 pe-0 pb-0 pt-15 pt-md-25">
            <form @submit.prevent="confirmPickup">
              <div class="row">
                <div class="col-lg-12 col-md-12">
                  <div class="form-group mb-15 mb-md-25">
                    <label class="d-block text-black fw-semibold mb-10">
                      Enter OTP sent to Customer
                    </label>
                    <input type="text" required v-model="devicePickupForm.otp"
                      class="form-control shadow-none rounded-0 text-black" placeholder="Enter OTP" />
                  </div>
                </div>
              </div>
              <button
                class="default-btn transition border-0 fw-medium text-white pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-35 pe-md-35 rounded-1 fs-md-15 fs-lg-16"
                type="submit" :disabled="devicePickupForm.processing">
                {{ disburseForm.processing ? "Please Wait..." : "Submit"}}
              </button>
            </form>
          </div>
          <button type="button" class="btn-close shadow-none" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

      </div>
      <button class="invisible" id="confirmPickupModalButton" data-bs-toggle="modal"
        data-bs-target="#confirmDevicePickupModal"></button>
    </div>

    <!-- Approval Modal -->
    <div class="modal fade  modal-lg" id="approveModal" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5">Approve Loan</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p class="fs-md-16 fs-lg-18">Are you sure you want to approve this loan?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              Nevermind
            </button>
            <button type="button" data-bs-dismiss="modal" class="btn btn-success" @click="approve">
              Approve
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Deduction Setup Modal -->
    <div class="modal fade modal-lg deductionSetupModal" id="deductionSetupModal" data-bs-keyboard="false" tabindex="-1"
      aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5">Setup Deduction</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="handleDeductionSubmit">
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group mb-15 mb-sm-20 mb-md-25">
                    <label class="d-block text-black fw-semibold mb-10">
                      Service Provider
                    </label>
                    <select class="form-control shadow-none rounded-0 text-black">
                      <option value="">Select</option>
                      <option value="remita">Remita</option>
                    </select>
                  </div>
                </div>

                <div class="col-md-12">
                  <button
                    class="default-btn transition border-0 fw-medium text-white pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-35 pe-md-35 rounded-1 fs-md-15 fs-lg-16 bg-success"
                    type="submit">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              Close
            </button>

          </div>
        </div>
      </div>
    </div>
    <div class="modal fade uploadAudioModal" id="uploadAudioModal" ref="uploadAudioModal" tabindex="-1"
      aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content p-15 p-md-40">
          <div class="modal-header d-block ps-0 pe-0 pt-0 pb-15 pb-md-25">
            <h5 class="modal-title fw-bold text-black">Upload Audio Modal</h5>
          </div>
          <div class="modal-body ps-0 pe-0 pb-0 pt-15 pt-md-25">
            <audio-upload :callBack="closeModal"></audio-upload>
          </div>
          <button type="button" class="btn-close shadow-none" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
      </div>
    </div>

    <div class="modal fade uploadLoanFileModal" id="uploadLoanFileModal" ref="uploadLoanFileModal" tabindex="-1"
      aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content p-15 p-md-40">
          <div class="modal-header d-block ps-0 pe-0 pt-0 pb-15 pb-md-25">
            <h5 class="modal-title fw-bold text-black">Update Loan File</h5>
          </div>
          <div class="modal-body ps-0 pe-0 pb-0 pt-15 pt-md-25">
            <loan-file-upload :callBack="closeModal" :file-name="selectedFileName"></loan-file-upload>
          </div>
          <button type="button" class="btn-close shadow-none" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
      </div>
    </div>
    <button class="invisible" id="uploadLoanFileModalButton" data-bs-toggle="modal"
      data-bs-target="#uploadLoanFileModal"></button>

    <div class="modal fade displayDocumentModal" id="displayDocumentModal" ref="displayDocumentModal" tabindex="-1"
      aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content p-15 p-md-40">
          <div class="modal-header d-block ps-0 pe-0 pt-0 pb-15 pb-md-25">
            <h5 class="modal-title fw-bold text-black">View Document</h5>
          </div>
          <div class="modal-body ps-0 pe-0 pb-0 pt-15 pt-md-25 text-center">
            <object v-if="selectedDocumentLink.startsWith('data:application/pdf')" :data="selectedDocumentLink"
              type="application/pdf" width="100%" height="320px">
              <p>Unable to display PDF file. <a :href="selectedDocumentLink">Download</a> instead.</p>
            </object>
            <img v-else :src="selectedDocumentLink" style="max-width: 100%; height: 320px;">
          </div>
          <button type="button" class="btn-close shadow-none" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
      </div>
    </div>
  </div>
  <button class="invisible" id="documentModalButton" data-bs-toggle="modal"
    data-bs-target="#displayDocumentModal"></button>

</template>

<script>
import { defineComponent, ref } from "vue";

import BreadCrumb from "../../components/Common/BreadCrumb.vue";
import Loan from "@/apis/Loan";
import router from "@/router";
import AudioUpload from "@/components/Ecommerce/AddProduct/AudioUpload.vue";
import { useToast } from "vue-toastification";
import global from "@/mixins/global";
import Deduction from "@/apis/Deduction";
import LoanFileUpload from "./Partials/LoanFileUpload.vue";


const toast = useToast();

export default defineComponent({
  name: "SingleLoanPage",
  components: {
    BreadCrumb,
    AudioUpload,
    LoanFileUpload
  },
  mixins: [global],
  data() {
    return {
      loan: {},
      selectedFileName: null,
      affordabilityData: {},
      salaryDetails: [],
      loanHistoryDetails: [],
      checkingAffordability: false,
      selectedDocumentLink: '',
      errors: [],
      disburseForm: {
        remark: null,
        reference: null,
        processing: false
      },
      devicePickupForm: {
        loan_reference: null,
        otp: null,
        processing: false
      }
    };
  },
  mounted() {

    Loan.loanDetails(router.currentRoute.value.params.id).then(data => {
      this.loan = data.data.data

    }).catch(error => {
      if (error.response.status === 422) {
        toast.error(error.response.data.message);
        this.errors = error.response.data.errors;
      }
    })
  },
  methods: {
    copyText(content) {
      navigator.clipboard.writeText(content).then(() => toast.info('Text copied to clipboard'));
    },
    fileName(fileName) {
      const fileParts = fileName.split('/');
      return fileParts[fileParts.length - 1];
    },
    closeModal(result, className = null){
      document.getElementsByClassName(className ?? 'uploadAudioModal')[0].classList.remove('show')
      document.getElementsByClassName(className ?? 'uploadAudioModal')[0].removeAttribute('style');
      document.getElementsByClassName('modal-open')[0].removeAttribute('style');
      document.getElementsByClassName('modal-open')[0].classList.remove('modal-open')
      document.getElementsByClassName('modal-backdrop')[0].remove()
      if(result){
        this.fetchDetails();
      }
      // this.$refs.uploadAudioModal.value.removeClass('show');
    },
    showDocumentModal(url){
      this.selectedDocumentLink = url;
      document.getElementById("documentModalButton")?.click();

    },
    showUpdateFileModal(fileName) {
      console.log('rara', fileName);
      this.selectedFileName = fileName;
      document.getElementById("uploadLoanFileModalButton")?.click();

    },
    fetchDetails(){
      Loan.loanDetails(router.currentRoute.value.params.id).then(data => {
        this.loan = data.data.data

        }).catch(error => {
          
              if (error.response.status === 422) {
                  toast.error(error.response.data.message);
                  this.errors = error.response.data.errors;
              }
            })
    },
    handleDeductionSubmit(){
      this.closeModal(null, 'deductionSetupModal');
      document.getElementById("confirmDeductionSetupModalButton")?.click();

    },
    affordabilityCheck(){
      if(Object.keys(this.affordabilityData).length < 1){
        this.checkingAffordability = true;
        Loan.affordabilityCheck(router.currentRoute.value.params.id).then(data => {
          this.checkingAffordability = false;
          console.log(data?.data.data.remitaSearchData.salaryPaymentDetails);
          this.affordabilityData = data.data.data
        }).catch(error => {
          if (error.response.status === 422) {
              toast.error(error.response.data.message);
              this.errors = error.response.data.errors;
          }
        });
      }
    },
    approve(){
      console.log('rora')
      Loan.approve(router.currentRoute.value.params.id).then(data => {
      toast.success('Loan approved successfully')
      this.loan = data.data.data
    }).catch(error => {
      console.log(error.response.data)
          if( [422, 403].includes(error.response?.status)) {
              toast.error(error.response.data.message);
              this.errors = error.response.data.errors;
          }
        })
    },
    setupDeduction(){
      this.closeModal(null, 'confirmDeductionSetupModal');

      Deduction.setupDeduction(router.currentRoute.value.params.id).then(data => {
      toast.success('Deduction Setup successfully')
      this.fetchDetails();
    }).catch(error => {
      // console.log(error.response.data)
          if([422, 403, 400].includes(error.response?.status)) {
              toast.error(error.response.data.message);
              this.errors = error.response.data.errors;
          }
        })
    },
    disburse(){
      this.closeModal(null, 'manualDisbursementModal');
      Loan.disburse(router.currentRoute.value.params.id, this.disburseForm).then(data => {
      toast.success('Loan disbursed successfully')
      this.fetchDetails();

    }).catch(error => {
      console.log(error.response.data)
          if([422, 403, 400].includes(error.response?.status)) {
              toast.error(error.response.data.message);
              this.errors = error.response.data.errors;
          }
        })
    },
    sendDevicePickupOTP() {
      document.getElementById("confirmPickupModalButton")?.click();
      Loan.sendDevicePickupOtp(this.loan.reference).then(data => {
        toast.success('OTP sent to customer successfully')

      }).catch(error => {
        console.log(error.response.data)
            if([422, 403, 400].includes(error.response?.status)) {
                toast.error(error.response.data.message);
                this.errors = error.response.data.errors;
            }
      })
    },
    confirmPickup(){
      this.closeModal(null, 'confirmDevicePickupModal');
      this.devicePickupForm.loan_reference = this.loan.reference
      Loan.confirmDevicePickup(this.devicePickupForm).then(data => {
        toast.success('Device Pickup Confirmed successfully')
        this.fetchDetails();

      }).catch(error => {
        console.log(error.response.data)
            if([422, 403, 400].includes(error.response?.status)) {
                toast.error(error.response.data.message);
                this.errors = error.response.data.errors;
            }
      })
    },
    reject(){
      Loan.reject(router.currentRoute.value.params.id).then(data => {
        toast.success('Loan rejected successfully')
        this.loan = data.data.data
    }).catch(error => {
          if([422, 403].includes(error.response?.status)) {
              toast.error(error.response.data.message);
              this.errors = error.response.data.errors;
          }
        })
    }
  },

  
});
</script>