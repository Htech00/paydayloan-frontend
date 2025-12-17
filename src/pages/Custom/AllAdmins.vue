<template>
  <div>
    <BreadCrumb pageTitle="All Admins" />
    <div class="my-3 align-right" style="text-align: right;">
      <button class="invisible" id="createAdminModalButton" v-if="hasAnyPermission(['create-admin'])"
        data-bs-toggle="modal" data-bs-target="#createNewModal">Create Admin</button>
    </div>
    <CustomTable :propData="dataToPass" :callBack="moreRecords" :viewDetails="allItemActions" button-text="Edit"
      :headAction="mainAction" headActionText="Create Admin" />

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
                      Title
                    </label>
                    <select v-model="createForm.title" class="form-control shadow-none rounded-0 text-black">
                      <option value="">Select</option>
                      <option>Mr</option>
                      <option>Mrs</option>
                      <option>Miss</option>
                      <option>Pastor</option>
                      <option>Dr</option>
                      <option>Chief</option>
                    </select>
                  </div>
                </div>
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
                    <input type="email" v-model="createForm.email" required :disabled="createAdmin.editing"
                      class="form-control shadow-none rounded-0 text-black"
                      placeholder="e.g. 123@sapphirevirtual.com" />
                  </div>
                </div>
                <div class="col-lg-6 col-md-6">
                  <div class="form-group mb-15 mb-md-25">
                    <label class="d-block text-black fw-semibold mb-10">
                      Roles
                    </label>
                    <select class="form-control shadow-none rounded-0 text-black" v-model="createForm.roles" multiple
                      required>
                      <option value="">Select</option>
                      <option v-for="role in roles" :value="role.id" :key="role">{{ role.name }}</option>
                    </select>

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

    <!-- Confirm Reset Modal -->
    <div class="modal fade  modal-lg confirmResetModal" id="confirmResetModal" data-bs-keyboard="false" tabindex="-1"
      aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5">Approve Loan</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p class="fs-md-16 fs-lg-18">Are you sure you send a reset password link?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              Nevermind
            </button>
            <button type="button" data-bs-dismiss="modal" class="btn btn-success" @click="resetPassword">
              Send Link
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <button class="invisible" id="confirmResetModalButton" data-bs-toggle="modal"
    data-bs-target="#confirmResetModal"></button>
</template>

  <script>
  import { defineComponent } from "vue";
  
  import BreadCrumb from "../../components/Common/BreadCrumb.vue";
  import CustomTable from "@/components/Custom/CustomTable.vue";
  import Admin from "@/apis/Admin";
  import global from "@/mixins/global";
  import { useToast } from "vue-toastification";
  import User from "@/apis/User";

  const toast = useToast();
  
  export default defineComponent({
    name: "AllAdmins",
    components: {
      BreadCrumb,
      CustomTable,
    },
    computed: {
      allItemActions() {
        return [
          {
            'buttonText': 'Reset Password',
            'method': this.handleResetLink,
            'hasPermission': this.hasAnyPermission(['create-admin'])
          },
          {
            'buttonText': 'Edit Admin',
            'method': this.viewDetails,
            'hasPermission': this.hasAnyPermission(['edit-admin'])
          },
        ]
      }
    },
    data() {
      return {
        dataToPass: {
        }, // Define the dataToPass property
        roles: [],
        allUsers: [],
        resetPasswordForm: {
          email: null,
          processing: false
        },
        createForm: {
          id: null,
          title: null,
          first_name: null,
          last_name: null,
          email: null,
          editing: false,
          phone_number: null,
          roles: [],
          processing: false
        },
      };
    },
    mounted() {
      this.getUsers();
      Admin.getRoles().then(data => {
        this.roles = data.data.data;
      });

    },
    mixins: [global],
    methods: {
      handleResetLink(userId) {
        let user = this.allUsers.filter(e => e.id == userId);
        user = user[0]
        console.log('user:', user);

        this.resetPasswordForm.email = user.email;

        document.getElementById("confirmResetModalButton")?.click();

      },
      resetPassword() {
        this.resetPassword.processing = true;

        User.resetPassword(this.resetPasswordForm).then(() => {
          this.resetPassword.processing = false;

          toast.success('Reset password link has been sent to customer email');
        }).catch(error => {
          this.resetPassword.processing = false;

          if (error.response.status === 422) {
            toast.error(error.response.data.message);
            // this.errors = error.response.data.errors;
          }
        });  
      },
      mainAction() {
        this.createForm = {
          id: null,
          title: null,
          first_name: null,
          last_name: null,
          email: null,
          editing: false,
          phone_number: null,
          roles: [],
          processing: false
        };

        if(this.hasAnyPermission(['create-admin'])){
          document.getElementById('createAdminModalButton')?.click();
        }
      },
      viewDetails(userId){
        console.log('users role:',userId, this.allUsers);

          let user = this.allUsers.filter(e => e.id == userId);
          user = user[0]
          console.log('users role:',userId, user);
          if(this.hasAnyPermission(['create-admin'])){
            this.createForm.first_name = user.first_name;
            this.createForm.last_name = user.last_name;
            this.createForm.email = user.email;
            this.createForm.phone_number = user.phone_number;
            this.createForm.title = user.title;
            this.createForm.id = user.id;
            this.createForm.roles = user.roles.map(e => e.id);
            this.createForm.editing = true;
            document.getElementById("createAdminModalButton")?.click(); 
          }
      },
      getUsers(){
        Admin.getUsers("yes").then(data => {
          this.allUsers = data.data.data.data;

          this.retrieveRecords(data)
        });
      },
      createAdmin(){
        if(this.createForm.editing){
          this.createForm.processing = true;
          Admin.update(this.createForm).then((response) => {
            this.createForm.processing = false;
            toast.success('Admin Updated successfully');
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
        }else{
          Admin.create(this.createForm).then((response) => {
            this.createForm.processing = false;
            toast.success('Admin Created successfully');
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
        }
        
      },
      moreRecords(url, search){
        if(url != null && typeof url != undefined){
          Admin.getUsers("yes", search, url).then(data => {
            this.allUsers = data.data.data.data;

            this.retrieveRecords(data)
          });
        }

        if(search != null && typeof search != undefined){
          Admin.getUsers("yes", search).then(data => {
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
          item.roles.map((role) => role.name).join(' | '),
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
            "IPPIS",
            "Gender",
            "BVN",
            "Roles",
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
      },
      closeModal(modalId){
        document.getElementsByClassName(`${modalId}`)[0].classList.remove('show')
        document.getElementsByClassName(`${modalId}`)[0].removeAttribute('style');
        document.getElementsByClassName('modal-open')[0].removeAttribute('style');
        document.getElementsByClassName('modal-open')[0].classList.remove('modal-open')
        document.getElementsByClassName('modal-backdrop')[0].remove()
      }
    },
    
  });
  </script>