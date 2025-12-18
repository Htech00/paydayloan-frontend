<template>
  <section class="P-info">
    <div class="cont1">
      <div class="left3">
        <div class="logo1">
          <img :src="VueLogo" alt="">
        </div>
        <div class="icons">
          <div>
            <a href="#" class="btn-amount"><img :src="img1" alt=""></a>
            <p>Amount</p>
          </div>
          <div>
            <a href="#" class="btn-loan-brkdwn"><img :src="img2" alt=""></a>
            <p>Loan Breakdown</p>
          </div>
          <div class="active">
            <a href="#" class="btn-info"><img :src="img3" alt=""></a>
            <p>Personal Information</p>
          </div>
          <div>
            <a href="#" class="btn-info2"><img :src="img4" alt=""></a>
            <p>Contact Information</p>
          </div>
          <div>
            <a href="#" class="btn-info3"><img :src="img5" alt=""></a>
            <p>Employment Information</p>
          </div>
        </div>
        <form class="info" @submit.prevent="submitForm">
        
          <div class="form-margin">
            <label for="title">Title<span class="text-red">*</span></label><br>
            <select name="" v-model="title" required>
              <option value="" selected>Select</option>
              <option value="Mr">Mr</option>
              <option value="Mrs">Mrs</option>
              <option value="Miss">Miss</option>
              <option value="Dr">Dr</option>
            </select>
          </div>

          

          <div v-if="methods.length" style="padding: 10px 20px; border-radius: 20px; background-color: lightgray; width: 100%;">
                <label for="bvn_method" style="font-weight: 900;">Select Preffered Method to Receive OTP<span class="text-red">*</span></label><br>
                <div v-for="item in methods" :key="item" style="text-align: left; margin-top: 10px;">
                  <label for="" style="text-align: left; " ><input type="radio" name="bvn_method" style="text-align: left;"  :value="item['method']"  v-model="bvnOtpMethod" @change="verifyBVNOtp"/> {{ item['hint'] }}</label>
                </div>
                <div v-if="bvnOtpMethod == 'alternate_phone'" style="margin-top: 10px;">
                  <label for="bvn_method" style="font-weight: 900;">Enter OTP Phone Number<span class="text-red">*</span></label><br>
                  <input type="text" v-model="alternatePhoneNumber" name="alternate_phone_number" @input="verifyBVNOtp" maxlength="11">
                </div>
          </div>
          <div v-if="otpSent" style="margin-top: 10px;">
              <label for="otp" >{{ otpHint ?? 'BVN OTP' }}<span class="text-red">*</span></label><br>

              <input type="number" id="otp" name="otp" required maxlength="6" v-model="otp" @input="validateBVN">

            </div>
          <label for="" id="" v-if="verifying" style="font-weight: bold; font-size: 11px; color: red;">{{ verifying }}</label>
          <div class="form-margin">

            <label for="First Name">First Name<span class="text-red">*</span></label><br>
            <input type="text" id="first-name" name="" required v-model="firstName">
          </div>
          
          <div class="form-margin">

            <label for="Last Name">Last Name<span class="text-red">*</span></label><br>
            <input type="text" id="last-name" name="" required v-model="lastName">
          </div>

          <div class="form-margin">

            <label for="Date">Date of Birth<span class="text-red">*</span></label><br>
            <input type="date" id="myDate" name="myDate" value="" required v-model="dateOfBirth">
          </div>

          <div class="form-margin">

            <label for="options">Gender<span class="text-red">*</span></label><br>
            <select id="gender" name="options" required v-model="gender">
              <option value="" disabled selected hidden></option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

           <div class="form-margin">
            <label for="nin">NIN<span class="text-red">*</span></label>
            <div style="margin-top: 10px;" >
              <input type="text" id="nin" name="nin" maxlength="11" v-model="nin">
            </div>
            
          </div>

          <div class="form-margin">
            <label for="bvn">BVN<span class="text-red">*</span></label>
            <div style="margin-top: 10px;" >
              <input type="number" id="bvn" name="bvn" required maxlength="11" v-model="bvn">
            </div>
            
          </div>

          <div class="form-margin">
            <label for="Referral">Referral Code</label><br>
            <input type="text" id="referral" name="">
            <div class="text-red">Loans with referral code will be processed faster</div>
          </div>

          <span class="bit">
            <router-link to="/apply-step2" class="prev">PREV</router-link>
            <button type="submit" class="Next">NEXT</button>
          </span>
        </form>
      </div>
      <div class="image1"></div>


    </div>



  </section>
</template>


<style scoped>
@import '@/assets/fonts/inter-webfont/style.css';
@import '@/styles.css';
</style>

<script setup>
import VueLogo from '../assets/credit-flex-logo.png';
import img1 from '../assets/amount-stepper-icon 1.svg'
import img2 from '../assets/breakdown-stepper-icon 1.svg'
import img3 from '../assets/personal-info-stepper-icon 1.svg'
import img4 from '../assets/contact-info-stepper-icon 1.svg'
import img5 from '../assets/employment-info-stepper-icon 1.svg'

import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useToast } from "vue-toastification";

const toast = useToast();

const router = useRouter();

const title = ref('')

const bvn = ref();

const nin = ref();

const otp = ref();

const verifying = ref('');

const otpHint = ref();

const bvnByPass = ref(false);

const bvnOtpMethod = ref();

const alternatePhoneNumber = ref();

const methods = ref([]);

const otpSent = ref(false);

const sessionId = ref();

const firstName = ref();

const lastName = ref();

const dateOfBirth = ref();

const gender = ref();


const baseUrl = 'http://192.168.1.46';

// const baseUrl = 'http://sapphire-loan.test';
// const baseURL = 'https://api-pro.sentiflex.com';

const apiKey = '6552a219-b30a-4764-95b4-d7996a74ed7c';

// Function to retrieve form data from sessionStorage and populate input fields
const populateFormFields = () => {
  const referralCode = document.getElementById('referral')

  const formData = JSON.parse(sessionStorage.getItem('formData'));
  if (formData) {
        nin.value = formData.nin || '';
    bvn.value = formData.bvn || '';
    otp.value = formData.otp || '';
    title.value = formData.title;
    if (otp.value) {
      otpSent.value = true;
    }
    firstName.value = formData.firstName || '';
    lastName.value = formData.lastName || '';
    dateOfBirth.value = formData.dateOfBirth || '';
    gender.value = formData.gender || '';
    referralCode.value = formData.referralCode || '';
  }
};

const verifyBVNOtp = async () => {
  if (bvnOtpMethod.value && (bvnOtpMethod.value != 'alternate_phone' || (alternatePhoneNumber.value && alternatePhoneNumber.value.length == 11))) {

    verifying.value = 'Sending BVN OTP, Please wait...';
    otpHint.value = '';
    otpSent.value = false;

    const validateForm = {
      bvn: bvn.value,
      sessionId: sessionId.value,
      method: bvnOtpMethod.value
    }

  if (alternatePhoneNumber.value) {
      validateForm['phone_number'] = alternatePhoneNumber.value
  }
   
    axios.post(`${baseUrl}/api/bvn/verify`, validateForm, {
      headers: {
        'x-sentinel-key': apiKey
      }
    }).then(response => {
      verifying.value = null;
      const data = response.data;
      if (data.status_code == "00") {
        otpHint.value = data.hint;
        // sessionId.value = data.sessionId;
        otpSent.value = true;
      } else {
        throw new Error(data.message);
      }
   
    }).catch((error) => {
            verifying.value = null;

        console.log("Bvn Validation failed", error.response);
        if(error.response.status == 422){
          toast.error(error.response.data.message);
        }
        else{
          toast.error('Initiate BVN failed!');
        }
      });
  }
  
};

const initiateBVN = async () => {
  bvnByPass.value = false;
  console.log('raaaaaaaaaaaaaa');
  if (bvn.value.toString().length == 11 && !verifying.value) {
        console.log('Ranca dede yesu');

    verifying.value = 'Initiating BVN validation, Please wait...';
    otpHint.value = '';
    otpSent.value = false;

    const validateForm = {
      bvn: bvn.value,
    }
   
    axios.post(`${baseUrl}/api/bvn/initiate`, validateForm).then(response => {
      verifying.value = null;
      const data = response.data;
      if (data.status_code == "00") {
        // otpHint.value = data.hint;
        // console.log('methods', JSON.parse(data.methods));
        // try {
        //   console.log('methods', JSON.parse(data.methods));
        //   methods.value = JSON.parse(data.methods);
        // } catch (e) {
        //   methods.value = [];
        // }
        
        sessionId.value = data.sessionId;
        methods.value = data.methods;

        bvnByPass.value = data.byPass;

        console.log('methods type', typeof methods.value);


        sessionId.value = data.sessionId;
        // otpSent.value = true;
      } else {
        throw new Error(data.message);
      }
   
    }).catch((error) => {
            verifying.value = null;

        console.log("Bvn Validation failed", error.response);
        if(error.response.status == 422){
          toast.error(error.response.data.message);
        }
        else{
          toast.error('Initiate BVN failed!');
        }
      });
  }
  
};

const validateBVN = async () => {
  if (otp.value.toString().length == 6) {
    verifying.value = 'Validating BVN, Please wait...';
    otpHint.value = '';

    const validateForm = {
      bvn: bvn.value,
      otp: otp.value,
      sessionId: sessionId.value
    }
   
    axios.post(`${baseUrl}/api/bvn/fetch`, validateForm, {
      headers: {
        'x-sentinel-key': apiKey
      }
    }).then(response => {
      verifying.value = null;
      const data = response.data;
      if (data.status_code === "00") {
              console.log('response data: ', response.data)

        
        firstName.value = data['data']['first_name'];
        lastName.value = data['data']['last_name'];
        gender.value = data['data']['gender'];
        dateOfBirth.value = data['data']['dob'];
      } else {
        throw new Error(data.message);
      }
   
    }).catch((error) => {
              verifying.value = null;

        console.log("User does not exist", error.response);
        if(error.response.status == 422 || (error.response.data.status_code && error.response.data.status_code == '14' )){
          toast.error(error.response.data.message);
        }
        else{
          toast.error('Validate BVN failed!');
        }
      });
  }
  
};


onMounted(() => {
  // Call populateFormFields on component mount
  populateFormFields();
});

const submitForm = () => {
  const bvn = document.getElementById('bvn')
  // const otp = document.getElementById('otp')
  // const sessionId = document.getElementById('sessionId')
  const firstName = document.getElementById('first-name')
  const lastName = document.getElementById('last-name')
  const dateOfBirth = document.getElementById('myDate')
  const gender = document.getElementById('gender')
  const referralCode = document.getElementById('referral')

  const formData = {
    bvn: bvn.value,
    nin: nin.value,
    otp: otp.value,
    sessionId: sessionId.value,
    title: title.value,
    firstName: firstName.value,
    lastName: lastName.value,
    dateOfBirth: dateOfBirth.value,
    gender: gender.value,
    referralCode: referralCode.value,
  };

  // Retrieve existing form data from sessionStorage
  const existingFormData = JSON.parse(sessionStorage.getItem('formData')) || {};

  // Merge the existing form data with the new form data
  const updatedFormData = { ...existingFormData, ...formData };

  // Store the updated form data in sessionStorage
  sessionStorage.setItem('formData', JSON.stringify(updatedFormData));

  // Redirect to the next page
  router.push('/apply-step4');
};
</script>