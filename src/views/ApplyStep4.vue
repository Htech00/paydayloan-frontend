<template>
  <section class="Contact Information">

    <div class="cont2">
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
          <div>
            <a href="#" class="btn-info"><img :src="img3" alt=""></a>
            <p>Personal Information</p>
          </div>
          <div class="active">
            <a href="#" class="btn-info2"><img :src="img4" alt=""></a>
            <p>Contact Information</p>
          </div>
          <div>
            <a href="#" class="btn-info3"><img :src="img5" alt=""></a>
            <p>Employment Information</p>
          </div>
        </div>
        <form class="info2 form-margin" @submit.prevent="submitForm">
          <div class="form-margin">
            <label for="email">Email<span class="text-red">*</span></label><br>
            <input type="email" id="Email" name="" required>
          </div>

          <div class="form-margin">
            <label for="Phone">Phone Number<span class="text-red">*</span></label><br>
            <input type="tel" id="phone" name="phone" required>
          </div>
          <div class="form-margin">
            <label for="house-number">House Number<span class="text-red">*</span></label><br>
            <input type="text" id="house-number" name="" required>
          </div>
          <div class="form-margin">
            <label for="house-street">Street<span class="text-red">*</span></label><br>
            <input type="text" id="house-street" name="" required>
          </div>

          <div class="form-margin">
            <label for="city">City<span class="text-red">*</span></label><br>
            <input type="text" id="myCity" name="" value="" required><br><small>City is required!</small>
          </div>

          <div class="form-margin">

            <label for=">State of Residence">State of Residence<span class="text-red">*</span></label><br>
            <div>
              <select id="state"  class="form-padding" required>
                <option value="" disabled>Select State of Residence</option>
                <option v-for="statesLocation in statesLocations" :value="statesLocation.id" :key="statesLocation.id">{{
                  statesLocation.name }}</option>
              </select>
            </div>
          </div>

          <!-- <label for="zipcode">Zip Code</label><br>
          <input id="zipcode" class="zipcode" type="text" value=""><br><br> -->

          <div class="bit">
            <router-link to="/apply-step3" class="prev">PREV</router-link>
            <button type="submit" class="Next">NEXT</button>
          </div>
        </form>
      </div>
      <div class="image1">
      </div>
    </div>


  </section><br><br>
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

const router = useRouter();

const baseUrl = 'https://sapphire-api.digisparksolutions.ng';
// const baseUrl = 'https://api-pro.sentiflex.com';

// const baseUrl = "http://sapphire-loan.test";

const apiKey = '6552a219-b30a-4764-95b4-d7996a74ed7c';

// Function to populate form fields with stored data
const populateFormFields = () => {
  const formData = JSON.parse(sessionStorage.getItem('formData'));
  if (formData) {
    document.getElementById('Email').value = formData.email || '';
    document.getElementById('phone').value = formData.phone || '';
    document.getElementById('house-number').value = formData.houseNumber || '';
    document.getElementById('house-street').value = formData.houseStreet || '';
    document.getElementById('myCity').value = formData.city || '';
    document.getElementById('state').value = formData.state || '';
  }
};

const statesLocations = ref([]);

const fetchStates = async () => {
  try {
    const response = await fetch(`${baseUrl}/api/states`, {
      headers: {
        'x-sentinel-key': apiKey
      }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch banks data');
    }
    const data = await response.json();
    if (data.status_code === "00") {
      console.log('states data', data.data)
      statesLocations.value = data.data;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  // Call populateFormFields on component mount
  populateFormFields();

  fetchStates()
});

const submitForm = () => {
  const formData = {
    email: document.getElementById('Email').value,
    phone: document.getElementById('phone').value,
    houseNumber: document.getElementById('house-number').value,
    houseStreet: document.getElementById('house-street').value,
    city: document.getElementById('myCity').value,
    state: document.getElementById('state').value,
  };

  // Retrieve existing form data from sessionStorage
  const existingFormData = JSON.parse(sessionStorage.getItem('formData')) || {};

  // Merge the existing form data with the new form data
  const updatedFormData = { ...existingFormData, ...formData };

  // Store the updated form data in sessionStorage
  sessionStorage.setItem('formData', JSON.stringify(updatedFormData));

  // Redirect to the next page
  router.push('/apply-step5');
};
</script>
