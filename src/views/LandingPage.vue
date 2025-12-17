<template>
        <header>
        <div class="wrapper">
                <nav>
                    <div class="logo"><img :src="VueLogo" alt=""></div>

                    <ul>
                        <!-- <li>
                            <a href="#" class="oa">Our Approach</a>
                        </li>
                        <li>
                            <a href="#" class="au">About Us</a>
                        </li>
                        <li>
                            <a href="#" class="cu">Contact Us</a>
                        </li>  -->
                        <li>
                   
                            <router-link to="/apply-step1" class="btn-li">APPLY NOW</router-link>
                        </li>
                    </ul>
                    
                </nav>
        </div>
            <div class="hero-section">
                <div class="left"> 
                    <h1 >Lending <br> Money <br> Without <br> <span class="highlight">HESITATIONS!</span></h1> <br><br>
                    
                    <p>The harder you work for something, the greater <br>you’ll feel when you achieve it.</p><br>
                    
                    <router-link to="/apply-step1" class="btn-li">APPLY NOW</router-link>
                </div>
                <div class="bottom-row">
                    <div class="bottom">
                        <div class="item">
                            <strong id="strong1">24k+</strong>
                            <div class="subtext">
                                <p>Loans</p>
                                <p>Approved</p>
                            </div>
                        </div>
                    
                       <div class="item">
                                <strong id="strong1">24k+</strong>
                                <div class="subtext">
                                    <p>Loans</p>
                                    <p>Disbursed</p>
                                </div>
                         </div>

                        <div class="item">
                            <strong id="strong1">24k+</strong>
                            <div class="subtext">
                                <p>Loans</p>
                                <p>Disbursed</p>
                            </div>
                        </div>
                        
                    </div>
                    <br><br><br>
                    <div class="bottom2">
                        <span class="Partners">Our Partners:</span><br><br>
                        <div class="logo-container">
                            
                        
                                <img :src="img1" alt="" class="saphire">
                             <img :src="img2" alt="" class="Princeps">
               
                            
                        </div>
                    </div>
              
                   
                </div>
            </div>

  
    </header>

</template>

<style scoped>
@import '@/assets/fonts/inter-webfont/style.css';
@import '@/styles.css';
</style>

<script>
import VueLogo from '../assets/credit-flex-logo.png';
import img1 from '../assets/sapphire-white-logo-1024x588-1 1.svg';
import img2 from '../assets/Princeps Rectangle 5.svg';

export default {
  data() {
    return {
      VueLogo: VueLogo,
      img1,
      img2
    };
  }
};
</script>
