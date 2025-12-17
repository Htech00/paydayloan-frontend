import { createWebHistory, createRouter } from "vue-router";

import store from '../store'

import EcommercePage from "../pages/Dashboard/EcommercePage.vue";
import DisbursedLoansPage from "../pages/Custom/DisbursedLoansPage.vue";
import LoansPage from "../pages/Custom/LoansPage.vue";
import SingleLoanPage from "../pages/Custom/SingleLoanPage.vue";
import PendingLoansPage from "../pages/Custom/PendingLoansPage.vue";
import LoansWithOfferSentPage from "../pages/Custom/LoansWithOfferSentPage.vue";
import LoanCalculatorPage from "../pages/Custom/Leads/LoanCalculator.vue";
import CompletedLoansPage from "../pages/Custom/CompletedLoansPage.vue";
import RejectedLoansPage from "../pages/Custom/RejectedLoansPage.vue";

import SuccessfulRepaymentsPage from "../pages/Custom/Deductions/SuccessfulRepayments.vue";
import FailedRepaymentsPage from "../pages/Custom/Deductions/FailedRepayments.vue";

import AllRoles from "../pages/Custom/AllRoles.vue";
import AllAdmins from "../pages/Custom/AllAdmins.vue";
import AllUsers from "../pages/Custom/AllUsers.vue";
 

import BlankPage from "../pages/BlankPage.vue";
import LogoutPage from "../pages/LogoutPage.vue";
import PendingApprovalLoansPage from "@/pages/Custom/PendingApprovalLoansPage.vue";
import PendingDisbursementPage from "@/pages/Custom/PendingDisbursementPage.vue";
import PendingDeductionSetupPage from "@/pages/Custom/PendingDeductionSetupPage.vue";
import PendingDeductions from "@/pages/Custom/Deductions/PendingDeductions.vue";
import OverdueDeductions from "@/pages/Custom/Deductions/OverdueDeductions.vue";
import AllDeductions from "@/pages/Custom/Deductions/AllDeductions.vue";

import LeadsPage from "@/pages/Custom/Leads/LeadsPage.vue";
import LeadsAnalyticsPage from "@/pages/Custom/Leads/LeadsAnalyticsPage.vue";
import AllRolesPage from "@/pages/Custom/AllRolesPage.vue";
import PendingLeadsPage from "@/pages/Custom/Leads/PendingLeadsPage.vue";
import StopDeductionPage from "@/pages/Custom/Deductions/StopDeduction.vue";
import LoginPage from "@/pages/Authentication/LoginPage.vue";
import ProfilePage from "@/pages/PagesInner/ProfilePage.vue";
import InitiateDevicePickupPage from "@/pages/Custom/Leads/InitiateDevicePickupPage.vue";
import AllProducts from "@/pages/Custom/AllProducts.vue";
import SpecialApprovals from "@/pages/Custom/SpecialApprovals.vue";
import TopupLoansPage from "@/pages/Custom/TopupLoansPage.vue";
 
const routes = [
  {
    path: "/dashboard",
    name: "EcommercePage",
    meta:{
      middleware:"auth",
      title:`Dashboard`,
    },
    component: EcommercePage,
  },
  {
    path: "/profile",
    name: "ProfilePage",
    meta:{
      middleware:"auth",
      title:`ProfilePage`
    },
    component: ProfilePage,
  },
  // custom routes
  {
    path: "/all-loans",
    name: "LoansPage",
    meta:{
      middleware:"auth",
      title:`Loans Page`
    },
    component: LoansPage,
  },
  {
    path: "/loans/:id",
    name: "SingleLoanPage",
    meta:{
      middleware:"auth",
      title:`Loans Page`
    },
    component: SingleLoanPage,
  },
  {
    path: "/pending-loans",
    name: "PendingLoansPage",
    meta:{
      middleware:"auth",
      title:`Loans Page`
    },
    component: PendingLoansPage,
  },
  {
    path: "/loan-offer-sent",
    name: "LoanWithOfferSentPage",
    meta:{
      middleware:"auth",
      title:`Loans With Offer Sent`
    },
    component: LoansWithOfferSentPage,
  },
  {
    path: "/loan-calculator",
    name: "LoanCalculatorPage",
    meta:{
      middleware:"auth",
      title:`Loan Calculator Page`
    },
    component: LoanCalculatorPage,
  },
  {
    path: "/device/pickup/initiate",
    name: "InitiateDevicePickupPage",
    meta:{
      middleware:"auth",
      title:`Initiate Device Pickup Page`
    },
    component: InitiateDevicePickupPage,
  },
  {
    path: "/pending-approval",
    name: "PendingApprovalLoansPage",
    meta:{
      middleware:"auth",
      title:`Pending Approval Loans Page`
    },
    component: PendingApprovalLoansPage,
  },
  {
    path: "/loans/pending-disbursal",
    name: "PendingDisbursementLoansPage",
    meta:{
      middleware:"auth",
      title:`Loans Pending Disbursement Page`
    },
    component: PendingDisbursementPage,
  },
  {
    path: "/loans/disbursed",
    name: "DisbursedLoansPage",
    meta:{
      middleware:"auth",
      title:`Disbursed Loan Page`
    },
    component: DisbursedLoansPage,
  },
  {
    path: "/loans/pending-deduction-setup",
    name: "PendingDeductionSetupLoansPage",
    meta:{
      middleware:"auth",
      title:`Loans Pending Deduction Setup`
    },
    component: PendingDeductionSetupPage,
  },
  {
    path: "/completed-loans",
    name: "CompletedLoansPage",
    meta:{
      middleware:"auth",
      title:`Loans Page`
    },
    component: CompletedLoansPage,
  },
  {
    path: "/rejected-loans",
    name: "RejectedLoansPage",
    meta:{
      middleware:"auth",
      title:`Loans Page`
    },
    component: RejectedLoansPage,
  },
    {
    path: "/deductions/all",
    name: "AllDeductionsPage",
    meta:{
      middleware:"auth",
      title:`Pending Deductions Page`
    },
    component: AllDeductions,
  },
  {
    path: "/deductions/pending",
    name: "PendingDeductionsPage",
    meta:{
      middleware:"auth",
      title:`Pending Deductions Page`
    },
    component: PendingDeductions,
  },
  {
    path: "/deductions/overdue",
    name: "OverdueDeductionsPage",
    meta:{
      middleware:"auth",
      title:`Overdue Deductions Page`
    },
    component: OverdueDeductions,
  },
  {
    path: "/repayments/successful",
    name: "SuccessfulRepaymentsPage",
    meta:{
      middleware:"auth",
      title:`Pending Deductions Page`
    },
    component: SuccessfulRepaymentsPage,
  },
  {
    path: "/repayments/failed",
    name: "FailedRepaymentsPage",
    meta:{
      middleware:"auth",
      title:`Failed Repayments Page`
    },
    component: FailedRepaymentsPage,
  },
  {
    path: "/deductions/stop",
    name: "stopDeductionPage",
    meta:{
      middleware:"auth",
      title:`Stop Deduction Page`
    },
    component: StopDeductionPage,
  },
  {
    path: "/leads/",
    name: "LeadsPage",
    meta:{
      middleware:"auth",
      title:`Leads Page`
    },
    component: LeadsPage,
  },
  {
    path: "/leads/pending",
    name: "LeadsPendingPage",
    meta:{
      middleware:"auth",
      title:`Pending Leads Page`
    },
    component: PendingLeadsPage,
  },
  {
    path: "/leads/report",
    name: "LeadsAnalyticsPage",
    meta:{
      middleware:"auth",
      title:`Leads Analytics Page`
    },
    component: LeadsAnalyticsPage,
  },
  {
    path: "/roles",
    name: "AllRoles",
    component: AllRolesPage,
  },
  {
    path: "/admins",
    name: "AllAdmins",
    component: AllAdmins,
  },
  {
    path: "/users",
    name: "AllUsers",
    component: AllUsers,
  },
  {
    path: "/products",
    name: "AllProducts",
    component: AllProducts,
  },
  {
    path: "/special-loan-approvals",
    name: "SpecialApprovalsPage",
    component: SpecialApprovals,
  },
  {
    path: "/loans/top-up",
    name: "TopupLoansPage",
    component: TopupLoansPage,
  },


  {
    path: '/',
    name: 'LandingPage',
    meta:{
      middleware:"guest",
      title:`Home`
    },
    component: () => import('../views/LandingPage.vue'),
},


{
    path: '/apply-step1',
    name: 'ApplyStep1',
    meta:{
      middleware:"guest",
      title:`Loan Application`
    },
    component: () => import('../views/ApplyStep1.vue')
},
{
    path: '/apply-step2',
    name: 'ApplyStep2',
    meta:{
      middleware:"guest",
      title:`Loan Application`
    },
    component: () => import('../views/ApplyStep2.vue')
},
{
    path: '/apply-step3',
    name: 'ApplyStep3',
    meta:{
      middleware:"guest",
      title:`Loan Application`
    },
    component: () => import('../views/ApplyStep3.vue')
},
{
    path: '/apply-step4',
    name: 'ApplyStep4',
    meta:{
      middleware:"guest",
      title:`Loan Application`
    },
    component: () => import('../views/ApplyStep4.vue')
},
{
    path: '/apply-step5',
    name: 'ApplyStep5',
    meta:{
      middleware:"guest",
      title:`Loan Application`
    },
    component: () => import('../views/ApplyStep5.vue')
},
{
    path: '/application-complete',
    name: 'ApplyStep6',
    meta:{
      middleware:"guest",
      title:`Loan Application Success`
    },
    component: () => import('../views/ApplyStep6.vue')
},
{
  path: "/login",
  name: "LoginPage",
  meta:{
    middleware:"guest",
    title:`Login`
  },
  component: LoginPage,
},



  
  {
    path: "/leads",
    name: "LeadsPage",
    component: LeadsPage,
  },

  {
    path: "/blank-page",
    name: "BlankPage",
    component: BlankPage,
  },
  {
    path: "/logout",
    name: "LogoutPage",
    component: LogoutPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  linkExactActiveClass: "active",
  routes: routes,
  scrollBehavior() {
    return { top: 0, behavior: "smooth" };
  },
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} - CreditFlex`
  if(to.meta.middleware=="guest"){
      if(store.getters['auth/authenticated']){
          next("/dashboard")
      }
      next()
  }else{
      if(store.getters['auth/authenticated']){
          next()
      }else{
          next("/login")
      }
  }
})

export default router;