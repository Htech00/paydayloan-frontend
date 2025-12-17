<template>
  <div v-if="!isExcludedRoute">
    <MainHeader />
    <MainSidebar />
    <div class="main-content d-flex flex-column transition overflow-hidden">
      <router-view />
      <MainFooter />
    </div>
  </div>
  <router-view v-else />
</template>

<script lang="ts">
import { defineComponent,ref, watchEffect } from "vue";
import stateStore from "./utils/store";

import MainHeader from "./components/Layouts/MainHeader.vue";
import MainSidebar from "./components/Layouts/MainSidebar.vue";
import MainFooter from "./components/Layouts/MainFooter.vue";
import { useRoute } from "vue-router";



export default defineComponent({
  name: "App",
  components: {
    MainHeader,
    MainSidebar,
    MainFooter,
  },
  mounted() {
    document.body.classList.add("bg-body-secondary");
  },
  setup() {
    const stateStoreInstance = stateStore;
    watchEffect(() => {
      if (stateStoreInstance.open) {
        document.body.classList.remove("sidebar-show");
        document.body.classList.add("sidebar-hide");
        console.log("show");
      } else {
        document.body.classList.remove("sidebar-hide");
        document.body.classList.add("sidebar-show");

        console.log("hide");
      }
    });
    const route = useRoute();

    // Array of route names to exclude from the header navigation
    const excludedRoutes: string[] = ["LoginPage", "RegisterPage", "ForgotPasswordPage", 'LandingPage',
'ApplyStep1',
'ApplyStep2',
'ApplyStep3',
'ApplyStep4',
'ApplyStep5',
'ApplyStep6',];

    // Reactive reference to track if the current route is excluded
    const isExcludedRoute = ref(false);

    // Watch for changes in the current route and update isExcludedRoute accordingly
    watchEffect(() => {
  const routeName = route.name?.toString() ?? ""; // Convert route.name to string
  isExcludedRoute.value = excludedRoutes.includes(routeName);
});

    return {
      isExcludedRoute,
    };
  },
});
</script>
