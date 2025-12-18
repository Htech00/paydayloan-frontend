<template>
  <div class="row justify-content-center">
    <div class="col-md-10 col-lg-8 col-xl-9 col-xxl-8 col-xxxl-6">
      <div class="card mb-25 border-0 rounded-0 bg-white authentication-card">
        <div class="card-body letter-spacing">
          <h4 class="text-black fw-bold mb-0 text-center">
            Sign In To Your Account!
          </h4>
          <form @submit.prevent="login">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Email Address
              </label>
              <input
                type="email"
                class="form-control shadow-none rounded-0 text-black"
                placeholder="e.g. adam127704@gmail.com"
                v-model="form.email"
                autocomplete="email"
              />
            </div>
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Password
              </label>
              <input
                type="password"
                class="form-control shadow-none rounded-0 text-black"
                placeholder="**************"
                v-model="form.password"
                autocomplete="password"
              />
            </div>
            <div
              class="d-flex align-items-center justify-content-between mb-15 mb-md-20"
            >
              <div
                class="form-check form-check-primary mb-0 fs-md-15 fs-lg-16 text-muted lh-1"
              >
                <input
                  class="form-check-input shadow-none"
                  type="checkbox"
                  id="remember-me"
                />
                <label class="form-check-label" for="remember-me">
                  Remember Me
                </label>
              </div>
              <router-link
                to="/forgot-password"
                class="forgot-password-btn fs-md-15 fs-lg-16 text-decoration-none position-relative text-primary"
              >
                Forgot Password?
              </router-link>
            </div>
            <button
              class="default-btn transition border-0 fw-medium text-white rounded-1 fs-md-15 fs-lg-16 bg-success d-block w-100"
              type="submit"
              :disabled="processing"
              @click="login"
            >
              {{processing ? 'Please Wait...' : 'Sign In Now'}}
            </button>
            
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import User from '@/apis/User';
import { ref } from 'vue';
import { useToast } from "vue-toastification";
import { mapActions } from 'vuex'

const toast = useToast();

const processing = ref(false)

export default {
  name: 'LoginForm',
  data(){
      return {
          form:{
              email:"",
              password:""
          },
          errors: [],
          processing:false
      }
  },
  methods:{
        ...mapActions({
            signIn:'auth/login'
        }),
        async login(){
          if(!this.processing){
            this.processing = true;
            await User.logout();
            User.login(this.form)
                .then((response) => {

                  this.processing = false;
                  this.signIn(response.data)

            })
            .catch(error => {
              this.processing = false;

              if (error.response?.status === 422) {
                toast.error(error.response.data.message);
                this.errors = error.response.data.errors;
              }
            });
          }
          
        },
    }
}
</script>