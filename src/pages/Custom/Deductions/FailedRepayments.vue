<template>
    <BreadCrumb pageTitle="Failed Repayments" />
    <CustomTable :propData="dataToPass" :callBack="moreRecords" :viewDetails="null" />
  </template>
  
  <script>
  import { defineComponent } from "vue";
  
  import BreadCrumb from "@/components/Common/BreadCrumb.vue";
  import CustomTable from "@/components/Custom/CustomTable.vue";
  import global from "@/mixins/global";
  import Deduction from "@/apis/Deduction";
  
  export default defineComponent({
    name: "FailedRepaymentsPage",
    components: {
      BreadCrumb,
      CustomTable,
    },
    mounted() {
      Deduction.payments('failed').then(data => {
        this.retrieveRecords(data)
      });

    },
    mixins: [global],
    methods: {
      viewDetails(itemId){
        // router.push('/loans/'+itemId);
      },
      moreRecords(url){
        if(url != null && typeof url != undefined){
          Deduction.payments('failed').then(data => {
            this.retrieveRecords(data)
          });
        }
      },
      async retrieveRecords (response) {

        const responseData = response.data; 
        const mappedData = responseData.data.data.map((item) => [
          this.formatDate(item.created_at),
          item.loan.reference,
          item.loan.user.name,
          this.formatNumber(item.amount),
          item.reference,
          item.payment_method.name,
          item.initiator.name ?? 'System',
          item.id

        ]);
        
        let linksData = responseData.data;
        // links.pop()
        // links.shift()
        this.dataToPass = {
          headers: [
            "Payment Date",
            "Loan Ref",
            "Name",
            "Amount",
            "Reference",
            "Payment Method",
            "Initiator"
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