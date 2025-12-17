<template>
  <div>
    <div class="row flex justify-content-end">
      <div class="col-lg-4 col-sm-12 my-3">
        <div>
          <label for="filter">Filter Period:</label>
        </div>
        <select id="filter" v-model="filter" @change="changeFilter" class="form-control">
          <option value="null" selected>Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="this_quarter">This Quarter</option>
          <option value="this_year">This Year</option>
          <option value="last_year">Last Year</option>
        </select>
      </div>
    </div>
    <div class="row">
      <div class="col-xxl-7 col-xxxl-6">

        <div class="row">
          <!-- totalSent -->
          <StatsBox v-if="totalSent" :stat="totalSent" class="true" icon="flaticon-send" />
          <!-- totalDelivered -->
          <StatsBox v-if="totalDelivered" :stat="totalDelivered" class="true" icon="flaticon-delivery-truck" />
          <!-- linkSubmitted -->
          <StatsBox v-if="linkSubmitted" :stat="linkSubmitted" class="true" icon="flaticon-web" />
          <!-- callsInitiated -->
          <StatsBox v-if="callsInitiated" :stat="callsInitiated" class="true" icon="flaticon-phone" />
          <!-- callsUnreachable -->
          <StatsBox v-if="callsUnreachable" :stat="callsUnreachable" class="true" icon="flat-delivery" />
          <!-- callsDNA -->
          <StatsBox v-if="callsDNA" :stat="callsDNA" class="true" icon="flat-delivery" />
          <!-- callsDNACalledBack -->
          <StatsBox v-if="callsDNACalledBack" :stat="callsDNACalledBack" class="true" icon="flat-delivery" />
          <!-- callsDNACallBack -->
          <StatsBox v-if="callsDNACallBack" :stat="callsDNACallBack" class="true" icon="flat-delivery" />
          <!-- applicationsReceived -->
          <StatsBox v-if="applicationsReceived" :stat="applicationsReceived" class="true" icon="flat-delivery" />
          <!-- applicationsApproved -->
          <StatsBox v-if="applicationsApproved" :stat="applicationsApproved" class="true" icon="flat-delivery" />
          <!-- applicationsRejected -->
          <StatsBox v-if="applicationsRejected" :stat="applicationsRejected" class="true" icon="flat-delivery" />
        </div>

        <!-- <WeeklySales /> -->
      </div>
      <div class="col-xxl-5 col-xxxl-6">
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
        <TopAgents :top-agents="topAgents" />

      </div>

    </div>
  </div>

</template>

<script lang="ts">
import { defineComponent } from "vue";

import Report from "@/apis/Report";

import StatsBox from "../Widgets/StatsBox.vue";

import TopAgents from "../Widgets/TopAgents.vue";
export default defineComponent({
  name: "LeadsAnalyticsPage",
  data(){
      return {
          totalSent: null,
          totalDelivered: null,
          linkSubmitted: null,
          callsInitiated: null,
          callsUnreachable: null,
          callsDNA: null,
          callsDNACalledBack: null,
          callsDNACallBack: null,
          applicationsReceived: null,
          applicationsApproved: null,
          applicationsRejected: null,
          topAgents: [],
          filter: null
      }
  },
  mounted(){
    this.getReports();
  },
  methods:{
    changeFilter(){
      this.getReports(this.filter)
    },
    getReports(filter = null){
      Report.leadsTotals(filter ?? '').then(response => {
        this.totalSent = response.data?.data?.totalSent;
        this.totalDelivered = response.data?.data?.totalDelivered;
        this.linkSubmitted = response.data?.data?.linkSubmitted;
        this.callsInitiated = response.data?.data?.callsInitiated;
        this.callsUnreachable = response.data?.data?.callsUnreachable;
        this.callsDNA = response.data?.data?.callsDNA;
        this.callsDNACalledBack = response.data?.data?.callsDNACalledBack;
        this.callsDNACallBack = response.data?.data?.callsDNACallBack;
        this.applicationsReceived = response.data?.data?.applicationsReceived;
        this.applicationsApproved = response.data?.data?.applicationsApproved;
        this.applicationsRejected = response.data?.data?.applicationsRejected;
        this.topAgents = response.data?.data?.topAgents;
    });
    }
  },
  components: {
    StatsBox,
    TopAgents,
  },
});
</script>