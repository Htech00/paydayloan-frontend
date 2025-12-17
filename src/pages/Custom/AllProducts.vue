<template>
    <div>
        <BreadCrumb pageTitle="All Products" />
        <CustomTable :propData="dataToPass" :callBack="moreRecords" :headAction="mainAction" headActionText="Add Product" :viewDetails="allItemActions" button-text="Edit" />
            <div class="modal fade productDetailsModal" id="productDetailsModal" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content p-15 p-md-40">
                    <div class="modal-header d-block ps-0 pe-0 pt-0 pb-15 pb-md-25">
                        <h5 class="modal-title fw-bold text-black">Product Details</h5>
                    </div>
                    <div class="modal-body ps-0 pe-0 pb-0 pt-15 pt-md-25">
                        <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing lead-info-box">
                        <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30">
                            <div class="profile-info d-sm-flex align-items-center">

                            <div class="title mt-12 mt-sm-0">
                                <h5 class="text-black fw-medium mb-8">{{ productToDisplay?.name }}</h5>

                                <span class="d-block fw-bold text-primary"> N{{ formatNumber(productToDisplay?.price) }} </span>
                            </div>
                            </div>
                            <div class="border-top mt-15 mb-15 mt-sm-20 mb-sm-20 mt-md-25 mb-md-25 mt-lg-30 mb-lg-30"></div>
                            <div class="d-flex align-items-center justify-content-between">
                            <h5 class="fw-medium text-black-emphasis mb-0">Product Features</h5>
                            <!-- <a href="#" @click.prevent="closeModal('leadDetailsModal'); showUpdateStatus(leadToDisplay?.id)"
                                class="d-inline-block text-decoration-none lh-1 text-muted fw-medium">
                                <i class="ph-duotone ph-pencil text-black position-relative top-1 fs-16 me-1"></i>
                                Update Status
                            </a> -->
                            </div>
                                <ul class="info mt-25 ps-0 mb-0 list-unstyled row">
                                    <template v-for="(feature, key) in productToDisplay?.features" :key="feature">
                                        <li class="position-relative col-md-6">
                                            <div class="icon text-info rounded-circle text-center">
                                            <!-- <i class="flaticon-telephone-call"></i> -->
                                            </div>
                                            <span class="d-block text-black mb-5 fw-semibold">{{ key?.toUpperCase() }}</span>
                                            <span class="d-block fw-bold text-primary" >{{ feature }} </span>
                                        </li>
                                    </template>
                                </ul>
                            </div>
                            <h5 class="fw-medium text-black-emphasis mb-0">Product Images</h5>
                            <div class="col-md-12">
                                <div style="position: relative; overflow-x: scroll; white-space: nowrap; padding-left: 20px; padding-right: 20px;">
                                    <span style="position: absolute; left: 0; top: 40%; font-size: 30px;">&LeftAngleBracket;</span>
                                    <span style="position: absolute; right: 0; top: 40%; font-size: 30px;">&RightAngleBracket;</span>
                                    <li v-for="image in productToDisplay?.images" :key="image" style="width: 240px; padding: 10px; position: relative; display: inline-block;">
                                        <a href="#" style="position: absolute; top: 0; right: 0; height: 24px; width: 24px; padding: 5px; text-align: center; line-height: 14px; border-radius: 100%; background-color: red; color: lightgrey; text-decoration: none" data-bs-toggle="modal" data-bs-target="#deleteImageModal"  @click.prevent="imageToDelete = image.id">x</a>
                                        <img :src="image.product_image_url" alt="" class="img-fluid" >
                                    </li>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type="button" class="btn-close shadow-none" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                </div>
            </div>
            <button class="invisible" id="productDetailsModalButton" data-bs-toggle="modal"
                data-bs-target="#productDetailsModal"></button>
            
            <div class="modal fade createNewModal" id="createNewModal" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content p-15 p-md-40">
                        <div class="modal-header d-block ps-0 pe-0 pt-0 pb-15 pb-md-25">
                            <h5 class="modal-title fw-bold text-black">{{ createForm.editing ? 'Edit Admin' : 'Add New User' }}</h5>
                        </div>
                        <div class="modal-body ps-0 pe-0 pb-0 pt-15 pt-md-25">
                            <form @submit.prevent="createProduct">
                            <div class="row">
                                <div class="col-lg-6 col-md-6">
                                    <div class="form-group mb-15 mb-md-25">
                                        <label class="d-block text-black fw-semibold mb-10">
                                        Name
                                        </label>
                                        <input type="text" required v-model="createForm.name"
                                        class="form-control shadow-none rounded-0 text-black" placeholder="Enter Name" />
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6">
                                    <div class="form-group mb-15 mb-md-25">
                                        <label class="d-block text-black fw-semibold mb-10">
                                        Price
                                        </label>
                                        <input type="text" required v-model="createForm.price"
                                        class="form-control shadow-none rounded-0 text-black" placeholder="Enter Price" />
                                    </div>
                                </div>
                                <div class="col-lg-12 col-md-12">
                                    <div class="form-group mb-15 mb-md-25">
                                        <label class="d-block text-black fw-semibold mb-10">
                                        Description
                                        </label>
                                        <textarea type="text" required v-model="createForm.description"
                                        class="form-control shadow-none rounded-0 text-black" placeholder="Enter Description" ></textarea>
                                    </div>
                                </div>
                                
                                <div class="col-lg-6 col-xs-6">
                                        <div class="form-group mb-2">
                                            <label class="d-block text-black fw-semibold mb-10">
                                            Feature
                                            </label>
                                            
                                        </div>
                                    </div>
                                    <div class="col-lg-6 col-xs-6">
                                        <div class="form-group mb-2">
                                            <label class="d-block text-black fw-semibold mb-10">
                                            Value
                                            </label>
                                        </div>
                                    </div>
                                <div class="row" v-for="i in featureKeys.length" :key="i">
                                    <div class="col-lg-6 col-xs-6">
                                        <div class="form-group mb-2">
                                            <input type="text" v-model="featureKeys[i - 1]" required
                                            class="form-control shadow-none rounded-0 text-black"
                                            placeholder="Enter Feature" />
                                        </div>
                                    </div>
                                    <div class="col-lg-6 col-xs-6">
                                        <div class="form-group mb-2">
                                            <input type="text" v-model="featureValues[i - 1]" required
                                            class="form-control shadow-none rounded-0 text-black"
                                            placeholder="Enter Value" />
                                        </div>
                                    </div>
                                </div>

                                <div class="col-xs-12" style="text-align: right;">
                                    <button class="btn btn-sm btn-danger" @click="removeRow" type="button">Remove Row</button>
                                    <button class="ms-2 btn btn-sm btn-success me-20" @click="addRow" type="button">Add Row</button>
                                </div>
                                
                                <div class="col-lg-6 col-md-6">
                                    <div class="form-group mt-8 mb-15 mb-md-25">
                                        <label class="d-block text-black fw-semibold mb-10">
                                            <input type="checkbox" required :checked="createForm.active" v-model="createForm.active" value="1" class="text-black"/> Active
                                        </label>
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
            <button class="invisible" id="createNewModalButton" data-bs-toggle="modal"
                data-bs-target="#createNewModal"></button>
        </div>
        <div class="modal fade uploadImageModal" id="uploadImageModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content p-15 p-md-40">
                    <div class="modal-header d-block ps-0 pe-0 pt-0 pb-15 pb-md-25">
                        <h5 class="modal-title fw-bold text-black">Upload Image</h5>
                    </div>
                <div class="modal-body ps-0 pe-0 pb-0 pt-15 pt-md-25">
                    <product-image-upload :call-back="closeImageUploadModal" :product-id="selectedProductId"></product-image-upload>
                </div>
                <button type="button" class="btn-close shadow-none" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
            </div>
        </div>
        <button class="invisible" id="uploadImageModalButton" data-bs-toggle="modal"
        data-bs-target="#uploadImageModal"></button>

        <!-- Confirm Delete Image Modal -->
        <div class="modal fade modal-lg" id="deleteImageModal" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5">Delete Image</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p class="fs-md-16 fs-lg-18">Are you sure you want to delete this image?</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                    Nevermind
                    </button>
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="deleteImage">
                    Delete
                    </button>
                </div>
                </div>
            </div>
        </div>
    </div>
  </template>
  
  <script>
  import { defineComponent } from "vue";
  
  import BreadCrumb from "../../components/Common/BreadCrumb.vue";
  import CustomTable from "@/components/Custom/CustomTable.vue";
  import global from "@/mixins/global";
  import Product from "@/apis/Product";
  import { useToast } from "vue-toastification";
  import ProductImageUpload from "./Partials/ProductImageUpload.vue";

  const toast = useToast();
  
  export default defineComponent({
    name: "AllProductsPage",
    components: {
      BreadCrumb,
      CustomTable,
      ProductImageUpload
    },
    mounted() {

      console.log('mounted successfully')
      this.getProducts();

    },
    
    mixins: [global],
    methods: {
      moreRecords(url, search){

        if(url != null && typeof url != undefined){
          Product.allProducts(search, url).then(data => {
            this.allProducts = data.data;
            this.retrieveRecords(data)
          });
        }

        if(search != null && typeof search != undefined){
          Product.allProducts(search).then(data => {
            this.allProducts = data.data;
            this.retrieveRecords(data)
          });
        }
      },
      getProducts() {
        Product.allProducts().then(data => {
            this.allProducts = data.data;
            this.retrieveRecords(data)
        });
      },
      mainAction() {
        this.featureKeys = ['']
        this.featureValues = ['']
        this.createForm = {
          id: null,
          name: null,
          description: null,
          price: null,
          active: 1,
          features: {},
          editing: false,
          processing: false
        };

        if(this.hasAnyPermission(['create-admin'])){
          document.getElementById('createNewModalButton')?.click();
        }
      },
      async retrieveRecords (response) {

        const responseData = response.data; 
        const mappedData = responseData.data.data.map((item) => [
          item.name,
          item.description,
          this.formatNumber(item.price),
          item.active ? 'Active' : 'Deactivated',
          this.formatDate(item.created_at),
          item.id
        ]);
        
        let linksData = responseData.data;
        // links.pop()
        // links.shift()
        this.dataToPass = {
          headers: [
            "Name",
            "Description",
            "Price",
            "Status",
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
      removeRow() {
        if (this.featureKeys.length > 1) {
            this.featureKeys.pop();
            this.featureValues.pop();
        } 
      },
      addRow() {
        if (this.featureKeys.length < 8) {
            this.featureKeys.push('');
            this.featureValues.push('');
        } 
      },
      viewDetails(itemId){
          if (this.hasAnyPermission(['view-products'])) {
          this.productToDisplay = this.allProducts.data.data.filter(e => e.id == itemId)[0];
          console.log(this.productToDisplay, itemId);
          document.getElementById("productDetailsModalButton")?.click(); 
        }
        
      },
      editProduct(productId){
        console.log('product id:',productId, this.allProducts);

          let product = this.allProducts.data.data.filter(e => e.id == productId);
          product = product[0]
          if (this.hasAnyPermission(['update-products'])) {
            console.log('product:',productId, product);
            this.createForm.name = product.name;
            this.createForm.description = product.description;
            this.createForm.price = product.price;
            this.createForm.active = product.active;
            this.createForm.id = product.id;
            this.featureKeys = Object.keys(product.features);
            this.featureValues = Object.values(product.features);
            this.createForm.features = product.features;
            this.createForm.editing = true;
            document.getElementById("createNewModalButton")?.click(); 
          }
      },
      createProduct(){
        if(this.createForm.editing){
          this.createForm.processing = true;
        
          let features = {};
          this.featureKeys.forEach((value, index) => {
            features[value] = this.featureValues[index]
          })
          
            this.createForm.features = features;

            console.log('edit form', this.createForm)
            Product.update(this.createForm).then((response) => {
                this.createForm.processing = false;
                toast.success('Product Updated successfully');
                this.closeModal('createNewModal');
                this.getProducts();
            })
            .catch(error => {
                this.createForm.processing = false;

                if (error.response.status === 422) {
                toast.error(error.response.data.message);
                // this.errors = error.response.data.errors;
                }
                this.closeModal('createNewModal')
            });
        } else {
            let features = {};
            this.featureKeys.forEach((value, index) => {
                features[value] = this.featureValues[index]
            })
          
            this.createForm.features = features;

            console.log('create form', this.createForm)
            Product.create(this.createForm).then((response) => {
                this.createForm.processing = false;
                toast.success('Product Created successfully');
                this.getProducts();
                this.closeModal('createNewModal')
            })
            .catch(error => {
                this.createForm.processing = false;

                if (error.response.status === 422) {
                    toast.error(error.response.data.message);
                // this.errors = error.response.data.errors;
                }
                this.closeModal('createNewModal')
            });
        }
        
      },
      addProductImage(productId) {
        this.selectedProductId = productId;
        console.log('product id', this.selectedProductId)
        document.getElementById("uploadImageModalButton")?.click();
      },
      closeImageUploadModal(modalName) {
          this.getProducts();
          this.closeModal(modalName)
      },
      deleteImage() {
        
         Product.deleteImage(this.imageToDelete).then((response) => {
            toast.success('Image deleted successfully');
            this.getProducts();
        })
        .catch(error => {
            this.createForm.processing = false;

            if (error.response.status === 422) {
                toast.error(error.response.data.message);
            // this.errors = error.response.data.errors;
            }
        });
      },
      closeModal(modalId = 'uploadLeadsModal'){
        document.getElementsByClassName(`${modalId}`)[0].classList.remove('show')
        document.getElementsByClassName(`${modalId}`)[0].removeAttribute('style');
        document.getElementsByClassName('modal-open')[0].removeAttribute('style');
        document.getElementsByClassName('modal-open')[0].classList.remove('modal-open')
        document.getElementsByClassName('modal-backdrop')[0].remove()
      }
    },
    data() {
      return {
        dataToPass: {
        }, // Define the dataToPass property
        productToDisplay: null,
        selectedProductId: null,
        imageToDelete: null,
        allProducts: [],
        featureKeys: [''],
        featureValues: [''],
        createForm: {
          id: null,
          name: null,
          description: null,
          price: null,
          active: 0,
          editing: false,
          features: null,
          processing: false
        },
      };
    },
    computed: {
      allItemActions() {
        return [
          {
            'buttonText': 'View Details',
            'method': this.viewDetails,
            'hasPermission': this.hasAnyPermission(['view-products'])
          },
          {
            'buttonText': 'Edit Product',
            'method': this.editProduct,
            'hasPermission': this.hasAnyPermission(['edit-products'])
          },
          {
            'buttonText': 'Add Product Image',
            'method': this.addProductImage,
            'hasPermission': this.hasAnyPermission(['edit-products'])
            },
        //   {
        //     'buttonText': 'View Images',
        //     'method': this.viewDetails,
        //     'hasPermission': this.hasAnyPermission(['edit-admin'])
        //   },
        ]
      }
    },
  });
  </script>