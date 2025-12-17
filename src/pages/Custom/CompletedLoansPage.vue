<template>
  <BreadCrumb pageTitle="Completed Loans" />
  <CustomTable :propData="dataToPass" :callBack="moreRecords" :viewDetails="viewDetails" />
</template>

<script>
import { defineComponent } from "vue";

import BreadCrumb from "../../components/Common/BreadCrumb.vue";
import CustomTable from "../../components/Custom/CustomTable.vue";
import Loan from "@/apis/Loan";
import router from "@/router";
import global from "@/mixins/global";

export default defineComponent({
  name: "CompletedLoansPage",
  components: {
    BreadCrumb,
    CustomTable,
  },
  mixins: [global],
  mounted() {
    Loan.completed().then(data => {
      this.retrieveRecords(data)
    });

  },
  methods: {
    viewDetails(loanId){
      router.push('/loans/'+loanId);
    },
    moreRecords(url, search){
        if(url != null && typeof url != undefined){
          Loan.moreRecords(url).then(data => {
            this.retrieveRecords(data)
          });
        }

        if(search != null && typeof search != undefined){
          Loan.moreRecords(url, search).then(data => {
            this.retrieveRecords(data)
          });
        }
    },
    async retrieveRecords (response) {

    const responseData = response.data; 
    const mappedData = responseData.data.data.map((loan) => [
      loan.user.first_name + ' '+loan.user.last_name,
      loan.user.phone_number,
      this.formatNumber(loan.amount),
      loan.tenor.toString(),
      loan.organization_name,
      this.formatDate(loan.created_at),
      loan.id
    ]);

    let linksData = responseData.data;
    // links.pop()
    // links.shift()
    this.dataToPass = {
      headers: [
        "Name",
        "Phone",
        "Amount",
        "Tenor",
        "Organisation",
        "Date Created",
      ],
      data: [...mappedData],
      from: linksData.from,
      to: linksData.to,
      currentPage: linksData.current_page,
      total: linksData.total,
      previousPageUrl: linksData.prev_page_url,
      nextPageUrl: linksData.next_page_url,
      links: linksData.links,
    };}
  },
  data() {
    return {
      dataToPass: {
    }, // Define the dataToPass property
    };
  },
});
</script>