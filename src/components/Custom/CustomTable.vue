<template>
  <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
    <div
      class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25">
      <div class="d-sm-flex align-items-center">
        <button
          class="default-btn position-relative transition border-0 fw-medium text-white pt-11 pb-11 ps-25 pe-25 pt-md-12 pb-md-12 ps-md-30 pe-md-30 rounded-1 bg-success fs-md-15 fs-lg-16 d-inline-block me-10 mb-10 mb-lg-0 text-nowrap"
          type="button" @click.prevent="headAction" v-if="headAction">{{ headActionText ? headActionText : 'Create New Lead'}}<i class="flaticon-plus position-relative ms-5 fs-12"></i></button>
        <form v-if="report && webAccessToken" :action="downloadReportUrl ?? 'http://sapphire-api.digisparksolutions.ng/reports/download'">
          <div class="d-flex justify-content-around align-items-center p-10 mx-2 bg-light">
            <input type="hidden" name="report_type" v-model="downloadForm.reportType">
            <input type="hidden" name="token" v-model="downloadForm.token">
            <input type="hidden" name="action" v-model="downloadForm.action">
            <input type="date" placeholder="Start Date" name="from_date"
              class="form-control shadow-none text-black rounded-0 border-0 bg-white" style="height: 45px" required>
            <input type="date" placeholder="End Date" name="to_date"
              class="form-control shadow-none text-black rounded-0 border-0 bg-white ms-2" style="height: 45px"
              required>
            <select type="date" name="status"
              class="form-control shadow-none text-black rounded-0 border-0 bg-white ms-2" style="height: 45px">
              <option value="">Select Status</option>
              <option v-for="option in statusOptions" :key="option">{{ option }}</option>
            </select>
            <button style="height: 45px"
              class="default-outline-btn position-relative transition fw-medium text-black pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-30 pe-md-30 rounded-1 bg-transparent fs-md-15 fs-lg-16 d-inline-block mb-10 mb-lg-0 ms-10"
              type="submit">
              Export<i class="flaticon-file-1 position-relative ms-5 top-2 fs-15"></i>
            </button>
          </div>
        </form>


      </div>
      <div class="d-flex align-items-center">

        <form class="search-box position-relative me-15">
          <input type="text" @input="search" v-model="query"
            class="form-control shadow-none text-black rounded-0 border-0" placeholder="Search" />
          <button type="submit" class="bg-transparent text-primary transition p-0 border-0">
            <i class="flaticon-search-interface-symbol"></i>
          </button>
        </form>
        <button
          class="dot-btn lh-1 position-relative top-3 bg-transparent border-0 shadow-none p-0 transition d-inline-block"
          type="button">
          <i class="flaticon-dots"></i>
        </button>
      </div>
    </div>
    <div class="card-body p-15 p-sm-20 p-md-25">
      <div class="table-responsive">
        <table class="table text-nowrap align-left mb-0">
          <thead>
            <tr>
              <th v-for="(header, index) in tableHeaders" :key="index"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 ps-0">
                {{ header }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, rowIndex) in tableData" :key="rowIndex">
              <!-- Iterate over row to generate table cells -->
              <template v-for="(cell, cellIndex) in row" :key="cellIndex">
                <td class="px-0 py-3" v-if="cellIndex < (row.length - 1)">
                  {{ cell }}
                </td>
                <td v-else>
                  <template v-if="Array.isArray(viewDetails)">
                    <div class="dropdown">
                      <button class="dropdown-toggle lh-1 bg-transparent border-0 shadow-none p-0 transition"
                        type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="flaticon-dots"></i>
                      </button>
                      <ul class="dropdown-menu">
                        <li v-for="action in viewDetails.filter(e => e.hasPermission)" :key="action">
                          <a class="dropdown-item d-flex align-items-center" href="javascript:void(0);"
                            @click="action.method(cell)">
                            <i class="flaticon-view lh-1 me-8 position-relative top-1"></i>
                            {{ action?.buttonText }}
                          </a>
                        </li>

                      </ul>
                    </div>

                  </template>
                  <template v-else>
                    <a class="dropdown-item d-flex align-items-center" href="javascript:void(0);"
                      @click.prevent="viewDetails(cell)">
                      <i class="lh-1 me-8 position-relative top-1"
                        :class="{'flaticon-plus': buttonText?.toLowerCase().includes('add'), 'flaticon-edit': buttonText?.toLowerCase().includes('edit'), 'flaticon-view': buttonText?.toLowerCase().includes('view')}"></i>
                      {{ buttonText ? buttonText : 'View' }}
                    </a>
                  </template>
                </td>
              </template>

              <!-- Append dropdown menu to each row -->
              <td class="shadow-none lh-1 fw-medium text-body-tertiary text-start pe-0">



              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="pagination-area d-md-flex mt-15 mt-sm-20 mt-md-25 justify-content-between align-items-center">
        <p class="mb-0 text-paragraph">
          Showing <span class="fw-bold">{{propData.from}}</span> out of
          <span class="fw-bold">{{propData.total}}</span> results
        </p>
        <nav class="mt-15 mt-md-0">
          <ul class="pagination mb-0">

            <li class="page-item" v-for="(link, index) in propData.links" :key="link">
              <a v-if="index == (propData.links.length -1)" class="page-link" href="#"
                @click.prevent="callBack(link.url)" aria-label="Previous">
                <i class="flaticon-chevron"></i>
              </a>
              <a v-else-if="index == 0" class="page-link" href="#" @click.prevent="callBack(link.url)"
                aria-label="Previous">
                <i class="flaticon-chevron-1"></i>
              </a>
              <a v-else class="page-link" :class="{'active': link.active}" href="#"
                @click.prevent="callBack(link.url)">{{link.label}}</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>
  
  <script>
  export default {
    name: "CustomTable",
    props: ['propData', 'callBack', 'viewDetails', 'buttonText', 'headAction', 'headActionText', 'report', 'webAccessToken', 'webAction', 'downloadStatusOptions', 'downloadReportUrl'],

  data() {
    return {
      tableHeaders: [],
      tableData: [],
      mount: 0,
      query: null,
      searchLocked: false,
      statusOptions : [],
      downloadForm: {
        reportType: null,
        token: null,
        action: null
      }
    };
  },
  methods: {
    search() {
      if (!this.searchLocked) {
        this.searchLocked = true;
        setTimeout(() => {
          this.callBack(null, this.query);
          this.searchLocked = false;
        }, 2000)
      }
     
  },
  },
  updated(){
    if (this.propData && Array.isArray(this.propData.headers)) {
      this.tableHeaders = this.propData.headers;
    }
    if (this.propData && Array.isArray(this.propData.data)) {
      this.tableData = this.propData.data;
    }
    this.downloadForm.reportType = this.report;
    this.downloadForm.token = this.webAccessToken;
    this.downloadForm.action = this.webAction
    this.statusOptions = this.downloadStatusOptions
    console.log('rara rasputia', this.downloadForm.token)
  },
  mounted() {
   
    // Populate tableHeaders array with propData
    if (this.propData && Array.isArray(this.propData.headers)) {
      this.tableHeaders = this.propData.headers;
    }
    if (this.propData && Array.isArray(this.propData.data)) {
      this.tableData = this.propData.data;
    }
  }
  };
  </script>