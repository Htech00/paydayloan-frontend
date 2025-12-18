<template>
  <section class="Amount">
    <div class="contain">
      <div class="left2">
        <div class="logo1">
          <img :src="VueLogo" alt="">
        </div>
        <div class="icons">
          <div class="active">
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
          <div>
            <a href="#" class="btn-info3"><img :src="img5" alt=""></a>
            <p>Employment Information</p>
          </div>
        </div>
        <div class="red">Instant Loans: Access funds within 30 minutes!</div>
        <form id="money" @submit.prevent="submitForm" class="apply-form">

          <div class="dropdown form-margin">
            <label for="options">Tenor<span class="text-red">*</span></label><br>
            <div class="dropdown-container">
              <select id="tenor" name="options" class="form-padding" required>
                <option value="" selected></option>
                <option value="1">1 month</option>
                <option value="2">2 months</option>
                <option value="3">3 months</option>
                <option value="4">4 months</option>
                <option value="5">5 months</option>
                <option value="6">6 months</option>
                <option value="7">7 months</option>
                <option value="8">8 months</option>
                <option value="9">9 months</option>
                <option value="10">10 months</option>
                <option value="11">11 months</option>
                <option value="12">12 months</option>
              </select>
            </div>
          </div>


          <div class="form-margin">
            <label for="Loan Type">Loan Type<span class="text-red">*</span></label><br>
            <select id="loan-type" v-model="selectedLoanType" class="form-padding" required @change="selectLoanType">
              <option value="" disabled>Select Loan Type</option>
              <option v-for="loanType in loanTypes" :value="loanType.id" :key="loanType.id">{{ loanType.cute_name }}
              </option>
            </select>
          </div>
          
          <div class="form-margin">
            <div v-if="selectedLoanType == 2">
              <label for="Products">Products<span class="text-red">*</span></label><br>
              <select v-model="selectedPhone" @change="selectPhoneType" class="form-padding" required>
                <option value="" disabled>Select</option>
                <option v-for="phoneName in phoneNames" :value="phoneName.id" :key="phoneName.id">{{ phoneName.name }}
                </option>
              </select>
            </div>
          </div>

          <div class="form-margin">

            <label for="name">Amount<span class="text-red">*</span></label><br>
            <div>
              <input type="text" id="amount" class="form-padding" v-model="selectedPhoneAmount" :readonly="selectedLoanType == 2" required><br>
            </div>
          </div>

          <p class="form-margin" style="margin-bottom: 0.6em;">By submitting your loan application, you agree to the following terms: <br>Sapphire Virtual Networks Limited
            may verify employment, salary, loans, and relevant data from third-party sources. Approved loans will have
            installments deducted directly from your salary before crediting your account. In case of default, any
            outstanding balance may be recovered from linked accounts. Your consent is necessary for the Sentinel Flex
            Loan Application process, information verification, and automatic deductions. Please check the box below to
            confirm your consent. <br>You also acknowledge and accept our <a href="#">Privacy Policy</a> Privacy
            Policy and <a href="#">Loan Terms and Conditions</a>, accessible via provided links.</p>
            
            <!-- <label for="consent" class="consent">
              <input type="checkbox" id="consent" name="consent" v-model="consent" required> I consent to the Sentinel Flex Loan Application process and terms outlined
            above.
          </label> -->
            
            <div class="mt-1">
              <router-link to="/" class="prev">BACK</router-link>
              <button class="Next" type="Next">APPLY NOW</button>
            </div>
          
        </form>
      </div>
      <div class="image1">
        <!-- You can uncomment this if you want to add an image -->
        <!-- <img src="Images/7xm 1.png" alt=""> -->
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

const consent = ref(false);

const router = useRouter();

const loanTypes = ref([]);
const selectedLoanType = ref('');

const phoneNames = ref([])
const selectedPhone = ref()


const selectedPhoneAmount = ref()

const baseUrl = 'http://192.168.1.46';
// const baseUrl = 'https://api-pro.sentiflex.com';

// const baseUrl = "http://sapphire-loan.test";

const apiKey = '6552a219-b30a-4764-95b4-d7996a74ed7c';

const selectPhoneType = () => {
  const phone = phoneNames.value.find(phone => phone.id === selectedPhone.value);
  console.log('phone.', phone);
  selectedPhoneAmount.value = phone.price ?? ''
};

const fetchLoanTypes = async () => {
  try {
    const response = await fetch(`${baseUrl}/api/loanTypes`, {
      headers: {
        'x-sentinel-key': apiKey
      }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch banks data');
    }
    const data = await response.json();
    if (data.status_code === "00") {
      loanTypes.value = data.data;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error(error);
  }
};

const selectLoanType = async () => {
  if (selectedLoanType.value == 2) {
    fetchProducts();
  }
}

const fetchProducts = async () => {
  try {
    const response = await fetch(`${baseUrl}/api/products/list`, {
      headers: {
        'x-sentinel-key': apiKey
      }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch products data');
    }
    const data = await response.json();
    console.log('data', data.data.data);
    if (data.status_code === "00") {
      phoneNames.value = data.data.data;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error(error);
  }
};


// Function to populate form fields with stored data
const populateFormFields = () => {
  const formData = JSON.parse(sessionStorage.getItem('formData'));
  if (formData) {

    document.getElementById('tenor').value = formData.tenor || '';
    document.getElementById('loan-type').value = formData.tenor || '';
    selectedLoanType.value = formData.phoneNames || '';

    // document.getElementById('consent').checked = formData.consent || false;
  }
};

onMounted(() => {
  // Call populateFormFields on component mount
  populateFormFields();

  fetchLoanTypes()



  fetchProducts()
});



const submitForm = () => {

  const selectedLoanType = loanTypes.value.find(loanType => loanType.id === parseInt(document.getElementById('loan-type').value));

  // Check if a loan type is selected
  if (!selectedLoanType) {
    // Handle case where no loan type is selected
    console.error('No loan type selected');
    return;
  }

  console.log('selectedLoanType', selectedLoanType.name)

  sessionStorage.setItem('rate', selectedLoanType.rate)
  sessionStorage.setItem('insurance', selectedLoanType.insurance)
  sessionStorage.setItem('fees', selectedLoanType.fees)


  const formData = {
    amount: document.getElementById('amount').value.replace(",", ""),
    tenor: document.getElementById('tenor').value,
    loanType: document.getElementById('loan-type').value,
    phoneNames: selectedLoanType.value,
    consent: consent.value,
    productId: selectedPhone.value
  };

  // Retrieve existing form data from sessionStorage
  const existingFormData = JSON.parse(sessionStorage.getItem('formData')) || {};

  // Merge the existing form data with the new form data
  const updatedFormData = { ...existingFormData, ...formData };

  // Store the updated form data in sessionStorage
  sessionStorage.setItem('formData', JSON.stringify(updatedFormData));

  // Redirect to the next page
  router.push('/apply-step2');
};
</script>