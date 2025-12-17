<template>
  <section class="Employment Information">

    <div class="cont3">
      <div class="left4">
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
          <div>
            <a href="#" class="btn-info"><img :src="img3" alt=""></a>
            <p>Personal Information</p>
          </div>
          <div>
            <a href="#" class="btn-info2"><img :src="img4" alt=""></a>
            <p>Contact Information</p>
          </div>
          <div class="active">
            <a href="#" class="btn-info3"><img :src="img5" alt=""></a>
            <p>Employment Information</p>
          </div>
        </div>
        <form class="info3" @submit.prevent="submitForm">

          <div class="form-margin">
            <label for="Organisation">Organisation<span class="text-red">*</span></label><br>
            <input type="text" placeholder="Enter organization" v-model="organization" required>
          </div>

          <div class="form-margin">
            <label for="IPPIS">IPPIS Number<span class="text-red">*</span></label><br>
            <input type="number" id="IPPIS" name="" v-model="ippis" required>
          </div>

          <div class="form-margin">
            <label for="staff-id">Staff ID Image (formats: JPG, PNG, PDF)<span class="text-red">*</span></label><br>
            <input type="file" id="staff-id" accept=".jpg,.png,.jpeg,.pdf" name="staff-id" @change="handleStaffIdChange"
              required>
          </div>
          
          <div class="form-margin">
            <label for="valid-id">Valid ID Image (e.g. Passport, Drivers License, Voters card, etc.)<span class="text-red">*</span></label><br>
            <input type="file" id="valid-id" accept=".jpg,.png,.jpeg,.pdf" name="valid-id" @change="handleValidIdChange"
              required>
          </div>

          <div class="form-margin">
            <label for="Salary Bank Name">Salary Bank Name<span class="text-red">*</span></label>
            <div>
              <select id="bank-name" v-model="selectedBank" @change="validateAccount" class="form-padding" required>
                <option value="" disabled>Select Bank</option>
                <option v-for="bank in banks" :value="bank.code" :key="bank.code">{{ bank.name }}</option>
              </select>
            </div>
          </div>


          <div class="form-margin">
            <label for="Salary Bank Account">Salary Bank Account<span class="text-red">*</span></label><br>
            <input type="text" id="bank-account" v-model="accountNumber" name="" pattern="[0-9]{10}" @keyup="validateAccount"
              required>

              <p id="account-name" style="margin-top: 10px; font-weight: bold;">{{validatingAccount ? 'validating...' : accountName}}</p>
          </div>

          
          <div class="bit">
            <router-link to="/apply-step4" class="prev">PREV</router-link>
            <button id="submit-btn" type="submit" class="Submit" :disabled="validatingAccount || formProcessing">{{ formProcessing ? 'Please Wait...' : 'Submit'}}</button>
          </div>
        </form>


      </div>
      <div class="image1">
      </div>
    </div>



  </section>
</template>


<style scoped>
@import '@/assets/fonts/inter-webfont/style.css';
@import '@/styles.css';
</style>

<script setup>
import VueLogo from '../assets/credit-flex-logo.png';
import img1 from '../assets/amount-stepper-icon 1.svg';
import img2 from '../assets/breakdown-stepper-icon 1.svg';
import img3 from '../assets/personal-info-stepper-icon 1.svg';
import img4 from '../assets/contact-info-stepper-icon 1.svg';
import img5 from '../assets/employment-info-stepper-icon 1.svg';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from "vue-toastification";
import User from '@/apis/User';
import Loan from '@/apis/Loan';
import axios from 'axios';
import Api from '@/apis/Api';

const toast = useToast();

const router = useRouter();

// Define a ref to store the response from the API
const userDetails = ref({});

const banks = ref([]);
const organization = ref('');

const selectedBank = ref('');

const accountNumber = ref('');

const validatingAccount = ref('');

const formProcessing = ref(false);

const accountValid = ref(false);

const accountName = ref('');

const ippis = ref('');

const staffIdFile = ref();

const validIdFile = ref();

// const baseUrl = 'https://api-pro.sentiflex.com';
const baseUrl = 'https://sapphire-api.digisparksolutions.ng';

// const baseUrl = "http://sapphire-loan.test";

const apiKey = '6552a219-b30a-4764-95b4-d7996a74ed7c';

// Function to fetch banks data
const fetchBanks = async () => {
  console.log(User);
  
  axios.get(`${baseUrl}/api/banks`, {
      headers: {
        'x-sentinel-key': apiKey
      }
    }).then(response => {

      banks.value = response.data.data;
  }).catch((error) =>  {
      if(error.response.status == 422){
        toast.error(error.response.data.message);
      }else{
        toast.error('Something went wrong!');
      }
  });
};

const validateAccount = async () => {
  accountValid.value = false;
  const formData = JSON.parse(sessionStorage.getItem('formData'));

  // Check if the bank account number has exactly 10 digits
  if ((accountNumber.value.length !== 10 || isNaN(accountNumber.value)) || selectedBank.value == null) {
    // toast.error("Please enter a 10-digit numeric bank account number");
    accountName.value = '';
    return;
  }

  let filteredList = banks.value?.filter((e) => e.code == selectedBank.value && e.giro_code);

  if(!filteredList.length){
    accountName.value = '';
    return;
  }
  let bankCode = filteredList[0]['giro_code'];

  validatingAccount.value = true;

  const validateForm = {
      account_number: accountNumber.value,
      bank_code: bankCode
  }

  axios.post(`${baseUrl}/api/banks/account/validate`, validateForm, {
      headers: {
        'x-sentinel-key': apiKey
      }
    }).then(response => {
    accountValid.value = true;
    validatingAccount.value = false;
    accountName.value = response.data.data.accountName;
  }).catch((error) =>  {
    validatingAccount.value = false;

    if(error.response.status == 422){
      accountName.value = error.response.data.message
    }else{
      accountName.value = 'Invalid account number or bank'
    }
  });
}

const handleStaffIdChange = (event) => {
      const input = event.target;
      staffIdFile.value = input.files?.[0] || null;
      // this.previewImage();
}

const handleValidIdChange = (event) => {
      const input = event.target;
      validIdFile.value = input.files?.[0] || null;
      // this.previewImage();
}


const formData = JSON.parse(sessionStorage.getItem('formData'));


const loanData = {
  loan_type: parseInt(formData.loanType),
  product_id: formData.productId,
  bvn: formData.bvn,
  nin: formData.nin,
  otp: formData.otp,
  sessionId: formData.sessionId,
  organization: organization.value,
  amount: parseInt(formData.amount),
  address: formData.houseNumber +', '+ formData.houseStreet,
  city: formData.city,
  // zipcode: formData.zipcode,
  account_number: formData.bankAccount,
  bank_code: formData.bankCode,
  remita_bank_code: formData.remitaBankCode,
  state: parseInt(formData.state),
  reffered_by: formData.referralCode || '',
  user_id: userDetails.value?.id,
  tenor: formData.tenor
};


// Function to make a POST request to the loan application endpoint
const applyForLoan = async () => {
  try {
    // Extract form data from sessionStorage
    formProcessing.value = true;
    
    loanData.user_id = userDetails.value.id

    loanData.organization = organization.value

    loanData.account_number = accountNumber.value

    loanData.remita_bank_code = selectedBank.value;

    let filteredList = banks.value?.filter((e) => e.code == selectedBank.value && e.giro_code);

    if(filteredList.length){
      let bankCode = filteredList[0]['giro_code'];
      loanData.bank_code = bankCode.value
    }

    console.log('loanData', loanData);

    const formData = new FormData();
    formData.append("staff_id_file", staffIdFile.value);

    formData.append("valid_id_file", validIdFile.value);

    for (const key in loanData) {
      if (Object.hasOwn(loanData, key)) {
        formData.append(key, loanData[key] == undefined ? null : loanData[key]);
      }
    }


    axios.post(`${baseUrl}/api/loan/apply`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
          'x-sentinel-key': apiKey

      }
    }).then(response => {
      console.log(response.data);
      formProcessing.value = false;
      router.push('/application-complete');
    }).catch((error) =>  {
        formProcessing.value = false;
        console.log(error);
        if(error.response.status == 422){
          toast.error(error.response.data.message);
        }else{
          toast.error('Something went wrong!');
        }
    });

  } catch (error) {
    console.error('Error applying for loan:', error);
  }
};

// Function to register a new user
const registerUser = async (userData) => {
  console.log('register user', userData)
  try {
    User.register(userData).then(response => {
      userDetails.value = {id: response.data?.data.id}
      applyForLoan();
      // router.push('/application-complete');
    }).catch((error) =>  {
      console.log(error);
      formProcessing.value = false;
        if(error.response.status == 422){
          toast.error(error.response.data.message);
        }else{
          toast.error('Something went wrong!');
        }
    });
  }catch(e){
    console.log(e);
  }
}


// Function to retrieve form data from sessionStorage and register the user
const registerUserFromFormData = () => {
  try {
    // Retrieve form data from sessionStorage
    const formData = JSON.parse(sessionStorage.getItem('formData'));

    // Check if form data exists
    if (!formData) {
      throw new Error('Form data not found');
    }

    // Call registerUser function with the form data
    registerUser({
      title: formData.title,
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone_number: formData.phone,
      gender: formData.gender,
      date_of_birth: formData.dateOfBirth,
      ippis_number: formData.ippisNumber,
      bvn: formData.bvn,
      nin: formData.nin
    });

  } catch (error) {
    console.error('Error registering user from form data:', error);
  }
};

// Function to populate form fields with stored data
const populateFormFields = () => {
  const formData = JSON.parse(sessionStorage.getItem('formData'));
  if (formData) {
    
    ippis.value = formData.ippisNumber || '';
    selectedBank.value = formData.bankCode || '';
    accountNumber.value = formData.bankAccount || '';
    organization.value = formData?.organization || '';
  }
};

onMounted(() => {
  // Call populateFormFields on component mount
  populateFormFields();

  fetchBanks()
});

const submitForm = () => {
  const formData = {
    ippisNumber: ippis.value,
    bankCode: selectedBank.value,
    bankAccount: accountNumber.value,
    organization: organization.value,
  };

  // Retrieve existing form data from sessionStorage
  const existingFormData = JSON.parse(sessionStorage.getItem('formData')) || {};

  // Merge the existing form data with the new form data
  const updatedFormData = { ...existingFormData, ...formData };

  // Store the updated form data in sessionStorage
  sessionStorage.setItem('formData', JSON.stringify(updatedFormData));

  formProcessing.value = true;

  registerUserFromFormData();

};
</script>
