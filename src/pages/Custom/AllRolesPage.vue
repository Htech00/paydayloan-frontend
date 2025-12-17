<template>
    <div>
      <BreadCrumb pageTitle="All Roles" />
      <CustomTable :propData="dataToPass" :callBack="moreRecords" :viewDetails="viewDetails" button-text="Edit" :headAction="mainAction" headActionText="Create New Role" />
      <div
        class="modal fade createRole"
        id="createRole"
        tabindex="-1"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content p-15 p-md-40">
            <div class="modal-header d-block ps-0 pe-0 pt-0 pb-15 pb-md-25">
              <h5 class="modal-title fw-bold text-black">{{createForm.editing ? 'Editing Role' : 'Create New Role'}}</h5>
            </div>
            <div class="modal-body ps-0 pe-0 pb-0 pt-15 pt-md-25">
              <form @submit.prevent="createRole">
                <div class="row">
                 
                  <div class="col-lg-12 col-md-12">
                    <div class="form-group mb-15 mb-md-25">
                      <label class="d-block text-black fw-semibold mb-10">
                        Role Name
                      </label>
                      <input
                        type="text"
                        required
                        v-model="createForm.name"
                        class="form-control shadow-none rounded-0 text-black"
                        placeholder="Enter First Name"
                      />
                    </div>
                  </div>
                  
                  
                  <div class="col-lg-12 col-md-12">
                    <div class="form-group mb-15 mb-md-25">
                      <label class="d-block text-black fw-semibold mb-10">
                        Permissions
                      </label>
                      <select 
                        class="form-control shadow-none rounded-0 text-black"
                        v-model="createForm.permissions"
                        multiple
                        required
                      >
                        <option value="">Select</option>
                        <option v-for="item in permissions" :value="item.id" :key="item">{{ item.name }}</option>
                      </select>
                     
                    </div>
                  </div>
                  
                </div>
                <button
                  class="default-btn transition border-0 fw-medium text-white pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-35 pe-md-35 rounded-1 fs-md-15 fs-lg-16"
                  type="submit"
                  :disabled="createForm.processing"
                >
                  {{ createForm.processing ? "Please Wait..." : "Submit"}}
                </button>
              </form>
            </div>
            <button
              type="button"
              class="btn-close shadow-none"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
        
        </div>
        <button class="invisible" id="createRoleModalButton" data-bs-toggle="modal" data-bs-target="#createRole"></button>
      </div>
    </div>
    
  </template>
    
    <script>
    import { defineComponent } from "vue";
    
    import BreadCrumb from "../../components/Common/BreadCrumb.vue";
    import global from "@/mixins/global";
    import CustomTable from "@/components/Custom/CustomTable.vue";
    import { useToast } from "vue-toastification";
    import Admin from "@/apis/Admin";
  
  
    const toast = useToast();
  
    
    export default defineComponent({
      name: "AllRolesPage",
      components: {
        BreadCrumb,
        CustomTable,
      },
      mounted() {
        Admin.getPermissions().then(data => {
          this.permissions = data.data.data;
        });
        Admin.getRoles().then(data => {
          this.allRoles = data.data.data;
          this.retrieveRecords(data)
        });
  
      },
      data() {
        return {
          permissions: [],
          allRoles: [],
          createForm:{
            name: null,
            permissions: [],
            id: null,
            editing: false,
            processing: false
          },
          dataToPass: {
        }, // Define the dataToPass property
        };
      },
      mixins: [global],
      methods: {
        getRoles(){
            Admin.getRoles("yes").then(data => {
              this.allRoles = data.data.data;
              this.retrieveRecords(data)
            });
        },
        viewDetails(roleId){
          let role = this.allRoles.filter(e => e.id == roleId);
          role = role[0]
          if(this.hasAnyPermission(['create-role'])){
            this.createForm.name = role.name;
            this.createForm.id = role.id;
            this.createForm.permissions = role.permissions.map(e => e.id);
            this.createForm.editing = true;
            document.getElementById("createRoleModalButton")?.click(); 
          }
        },
        mainAction(){
            this.createForm.name = null;
            this.createForm.id = null;
            this.createForm.editing = false;
          if(this.hasAnyPermission(['create-role'])){
            document.getElementById("createRoleModalButton")?.click(); 
          }
          
        },
        createRole(){
          if(this.createForm.editing){
            this.createForm.processing = true;
                Admin.updateRole(this.createForm).then((response) => {
                  this.createForm.processing = false;
                  toast.success('Role Updated successfully');
                  this.closeModal('createRole');
                  this.getRoles();
                })
                .catch(error => {
                  this.createForm.processing = false;
        
                    if (error?.response?.status === 422) {
                    toast.error(error.response.data.message);
                    // this.errors = error.response.data.errors;
                    }
            });
          }else{
            this.createForm.processing = true;
                Admin.createRole(this.createForm).then((response) => {
                  this.createForm.processing = false;
                  toast.success('Role Created successfully');
                  this.closeModal('createRole');
                  this.getRoles();
                })
                .catch(error => {
                  this.createForm.processing = false;
        
                    if (error?.response?.status === 422) {
                    toast.error(error.response.data.message);
                    // this.errors = error.response.data.errors;
                    }
            });
          }
          
        },
        moreRecords(url){
          if(url != null && typeof url != undefined){
            Admin.getRoles().then(data => {
              this.allRoles = data.data.data;

              this.retrieveRecords(data)
            });
          }
        },
        async retrieveRecords (response) {
  
          const responseData = response.data; 
          const mappedData = responseData.data.map((item) => [
            item.name,
            this.formatDate(item.created_at),
            item.id
          ]);
          
          let linksData = responseData.data;
          // links.pop()
          // links.shift()
          this.dataToPass = {
            headers: [
              "Name",
              "Created At",
              "Action"
            ],
            data: [...mappedData],
            from: responseData.data.length,
            total: responseData.data.length,
            links: linksData.links,
          };
        },
        closeModal(modalClass){
          document.getElementsByClassName(`${modalClass}`)[0].classList.remove('show')
          document.getElementsByClassName(`${modalClass}`)[0].removeAttribute('style');
          document.getElementsByClassName('modal-open')[0].removeAttribute('style');
          document.getElementsByClassName('modal-open')[0].classList.remove('modal-open')
          document.getElementsByClassName('modal-backdrop')[0].remove()
        }
      },
      
    });
    </script>