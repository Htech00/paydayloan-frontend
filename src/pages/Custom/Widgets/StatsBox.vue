<template>
  <div class="col-xl-4 col-sm-6">
    <div class="card mb-25 border-0 rounded-0 bg-white stats-box">
      <div class="card-body pe-20 ps-20 pe-md-25 ps-md-25 pe-lg-15 ps-lg-15">
        <div class="d-flex align-items-center">
          <div
            :class="[
              'icon position-relative rounded-circle text-center',
              stat.class,
            ]"
          >
            <i :class="icon"></i>
          </div>
          <div class="title ms-15">
            <span
              class="d-block mb-7 fs-13 text-uppercase fw-medium text-dark-emphasis"
            >
              {{ stat.title }}
            </span>
            <h4 class="fw-black mb-8 lh-1">
              {{ signAfter ? "" :  sign }}{{ loading ? '...' : (sign ? formatNumber(stat.current) : stat.current)  }} {{ signAfter ? sign :  "" }}<span v-if="stat.count != null">({{stat.count }})</span>
            </h4>
            <span class="fw-medium text-dark-emphasis">
              {{ signAfter ? "" :  sign }}{{ loading ? '...' : (sign ? formatNumber(stat.previous) : stat.previous) }}{{ signAfter ? sign :  "" }}
            </span>
            <span :class="{'fw-bold text-success ms-8': (stat.current > stat.previous), 'fw-bold text-danger ms-8': (stat.current <= stat.previous)}">
              {{ stat.percent }}%
              <i
                :class="[
                  (stat.current > stat.previous) ? 'flaticon-up-arrow' : 'flaticon-down-arrow',
                  'fs-12 lh-1 position-relative top-1',
                ]"
              >
              </i>
              <!-- <div class="fw-medium text-dark-emphasis" v-if="stat.count != null">
                COUNT: {{stat.count }}
              </div> -->
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import global from "@/mixins/global";
import { defineComponent } from "vue";

export default defineComponent({
  name: "StatsBox",
  mixins: [global],
  props: ['stat', 'icon', 'class', 'iconUp', 'sign', 'signAfter', 'loading']
})
</script>