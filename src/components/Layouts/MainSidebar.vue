<template>
  <div :class="[
      'sidebar-area position-fixed start-0 top-0 bg-black h-100vh transition',
      { active: stateStoreInstance.open },
    ]" id="sidebar-area">
    <div class="logo position-absolute start-0 end-0 top-0 bg-black">
      <router-link to="/dashboard" class="d-flex align-items-center text-white text-decoration-none">
        <img src="../../assets/images/favicon.png" alt="logo-icon" />
        <span class="fw-bold ms-10">Sentinel</span>
      </router-link>
      <div class="border-bottom"></div>
      <button class="sidebar-burger-menu position-absolute lh-1 bg-transparent p-0 border-0"
        @click="stateStoreInstance.onChange">
        <i class="ph-duotone ph-caret-double-right"></i>
      </button>
    </div>
    <div class="sidebar-menu">
      <ul class="sidebar-navbar-nav ps-0 mb-0 list-unstyled accordion" id="sidebarNavAccordion">
        <li class="sidebar-nav-item">
          <router-link to="/dashboard" class="sidebar-nav-link d-block">
            <i class="flaticon-more-1"></i>
            <span class="title">Dashboard</span>
          </router-link>
        </li>
        <li class="sidebar-nav-item accordion-item bg-transparent border-0 rounded-0">
          <a href="#" class="accordion-button rounded-0 shadow-none bg-transparent d-block" data-bs-toggle="collapse"
            data-bs-target="#sidebarCollapseOne" aria-expanded="true" aria-controls="sidebarCollapseOne">
            <i class="flaticon-more-1"></i>
            <span class="title">Loan</span>
          </a>
          <div id="sidebarCollapseOne" class="accordion-collapse collapse show" data-bs-parent="#sidebarNavAccordion">
            <div class="accordion-body">
              <ul class="sidebar-sub-menu ps-0 mb-0 list-unstyled">
                <li class="sidebar-sub-menu-item">
                  <router-link to="/all-loans" class="sidebar-sub-menu-link"
                    >
                    All Loans
                  </router-link>
                </li>
                <li class="sidebar-sub-menu-item" v-if="hasAnyPermission(['edit-loan'])">
                  <router-link to="/pending-loans" class="sidebar-sub-menu-link">
                    Pending Authorization
                  </router-link>
                </li>
                <li class="sidebar-sub-menu-item" v-if="hasAnyPermission(['edit-loan'])">
                  <router-link to="/loan-offer-sent" class="sidebar-sub-menu-link">
                    Offer Sent
                  </router-link>
                </li>
                <li class="sidebar-sub-menu-item" v-if="hasAnyPermission(['approve-loan'])">
                  <router-link to="/pending-approval" class="sidebar-sub-menu-link">
                    Pending Approval
                  </router-link>
                </li>
                <li class="sidebar-sub-menu-item">
                  <router-link to="/loans/pending-deduction-setup" class="sidebar-sub-menu-link"
                    v-if="hasAnyPermission(['setup-deduction'])">
                    Pending Deduction Setup
                  </router-link>
                </li>
                <li class="sidebar-sub-menu-item">
                  <router-link to="/loans/pending-disbursal" class="sidebar-sub-menu-link"
                    v-if="hasAnyPermission(['disburse-loan'])">
                    Pending Disbursal
                  </router-link>
                </li>
                <li class="sidebar-sub-menu-item">
                  <router-link to="/loans/disbursed" class="sidebar-sub-menu-link">
                    Disbursed Loans
                  </router-link>
                </li>
                <li class="sidebar-sub-menu-item">
                  <router-link to="/completed-loans" class="sidebar-sub-menu-link">
                    Completed Loans

                  </router-link>
                </li>
                <li class="sidebar-sub-menu-item">
                  <router-link to="/rejected-loans" class="sidebar-sub-menu-link">
                    Rejected Loans
                  </router-link>
                </li>
                <li class="sidebar-sub-menu-item">
                  <router-link to="/device/pickup/initiate" class="sidebar-sub-menu-link"
                    v-if="hasAnyPermission(['process-device-pickup'])">
                    Confirm Device Pickup
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </li>
        <li class="sidebar-nav-item accordion-item bg-transparent border-0 rounded-0">
          <a href="#" class="accordion-button rounded-0 shadow-none bg-transparent d-block" data-bs-toggle="collapse"
            data-bs-target="#sidebarCollapseTwo" aria-expanded="false" aria-controls="sidebarCollapseTwo">
            <i class="flaticon-more-1"></i>
            <span class="title">Deductions</span>
          </a>
          <div id="sidebarCollapseTwo" class="accordion-collapse collapse" data-bs-parent="#sidebarNavAccordion">
            <div class="accordion-body">
              <ul class="sidebar-sub-menu ps-0 mb-0 list-unstyled">
                <li class="sidebar-sub-menu-item" v-if="hasAnyPermission(['view-repayments'])">
                  <router-link to="/deductions/pending" class="sidebar-sub-menu-link">
                    Pending Deductions
                  </router-link>
                </li>
                <li class="sidebar-sub-menu-item" v-if="hasAnyPermission(['view-repayments'])">
                  <router-link to="/deductions/overdue" class="sidebar-sub-menu-link">
                    Overdue Deductions
                  </router-link>
                </li>
                <li class="sidebar-sub-menu-item" v-if="hasAnyPermission(['view-repayments'])">
                  <router-link to="/deductions/all" class="sidebar-sub-menu-link">
                    All Deductions
                  </router-link>
                </li>
                <li class="sidebar-sub-menu-item">
                  <router-link to="/repayments/successful" class="sidebar-sub-menu-link"
                    v-if="hasAnyPermission(['view-repayments'])">
                    Successful Repayments
                  </router-link>
                </li>
                <!-- <li class="sidebar-sub-menu-item">
                  <router-link to="/repayments/failed" class="sidebar-sub-menu-link"
                    v-if="hasAnyPermission(['view-repayments'])">
                    Failed Repayments
                  </router-link>
                </li> -->
                <li class="sidebar-sub-menu-item">
                  <router-link to="/deductions/stop" class="sidebar-sub-menu-link"
                    v-if="hasAnyPermission(['edit-repayment'])">
                    Stop Deduction
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </li>
        <li class="sidebar-nav-item accordion-item bg-transparent border-0 rounded-0">
          <a href="#" class="accordion-button rounded-0 shadow-none bg-transparent d-block" data-bs-toggle="collapse"
            data-bs-target="#sidebarCollapseThree" aria-expanded="true" aria-controls="sidebarCollapseThree">
            <i class="flaticon-more-1"></i>
            <span class="title">Admin management</span>
          </a>
          <div id="sidebarCollapseThree" class="accordion-collapse collapse" data-bs-parent="#sidebarNavAccordion">
            <div class="accordion-body">
              <ul class="sidebar-sub-menu ps-0 mb-0 list-unstyled">
                <li class="sidebar-sub-menu-item">
                  <router-link to="/roles" class="sidebar-sub-menu-link" v-if="hasAnyPermission(['view-roles'])">
                    All Roles
                  </router-link>
                </li>
                <li class="sidebar-sub-menu-item" v-if="hasAnyPermission(['view-admin'])">
                  <router-link to="/admins" class="sidebar-sub-menu-link">
                    All Admins
                  </router-link>
                </li>
                <li class="sidebar-sub-menu-item" v-if="hasAnyPermission(['view-users'])">
                  <router-link to="/users" class="sidebar-sub-menu-link">
                    All Users
                  </router-link>
                </li>
                <li class="sidebar-sub-menu-item">
                  <router-link to="/products" class="sidebar-sub-menu-link" v-if="hasAnyPermission(['view-products'])">
                    All Products
                  </router-link>
                </li>
                <li class="sidebar-sub-menu-item">
                  <router-link to="/special-loan-approvals" class="sidebar-sub-menu-link" v-if="hasAnyPermission(['view-special-approval'])">
                    Special Loan Approvals
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </li>
        <li class="sidebar-nav-item accordion-item bg-transparent border-0 rounded-0">
          <a href="#" class="accordion-button rounded-0 shadow-none bg-transparent d-block" data-bs-toggle="collapse"
            data-bs-target="#sidebarCollapseFour" aria-expanded="true" aria-controls="sidebarCollapseFour">
            <i class="flaticon-more-1"></i>
            <span class="title">Leads management</span>
          </a>
          <div id="sidebarCollapseFour" class="accordion-collapse collapse" data-bs-parent="#sidebarNavAccordion">
            <div class="accordion-body">
              <ul class="sidebar-sub-menu ps-0 mb-0 list-unstyled">
                <li class="sidebar-sub-menu-item">
                  <router-link to="/leads" class="sidebar-sub-menu-link" v-if="hasAnyPermission(['view-all-leads'])">
                    All Leads
                  </router-link>
                </li>
                <li class="sidebar-sub-menu-item">
                  <router-link to="/loans/top-up" class="sidebar-sub-menu-link" v-if="hasAnyPermission(['view-all-leads'])">
                    All Top-up Loans
                  </router-link>
                </li>
                <li class="sidebar-sub-menu-item" v-if="hasAnyPermission(['process-leads'])">
                  <router-link to="/leads/pending" class="sidebar-sub-menu-link">
                    Pending Leads
                  </router-link>
                </li>
                <li class="sidebar-sub-menu-item">
                  <router-link to="/loan-calculator" class="sidebar-sub-menu-link">
                    Loan Calculator
                  </router-link>
                </li>
                <li class="sidebar-sub-menu-item" v-if="hasAnyPermission(['view-all-leads'])">
                  <router-link to="/leads/report" class="sidebar-sub-menu-link">
                    Leads Report
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </li>
        <li class="sidebar-nav-item">
          <router-link to="#" @click.prevent="logout" class="sidebar-nav-link d-block">
            <i class="flaticon-logout"></i>
            <span class="title">Logout</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import stateStore from "../../utils/store";
import global from "@/mixins/global";
import { mapActions } from "vuex";
import User from "@/apis/User";
import router from "@/router";


export default defineComponent({
  name: "MainSidebar",
  mixins: [global],
  methods:{ 
    ...mapActions({
        signOut:"auth/logout"
    }),
    async logout(){
        await User.logout().then(()=>{
            this.signOut();
            router.push('/login');
        })
        }},
  setup() {
    const stateStoreInstance = stateStore;
    return {
      stateStoreInstance,
    };
  },
});
</script>