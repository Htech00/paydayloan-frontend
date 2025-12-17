<template>
  <div class="row flex justify-content-end">
    <div class="col-lg-4 col-sm-12 my-3">
      <div>
        <label for="filter">Filter Period:</label>
      </div>
      <select id="filter" v-model="filter" @change="changeFilter" class="form-control">
        <option value="null" selected>Today</option>
         <option value="yesterday">Yesterday</option>
        <option value="week">This Week</option>
        <option value="last_week">Last Week</option>
        <option value="month">This Month</option>
        <option value="last_month">Last Month</option>
        <option value="this_quarter">This Quarter</option>
        <option value="this_year">This Year</option>
        <option value="last_year">Last Year</option>
      </select>
    </div>
  </div>
  <div class="row">
    <div class="col-xxl-12 col-xxxl-6">
      <WhatHappening :name="user.first_name" />

      <div class="row">
        <div class="col-lg-6 col-xxxl-6 col-md-6">
          <!-- <ExpectedEarnings /> -->
        </div>
        <div class="col-lg-6 col-xxxl-6 col-md-6">
          <!-- <AverageDailySales /> -->
        </div>
        <div class="col-xl-12 col-lg-6 col-xxxl-6 col-md-12">
          <!-- <RevenueThisMonth /> -->
        </div>
        <div class="col-xl-12 col-lg-6 col-xxxl-6 col-md-12">
          <!-- <NewCustomersThisMonth /> -->
        </div>
      </div>
    </div>
    <div class="col-xxl-12 col-xxxl-6">

      <div class="row">
        <!-- callsInitiated -->
        <StatsBox v-if="callsInitiated" :stat="callsInitiated" :loading="loading" class="true" icon="flaticon-phone" />
        <!-- applicationsReceived -->
        <StatsBox v-if="applicationsReceived" :stat="applicationsReceived" :loading="loading" class="true" icon="flat-delivery" />
        <!-- applicationsApproved -->
        <StatsBox v-if="applicationsApproved" :stat="applicationsApproved" :loading="loading" class="true" icon="flat-delivery" />
        <!-- applicationsRejected -->
        <StatsBox v-if="applicationsRejected" :stat="applicationsRejected" :loading="loading" class="true" icon="flat-delivery" />
        <!-- applicationsDisbursed-->
        <StatsBox v-if="applicationsDisbursed" :stat="applicationsDisbursed" :loading="loading" class="true" icon="flat-delivery" />
        <!-- <Disbursed Total  /> -->
        <StatsBox v-if="disbursedTotal" sign="₦" :stat="disbursedTotal" :loading="loading" class="true" icon="flat-delivery" />
        <!-- <Total Collections /> -->
        <StatsBox v-if="totalCollections" sign="₦" :stat="totalCollections" :loading="loading" class="true" icon="flat-delivery" />
        <!-- <Total Due Collections /> -->
        <StatsBox v-if="totalDueCollections" sign="₦" :stat="totalDueCollections" :loading="loading" class="true" icon="flat-delivery" />
        <!-- <Total Overdue Collections /> -->
        <StatsBox v-if="totalOverdueCollections" sign="₦" :stat="totalOverdueCollections" :loading="loading" class="true" icon="flat-delivery" />
        <!-- <Total Pending Collections /> -->
        <StatsBox v-if="totalPendingCollections" sign="₦" :stat="totalPendingCollections" :loading="loading" class="true" icon="flat-delivery" />
        <!-- <Total Collection Rate /> -->
        <StatsBox v-if="collectionRate" sign="%" signAfter="true" :stat="collectionRate" :loading="loading" class="true" icon="flat-delivery" />

      </div>

    </div>
    <div class="col-xxl-4">
      <!-- <SalesByPOSLocation /> -->
    </div>
    <div class="col-xxl-4">
      <!-- <TopSellingProducts /> -->
    </div>
    <div class="col-xxl-4">
      <!-- <WebsiteVisitors /> -->
    </div>
    <div class="col-xxl-6">
      <!-- <ProductsOrders /> -->
    </div>
    <div class="col-xxl-6">
      <!-- <StockReport /> -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import WhatHappening from "../../components/Dashboard/Ecommerce/WhatHappening.vue";
import store from "@/store";

// import ExpectedEarnings from "../../components/Dashboard/Ecommerce/ExpectedEarnings.vue";

// import AverageDailySales from "../../components/Dashboard/Ecommerce/AverageDailySales.vue";

// import RevenueThisMonth from "../../components/Dashboard/Ecommerce/RevenueThisMonth.vue";

// import NewCustomersThisMonth from "../../components/Dashboard/Ecommerce/NewCustomersThisMonth.vue";

import StatsBox from "../Custom/Widgets/StatsBox.vue";

import Report from "@/apis/Report";
import global from "@/mixins/global";

// import WeeklySales from "../../components/Dashboard/Ecommerce/WeeklySales.vue";

//import SalesByPOSLocation from "../../components/Dashboard/Ecommerce/SalesByPOSLocation.vue";

// import TopSellingProducts from "../../components/Dashboard/Ecommerce/TopSellingProducts/index.vue";

//import WebsiteVisitors from "../../components/Dashboard/Ecommerce/WebsiteVisitors.vue";

//import ProductsOrders from "../../components/Dashboard/Ecommerce/ProductsOrders/index.vue";

//import StockReport from "../../components/Dashboard/Ecommerce/StockReport/index.vue";

export default defineComponent({
  name: "EcommercePage",
  data(){
      return {
          applicationsReceived: null,
          applicationsApproved: null,
          applicationsRejected: null,
          applicationsDisbursed: null,
          callsInitiated: null,
          disbursedTotal: null,
          totalCollections: null,
          totalDueCollections: null,
          totalOverdueCollections: null,
          totalPendingCollections: null,
          collectionRate: null,
          filter: null,
          loading: false,
          user: store.getters['auth/user'],
      }
  },
  mounted(){
    // if(this.hasAnyPermission(['download-leads-report'])){
      console.log('warwin...')
      this.getReports();
    // }
  },
  mixins: [global],
  methods:{
    changeFilter(){
        this.getReports(this.filter)
    },
    getReports(filter = null) {
      this.loading = true;
      Report.leadsTotals(filter ?? '').then(response => {
        this.loading = false;
        // this.totalSent = response.data?.data?.totalSent;
        // this.totalDelivered = response.data?.data?.totalDelivered;
        // this.linkSubmitted = response.data?.data?.linkSubmitted;
        this.callsInitiated = response.data?.data?.callsInitiated;
        // this.callsUnreachable = response.data?.data?.callsUnreachable;
        this.disbursedTotal = response.data?.data?.disbursedTotal;
        this.applicationsDisbursed = response.data?.data?.applicationsDisbursed;
        this.totalDueCollections = response.data?.data?.totalDueCollections;
        this.totalOverdueCollections = response.data?.data?.totalOverdueCollections;
        this.totalPendingCollections = response.data?.data?.totalPendingCollections;
        this.collectionRate = response.data?.data?.collectionRate;
        this.totalCollections = response.data?.data?.totalCollections;
        this.applicationsReceived = response.data?.data?.applicationsReceived;
        this.applicationsApproved = response.data?.data?.applicationsApproved;
        this.applicationsRejected = response.data?.data?.applicationsRejected;
    });
    }
  },
  components: {
    WhatHappening,
    // ExpectedEarnings,
    // AverageDailySales,
    // RevenueThisMonth,
    // NewCustomersThisMonth,
    StatsBox,
    // WeeklySales,
    // SalesByPOSLocation,
    // TopSellingProducts,
    // WebsiteVisitors,
    // ProductsOrders,
    // StockReport,
  },
});
</script>