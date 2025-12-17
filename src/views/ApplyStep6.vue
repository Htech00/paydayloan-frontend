<template>
    <section class="Employment Information">
        <div class="cont4">
            <div class="left5">
                <div class="logo1">
                    <img :src="VueLogo" alt="" width="180px" style="width:180px">
                  </div>
                  <div class="icons">
                    <div>
                      <a href="#" class="btn-amount"><img :src="img1" alt=""></a><p>Amount</p>
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
            
                <div class="congratulations">
                    <h3 id="congrats">Congratulations!</h3>
                    
                    <img :src="img6" alt="" width="257px" height="232px"><br><br><br>
            
                    <p>Your loan application has been successfully submitted, an email will be sent to you shortly.</p>
                </div><br><br>
            
                <div id="component">


                    <router-link @click="submitForm" to="/"><button class="thank">THANK YOU</button></router-link>
                </div>
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
  
  <script>
  import VueLogo from '../assets/credit-flex-logo.png';
import img1 from '../assets/amount-stepper-icon 1.svg'
import img2 from '../assets/breakdown-stepper-icon 1.svg'
import img3 from '../assets/personal-info-stepper-icon 1.svg'
import img4 from '../assets/contact-info-stepper-icon 1.svg'
import img5 from '../assets/employment-info-stepper-icon 1.svg'
import img6 from '../assets/10015447 1.png'


export default {
  data() {
    return {
        VueLogo: VueLogo,
      img1: img1,
      img2: img2,
      img3: img3,
      img4: img4,
      img5: img5,
      img6
    };
    
    },
    methods: {
      submitForm() {
        console.log('close this>>>>>>>>>>>');
        sessionStorage.setItem('formData', null);
      }
  }
};
  </script>