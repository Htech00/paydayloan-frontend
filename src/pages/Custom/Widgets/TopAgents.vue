<template>
  <div class="card mb-25 border-0 rounded-0 bg-white top-selling-products-box">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
      <div
        class="mb-15 mb-md-20 mb-lg-25 d-sm-flex align-items-center justify-content-between"
      >
        <h6 class="card-title fw-bold mb-0">Top Perfoming Agents</h6>
        <router-link
          to="/products-list"
          class="card-btn mt-10 mt-sm-0 d-inline-block fw-medium text-decoration-none transition ps-10 pe-10 pt-5 pb-5"
        >
          Export
          <i class="flaticon-logout lh-1 position-relative ms-5 top-2"></i>
        </router-link>
      </div>
      <table class="ps-0 mb-0 w-100">
        <thead>
            <tr>
              <th class="fs-13 fw-medium text-dark-emphasis">NAME</th>
              <th class="fs-13 fw-medium text-dark-emphasis mx-2">CALLS</th>
              <th class="fs-13 fw-medium text-dark-emphasis mx-2">LOANS</th>
            </tr>
        </thead>
        <tbody>
          <tr
            class="border border-light"
            v-for="agent in topAgents"
            :key="agent.id"
          >
            <td class="py-3 text-left" style="width: 50% !important;">
              <span class="d-block fw-bold text-black-emphasis me-15">
                {{ agent.name }}.
              </span>
              
            </td>
            
              <td class="p-2 text-left w-25">
                  {{ agent.leads_count }}
              </td>
              <td class="p-2 text-left w-25">
                {{ formatNumber(agent.portfolio_sum_approved_amount) }}
              </td>
          </tr>
        </tbody>
        
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import global from "@/mixins/global";
import { defineComponent } from "vue";

export default defineComponent({
  name: "TopAgents",
  props: ['topAgents'],
  mixins: [global],

});
</script>