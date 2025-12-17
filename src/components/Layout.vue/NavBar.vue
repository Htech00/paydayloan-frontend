<script setup>
import { ref, computed } from 'vue';
import { RouterLink } from 'vue-router';

const openSideBar = ref(false);
const showDropdown = ref(false);

const toggleDropdown = () => {
      showDropdown.value = !showDropdown.value;
};

const shouldShowToggleButton = computed(() => {
    return window.innerWidth < 768; 
});

const toggleSideBar = () => {
    openSideBar.value = !openSideBar.value;
}


window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
        openSideBar.value = true; 
    } else {
        openSideBar.value = false;
    }
});


if (window.innerWidth >= 768) {
    openSideBar.value = true; 
} else {
    openSideBar.value = false; 
}

</script>

<template>
    <div class="container">
        <!-- nav-bar -->
        <nav class="panel-header">
            <div class="nav-wrap">
                <div class="nav-left">
                    <button v-if="shouldShowToggleButton" class="sideBar-toggle" @click="toggleSideBar">☰</button>
                </div>
                <div class="nav-left">
                    <h3>Good morning, <span class="user-name">Justice</span></h3>
                </div>
                <div class="nav-right">
                    <p>Tue Mar 05 2024</p>
                    <button class="user-icon" @click="toggleDropdown">
                        <i class="fas fa-user"></i>
                        <div class="dropdown" v-if="showDropdown">
                            <!-- Dropdown content here -->
                            <ul>
                            <li><button>Notification</button></li>
                            <li><button>Edit Profile</button></li>
                            <li><button class="log-out">Log Out</button></li>
                            </ul>
                        </div>
                    </button>
                </div>
            </div>
        </nav>

        <!-- sideBar -->
        <aside :class="{ 'is-active': openSideBar }" class="sidebar">
            <div class="sidebar-header">
                <p class="sidebar-title">Princeps</p>
                <button class="close-button" @click="toggleSideBar">✖</button>
            </div>

            <div class="menu-list-container">
                <ul class="menu-list">
                    <li>
                        <router-link to="/dashboard" class="menu-link" active-class="active-link">Dashboard</router-link>
                    </li>
                    <li>
                        <router-link to="/loan" class="menu-link" active-class="active-link"><i class="fas fa-money-bill-wave"></i> Loan</router-link>
                    </li>
                    <li>
                        <router-link to="/creditAlert" class="menu-link" active-class="active-link"><i class="fas fa-credit-card"></i> Credit Alert</router-link>
                    </li>
                    <li>
                        <router-link to="/verifications" class="menu-link" active-class="active-link"><i class="fas fa-tasks"></i> Verification</router-link>
                    </li>
                    <li>
                        <router-link to="/deduction" class="menu-link" active-class="active-link"><i class="fas fa-donate"></i> Deductions</router-link>
                    </li>
                    <li>
                        <router-link to="/revenueAssurance" class="menu-link" active-class="active-link"><i class="fas fa-chart-line"></i> Revenue Assurance</router-link>
                    </li>
                    <li>
                        <router-link to="/reports" class="menu-link" active-class="active-link"><i class="fas fa-file-alt"></i> Reports</router-link>
                    </li>
                    <li>
                        <router-link to="/loanDiskOperation" class="menu-link" active-class="active-link"><i class="fas fa-database"></i> Loan Disk Operations</router-link>
                    </li>
                    <li>
                        <router-link to="/issuesLibrary" class="menu-link" active-class="active-link"><i class="fas fa-bug"></i> Issues Library</router-link>
                    </li>
                    <li>
                        <router-link to="/portalBalance" class="menu-link" active-class="active-link"><i class="fas fa-balance-scale"></i> Portal Balance</router-link>
                    </li>
                </ul>
            </div>
        </aside>
    </div>
</template>

