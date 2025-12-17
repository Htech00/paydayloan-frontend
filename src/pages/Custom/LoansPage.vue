<template>
  <BreadCrumb pageTitle="All Loans" />
  <CustomTable :propData="dataToPass" :callBack="moreRecords" :viewDetails="viewDetails" report="loans"
    :webAccessToken="webAccessToken" webAction="download-loans-report" :downloadStatusOptions="statusOptions"
    downloadReportUrl="https://sapphire-api.digisparksolutions.ng/reports/download/credit" />
</template>
  
  <script>
  import { defineComponent } from "vue";
  
  import BreadCrumb from "../../components/Common/BreadCrumb.vue";
  import CustomTable from "../../components/Custom/CustomTable.vue";
  import Loan from "@/apis/Loan";
  import router from "@/router";
  import global from "@/mixins/global";
  import Deduction from "@/apis/Deduction";
  import Admin from "@/apis/Admin";
  
  export default defineComponent({
    name: "LoansPage",
    components: {
      BreadCrumb,
      CustomTable,
    },
    data() {
      return {
        dataToPass: {
        }, // Define the dataToPass property
        webAccessToken: null,
        statusOptions: null,
      };
    },
    mounted() {
      Loan.allLoans().then(data => {
        this.retrieveRecords(data)
      });

      if (this.downloadReport) {
        Admin.getWebAccess({
          'action': 'download-loans-report'
        }).then(response => {
          this.webAccessToken = response.data?.data?.token
          console.log('web acCESS', this.webAccessToken)
        });
      }

      Deduction.statusOptions().then(data => {
        this.statusOptions = data.data.data;
      });

    },
    computed: {
      downloadReport() {
        return this.hasAnyPermission(['download-loans-report'])
      }
    },
    mixins: [global],
    methods: {
      viewDetails(loanId){
        router.push('/loans/'+loanId);
      },
      moreRecords(url, search){
        console.log('stop the madness', url)
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
          (loan.user?.first_name ?? '') + ' '+(loan.user?.last_name ?? ''),
          loan.user?.phone_number,
          this.formatNumber(loan.amount),
          loan.tenor.toString(),
          loan?.loan_type?.name,
          loan?.application_type,
          loan.organization_name,
          this.formatDate(loan.created_at),
          loan.status,
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
            "Platform",
            "Type",
            "Organisation",
            "Date Created",
            "STATUS"
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
  
  });
  </script>