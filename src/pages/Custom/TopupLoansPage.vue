<template>
    <BreadCrumb pageTitle="Loans Eligible for Top-up" />
    <CustomTable :propData="dataToPass" :callBack="moreRecords" :viewDetails="viewDetails" />
  </template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  
  import BreadCrumb from "../../components/Common/BreadCrumb.vue";
  import CustomTable from "@/components/Custom/CustomTable.vue";
  import global from "@/mixins/global";
  import Loan from "@/apis/Loan";
import router from "@/router";
  
  export default defineComponent({
    name: "TopupLoansPage",
    components: {
      BreadCrumb,
      CustomTable,
    },
    mounted() {

      Loan.topupLoans().then(data => {
        this.retrieveRecords(data)
      });

    },
    mixins: [global],
    methods: {
      viewDetails(loanId){
        router.push('/loans/'+loanId);
      },
      moreRecords(url, search){

        if(url != null && typeof url != undefined){
            Loan.topupLoans(url, search).then(data => {
            this.retrieveRecords(data)
          });
        }

        if(search != null && typeof search != undefined){
           Loan.topupLoans(url, search).then(data => {
            this.retrieveRecords(data)
          });
        }
      },
      async retrieveRecords (response) {

        const responseData = response.data; 
        const mappedData = responseData.data.data.map((item) => [
          item.user?.name,
          item.user?.phone_number,
          item.user?.ippis_number,
          item.salary_account_number,
          item.salary_bank,
          item.referrer?.name,
          this.formatNumber(item.approved_amount),
          this.formatNumber(item.liquidation_amount),
          this.formatDate(item.created_at),
          item.id
        ]);
        
        let linksData = responseData.data;
        // links.pop()
        // links.shift()
        this.dataToPass = {
          headers: [
            "Name",
            "Phone Number",
            "IPPIS Number",
            "Account Number",
            "Bank",
            "Referrer",
            "Loan Amount",
            "Liquidation Amount",
            "Date Created",
            "Action"
          ],
          data: [...mappedData],
          from: linksData.from,
          to: linksData.to,
          currentPage: linksData.current_page,
          total: linksData.total,
          previousPageUrl: linksData.prev_page_url,
          nextPageUrl: linksData.next_page_url,
          links: linksData.links,
        };
      }
    },
    data() {
      return {
        dataToPass: {
      }, // Define the dataToPass property
      };
    },
  });
  </script>