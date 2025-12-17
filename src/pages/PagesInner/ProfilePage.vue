<template>
  <BreadCrumb PageTitle="Profile" />
  <div class="row">
    <div class="col-xxl-7">
      <ProfileContent :user="user" />
    </div>
    <div class="col-xxl-5">
      

    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import BreadCrumb from "../../components/Common/BreadCrumb.vue";
import ProfileContent from "../../components/PagesInner/Profile/ProfileContent.vue";
import store from "@/store";

export default defineComponent({
  name: "ProfilePage",
  components: {
    BreadCrumb,
    ProfileContent,
  },
  data(){
      return {
          user: store.getters['auth/user'],
      }
  },
});
</script>