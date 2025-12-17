<template>
    <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
      <div
        class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25"
      >
        <div class="d-sm-flex align-items-center">
      
        </div>
        <div class="d-flex align-items-center">
          <form class="search-box position-relative me-15">
            <input
              type="text"
              class="form-control shadow-none text-black rounded-0 border-0"
              placeholder="Search"
            />
            <button
              type="submit"
              class="bg-transparent text-primary transition p-0 border-0"
            >
              <i class="flaticon-search-interface-symbol"></i>
            </button>
          </form>
          <button
            class="dot-btn lh-1 position-relative top-3 bg-transparent border-0 shadow-none p-0 transition d-inline-block"
            type="button"
          >
            <i class="flaticon-dots"></i>
          </button>
        </div>
      </div>
      <div class="card-body p-15 p-sm-20 p-md-25">
        <div class="table-responsive">
          <table class="table text-nowrap align-middle mb-0">
            <thead>
              <tr>
                <!-- <th
                  scope="col"
                  class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 ps-0"
                >
                  Applicant Name
                </th>
                <th
                  scope="col"
                  class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
                >
                  Phone
                </th>
                <th
                  scope="col"
                  class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
                >
                  Amount
                </th>
                <th
                  scope="col"
                  class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
                >
                  Tenor
                </th>
                <th
                  scope="col"
                  class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
                >
                  Organisation Name
                </th>
                <th
                  scope="col"
                  class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
                >
                  Date Created
                </th>
                <th
                  scope="col"
                  class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
                >
                  STATUS
                </th>
                <th
                  scope="col"
                  class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 text-end pe-0"
                ></th> -->

                <th v-for="(header, index) in tableHeaders" :key="index" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 ps-0">
                  {{ header }}
                </th>
              </tr>
            </thead>
            <tbody>
              <!-- <tr>
                <th
                  class="shadow-none lh-1 fw-medium text-black-emphasis title ps-0"
                >
                  <div class="d-flex align-items-center">
                    <div class="form-check mb-0">
                      <input
                        class="form-check-input shadow-none"
                        type="checkbox"
                      />
                    </div>
                    <div class="d-flex align-items-center ms-5 fs-md-15 fs-lg-16">
                      <img
                        src="../../../assets/images/user/user3.jpg"
                        class="rounded-circle me-8"
                        width="24"
                        height="24"
                        alt="user"
                      />
                      J. Ronan
                    </div>
                  </div>
                </th>
                <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                  0914454536536
                </td>
                <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                  +1-222-463-6429
                </td>
                <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                  $ 100.00 USD
                </td>
                <td class="shadow-none lh-1 fw-medium text-muted">$ 00.00 USD</td>
                <td class="shadow-none lh-1 fw-medium text-muted">
                  18 Mar, 2023
                </td>
                <td class="shadow-none lh-1 fw-medium">
                  <span class="badge text-outline-success">Active</span>
                </td>
                <td
                  class="shadow-none lh-1 fw-medium text-body-tertiary text-end pe-0"
                >
                  <div class="dropdown">
                    <button
                      class="dropdown-toggle lh-1 bg-transparent border-0 shadow-none p-0 transition"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i class="flaticon-dots"></i>
                    </button>
                    <ul class="dropdown-menu">
                      <li>
                        <a
                          class="dropdown-item d-flex align-items-center"
                          href="javascript:void(0);"
                          ><i
                            class="flaticon-view lh-1 me-8 position-relative top-1"
                          ></i>
                          View</a
                        >
                      </li>
                      <li>
                        <a
                          class="dropdown-item d-flex align-items-center"
                          href="javascript:void(0);"
                          ><i
                            class="flaticon-pen lh-1 me-8 position-relative top-1"
                          ></i>
                          Edit</a
                        >
                      </li>
                      <li>
                        <a
                          class="dropdown-item d-flex align-items-center"
                          href="javascript:void(0);"
                          ><i
                            class="flaticon-delete lh-1 me-8 position-relative top-1"
                          ></i>
                          Delete</a
                        >
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
         -->
         <tr v-for="(row, rowIndex) in tableData" :key="rowIndex">
          <!-- Iterate over row to generate table cells -->
          <td v-for="(cell, cellIndex) in row" :key="cellIndex">
            {{ cell }}
          </td>
        </tr>    
        </tbody>
          </table>
        </div>
        <div
          class="pagination-area d-md-flex mt-15 mt-sm-20 mt-md-25 justify-content-between align-items-center"
        >
          <p class="mb-0 text-paragraph">
            Showing <span class="fw-bold">11</span> out of
            <span class="fw-bold">134</span> results
          </p>
          <nav class="mt-15 mt-md-0">
            <ul class="pagination mb-0">
              <li class="page-item">
                <a class="page-link" href="#" aria-label="Previous">
                  <i class="flaticon-chevron-1"></i>
                </a>
              </li>
              <li class="page-item">
                <a class="page-link active" href="#">1</a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">2</a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">3</a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#" aria-label="Next">
                  <i class="flaticon-chevron"></i>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "LoansList",
    props: ['propData'],

  data() {
    return {
      tableHeaders: [],
      tableData: []
    };
  },
  mounted() {
    // Populate tableHeaders array with propData
    console.log('Prop data received in ChildComponent:', this.propData);
    if (this.propData && Array.isArray(this.propData.headers)) {
      this.tableHeaders = this.propData.headers;
    }
    if (this.propData && Array.isArray(this.propData.data)) {
      this.tableData = this.propData.data;
    }
  }
  };
  </script>