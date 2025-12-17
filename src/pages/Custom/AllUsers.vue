<template>
<div>
    <BreadCrumb pageTitle="All Users" />
    <CustomTable :propData="dataToPass" :callBack="moreRecords" :viewDetails="viewDetails" buttonText="Edit" />
    <div class="modal fade createNewModal" id="createNewModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content p-15 p-md-40">
          <div class="modal-header d-block ps-0 pe-0 pt-0 pb-15 pb-md-25">
            <h5 class="modal-title fw-bold text-black">{{ createForm.editing ? 'Edit Admin' : 'Add New User' }}</h5>
          </div>
          <div class="modal-body ps-0 pe-0 pb-0 pt-15 pt-md-25">
            <form @submit.prevent="createAdmin">
              <div class="row">
                <div class="col-lg-6 col-md-6">
                  <div class="form-group mb-15 mb-md-25">
                    <label class="d-block text-black fw-semibold mb-10">
                      First Name
                    </label>
                    <input type="text" required v-model="createForm.first_name"
                      class="form-control shadow-none rounded-0 text-black" placeholder="Enter First Name" />
                  </div>
                </div>
                <div class="col-lg-6 col-md-6">
                  <div class="form-group mb-15 mb-md-25">
                    <label class="d-block text-black fw-semibold mb-10">
                      Last Name
                    </label>
                    <input type="text" required v-model="createForm.last_name"
                      class="form-control shadow-none rounded-0 text-black" placeholder="Enter Last Name" />
                  </div>
                </div>
                <div class="col-lg-6 col-md-6">
                  <div class="form-group mb-15 mb-md-25">
                    <label class="d-block text-black fw-semibold mb-10">
                      Phone No
                    </label>
                    <input type="text" required v-model="createForm.phone_number"
                      class="form-control shadow-none rounded-0 text-black" placeholder="e.g. 08061148035" />
                  </div>
                </div>
                <div class="col-lg-6 col-md-6">
                  <div class="form-group mb-15 mb-md-25">
                    <label class="d-block text-black fw-semibold mb-10">
                      Email
                    </label>
                    <input type="email" v-model="createForm.email" :disabled="createForm.editing"
                      class="form-control shadow-none rounded-0 text-black"
                      placeholder="e.g. 123@sapphirevirtual.com" />
                  </div>
                </div>
                <div class="col-lg-6 col-md-6">
                  <div class="form-group mb-15 mb-md-25">
                    <label class="d-block text-black fw-semibold mb-10">
                      Date of Birth
                    </label>
                    <input type="date" v-model="createForm.date_of_birth" required
                      class="form-control shadow-none rounded-0 text-black" />

                  </div>
                </div>

                <div class="col-lg-6 col-md-6">
                  <div class="form-group mb-15 mb-md-25">
                    <label class="d-block text-black fw-semibold mb-10">
                      BVN
                    </label>
                    <input type="text" v-model="createForm.bvn" required maxlength="11"
                      class="form-control shadow-none rounded-0 text-black" />

                  </div>
                </div>

                <div class="col-lg-6 col-md-6">
                  <div class="form-group mb-15 mb-md-25">
                    <label class="d-block text-black fw-semibold mb-10">
                      NIN
                    </label>
                    <input type="text" v-model="createForm.nin" required maxlength="11"
                      class="form-control shadow-none rounded-0 text-black" />
                  </div>
                </div>

              </div>
              <button
                class="default-btn transition border-0 fw-medium text-white pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-35 pe-md-35 rounded-1 fs-md-15 fs-lg-16"
                type="submit" :disabled="createForm.processing">
                {{ createForm.processing ? "Please Wait..." : "Submit"}}
              </button>
            </form>
          </div>
          <button type="button" class="btn-close shadow-none" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

      </div>
    </div>
    <button class="invisible" id="createAdminModalButton" v-if="hasAnyPermission(['edit-user'])"
        data-bs-toggle="modal" data-bs-target="#createNewModal">Create Admin</button>
</div>
  </template>
  
  <script>
  import { defineComponent } from "vue";
  
  import BreadCrumb from "../../components/Common/BreadCrumb.vue";
  import CustomTable from "@/components/Custom/CustomTable.vue";
  import Admin from "@/apis/Admin";
  import global from "@/mixins/global";
  import { useToast } from "vue-toastification";

  const toast = useToast();
  
  export default defineComponent({
    name: "AllUsers",
    components: {
      BreadCrumb,
      CustomTable,
    },
    mounted() {

      Admin.getUsers().then(data => {
                  this.allUsers = data.data.data.data;

        this.retrieveRecords(data)
      });

    },
    mixins: [global],
    methods: {
      viewDetails(userId){
        console.log('users id:',userId, this.allUsers);

        let user = this.allUsers.filter(e => e.id == userId);
        user = user[0]
        console.log('user');
          if(this.hasAnyPermission(['edit-user'])){
            this.createForm.first_name = user.first_name;
            this.createForm.last_name = user.last_name;
            this.createForm.email = user.email;
            this.createForm.phone_number = user.phone_number;
            this.createForm.title = user.title;
            this.createForm.date_of_birth = user.date_of_birth;
            this.createForm.bvn = user.bvn;
            this.createForm.nin = user.nin;
            this.createForm.id = user.id;
            this.createForm.editing = true;
            document.getElementById("createAdminModalButton")?.click(); 
        }
      },
      createAdmin(){
          this.createForm.processing = true;
          Admin.userUpdate(this.createForm).then((response) => {
            this.createForm.processing = false;
            toast.success('User Updated successfully');
            this.closeModal('createNewModal');
            this.getUsers();
          })
          .catch(error => {
            this.createForm.processing = false;

              if (error.response.status === 422) {
              toast.error(error.response.data.message);
              // this.errors = error.response.data.errors;
              }
          });      
      },
      getUsers(){
        Admin.getUsers().then(data => {
          this.allUsers = data.data.data.data;

          this.retrieveRecords(data)
        });
      },
      // async retrieveRecords (response) {

      //   const responseData = response.data; 
      //   const mappedData = responseData.data.data.map((item) => [
      //     item.name,
      //     item.email,
      //     item.phone_number,
      //     item.ippis_number,
      //     item.gender,
      //     item.bvn,
      //     item.roles.map((role) => role.name).join(' | '),
      //     this.formatDate(item.created_at),
      //     item.id
      //   ]);
        
      //   let linksData = responseData.data;
      //   // links.pop()
      //   // links.shift()
      //   this.dataToPass = {
      //     headers: [
      //       "Name",
      //       "Email",
      //       "Phone Number",
      //       "IPPIS",
      //       "Gender",
      //       "BVN",
      //       "Roles",
      //       "Date Created",
      //       "Action"
      //     ],
      //     data: [...mappedData],
      //     from: linksData.from,
      //     to: linksData.to,
      //     currentPage: linksData.current_page,
      //     total: linksData.total,
      //     previousPageUrl: linksData.prev_page_url,
      //     nextPageUrl: linksData.next_page_url,
      //     links: linksData.links,
      //   };
      // },
      closeModal(modalId){
        document.getElementsByClassName(`${modalId}`)[0].classList.remove('show')
        document.getElementsByClassName(`${modalId}`)[0].removeAttribute('style');
        document.getElementsByClassName('modal-open')[0].removeAttribute('style');
        document.getElementsByClassName('modal-open')[0].classList.remove('modal-open')
        document.getElementsByClassName('modal-backdrop')[0].remove()
      },
      moreRecords(url, search){

        if(url != null && typeof url != undefined){
          Admin.getUsers('no', search, url).then(data => {
            this.allUsers = data.data.data.data;
            this.retrieveRecords(data)
          });
        }

        if(search != null && typeof search != undefined){
          Admin.getUsers("false", search).then(data => {
            this.allUsers = data.data.data.data;
            this.retrieveRecords(data)
          });
        }
      },
      async retrieveRecords (response) {

        const responseData = response.data; 
        const mappedData = responseData.data.data.map((item) => [
          item.name,
          item.email,
          item.phone_number,
          item.ippis_number,
          item.gender,
          item.bvn,
          this.formatDate(item.created_at),
          item.id
        ]);
        
        let linksData = responseData.data;
        // links.pop()
        // links.shift()
        this.dataToPass = {
          headers: [
            "Name",
            "Email",
            "Phone Number",
            "IPPIS Number",
            "Gender",
            "BVN",
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
        allUsers: [],
        createForm: {
          id: null,
          title: null,
          first_name: null,
          last_name: null,
          date_of_birth: null,
          bvn: null,
          nin: null,
          email: null,
          editing: false,
          phone_number: null,
          processing: false
        },
      };
    },
  });
  </script>