<template>
    <section class="Loan-Breakdown">
        <div class="contain2">
            <div class="left3">
                <div class="logo2">
                    <img :src="VueLogo" alt="">
                  </div>
                  <div class="icons">
                    <div >
                      <a href="#" class="btn-amount"><img :src="img1" alt=""></a><p>Amount</p>
                    </div>
                    <div class="active">
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
        
                <div class="two">
                    <div class="amount1">
                        <span>Amount</span>
                        <p>
                          <span>&#8358;</span><span id="displayAmount">0.00</span>
                        </p>
            
                        <span>Duration</span><p><span id="displayDuration">0</span></p>
            
                        <span>Monthly Repayment</span><p class="green"><span>&#8358;</span><span id="totalRepayment">0.00</span></p>
                    </div>
                    
                    
                    <div class="interest">
                      <span>Loan Start Date</span><p id="displayStartDate">Mar 15, 2024</p>
      
                      <span>Loan End Date</span><p id="displayEndDate">Nov 10, 2024</p>
      
                      <span>interest Per Month</span><p class="green"><span id="rate">0.00%</span></p>
                    </div>
                    </div>
                    <!-- <div class="term"> 
                        By submitting your loan application, you agree to the following terms: <br>Sapphire Virtual Networks Limited may verify employment, salary, loans, and relevant data from third-party sources. Approved loans will have installments deducted directly from your salary before crediting your account. In case of default, any outstanding balance may be recovered from linked accounts. Your consent is necessary for the Sentinel Flex Loan Application process, information verification, and automatic deductions. Please check the box below to confirm your consent. <br><br>You also acknowledge and accept our <a href="#">Privacy Policy</a> Privacy Policy and <a href="#">Loan Terms and Conditions</a>, accessible via provided links.
                    </div> -->
                    
                    <form @submit.prevent="submitForm" class="apply-form mt-1">
                      <div>
                          <label for="consent" class="consent"><input type="checkbox" id="consent2" name="consent" v-model="consent" required> I consent to the Sentinel Flex Loan Application process and terms outlined above.</label>
                      </div>

                      <div class="mt-1">
                        <router-link to="/apply-step1" class="prev">PREV</router-link>
                        <button type="submit" class="Next">NEXT</button>
                      </div>
                    </form>
                   
                        
                    
            </div>
            
            
                <div class="image1">
                    
                </div>
        </div>


        
    </section>
    <br><br>
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

import { onMounted, ref  } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const consent2 = ref(false);

// Function to populate form fields with stored data
const populateFormFields = () => {
  const formData = JSON.parse(sessionStorage.getItem('formData'));


  const rate = sessionStorage.getItem('rate')
  const insurance = sessionStorage.getItem('insurance')
  const fees = sessionStorage.getItem('fees')

  document.getElementById('rate').innerHTML = rate + "%"

  let totalRepayment
  let monthlyRepayment


  if (formData) {

    document.getElementById('consent2').checked = formData?.consent2 || false;
    const formattedAmount = parseFloat(formData?.amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    document.getElementById('displayAmount').innerHTML = formattedAmount;
    document.getElementById('displayDuration').innerHTML = formData?.tenor + " month(s)";

    const totalinterest = ((parseFloat(rate)/100)* parseFloat(formData?.amount) * parseFloat(formData?.tenor))
    const insuranceAmt = ((parseFloat(insurance)/100)* parseFloat(formData?.amount))

    totalRepayment = parseFloat(formData?.amount) + parseFloat(totalinterest) + parseFloat(insuranceAmt) + parseFloat(fees);

    monthlyRepayment = parseFloat(totalRepayment)/parseInt(formData?.tenor);

    const formattedNumber = monthlyRepayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });


    document.getElementById('totalRepayment').innerHTML = formattedNumber


    const currentDateObj = new Date();
const modifiedDateObj = new Date(currentDateObj);

// Add selected month to the current date
modifiedDateObj.setMonth(currentDateObj.getMonth() + parseInt(formData.tenor));

// Format modified date (for example: dd-mm-yyyy)
const currentDateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const modifiedDateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

const formattedCurrentDate = currentDateObj.toLocaleDateString(undefined, currentDateOptions);
const formattedModifiedDate = modifiedDateObj.toLocaleDateString(undefined, modifiedDateOptions);

// Display formatted dates
document.getElementById('displayStartDate').innerHTML = formattedCurrentDate;
document.getElementById('displayEndDate').innerHTML = formattedModifiedDate;


  }


 
};

onMounted(() => {
  // Call populateFormFields on component mount
  populateFormFields();
});

const submitForm = () => {

  const formData = {
    consent2: consent2.value,
  };

  // Retrieve existing form data from sessionStorage
  const existingFormData = JSON.parse(sessionStorage.getItem('formData')) || {};

  // Merge the existing form data with the new form data
  const updatedFormData = { ...existingFormData, ...formData };

  // Store the updated form data in sessionStorage
  sessionStorage.setItem('formData', JSON.stringify(updatedFormData));

  // Redirect to the next page
  router.push('/apply-step3');
};

</script>