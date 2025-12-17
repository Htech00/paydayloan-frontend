import store from "@/store";
import Api from "./Api";

export default {
  async apply(formData) {
    return Api.post(`/api/loan/apply`,formData,{
      headers: {
        'Content-Type': 'application/json' 
      }
    });
  },

  async allLoans() {
    const tokenData = store.getters['auth/token'];

    return Api.get("/api/admin/loans?filterStatus=&filterType", {
      headers: {
        Authorization: 'Bearer '+tokenData['token']
      }
    });
  },

  async topupLoans(url = null, search='',) {
    const tokenData = store.getters['auth/token'];

    return Api.get(url ?? `/api/admin/loans/top-up?q=${search}`, {
      headers: {
        Authorization: 'Bearer '+tokenData['token']
      }
    });
  },

  async moreRecords(url, search='', status='') {
    const tokenData = store.getters['auth/token'];

    return Api.get(url ?? `/api/admin/loans?q=${search}&filterStatus=${status}`, {
      headers: {
        Authorization: 'Bearer '+tokenData['token']
      }
    });
  },

  async pendingAuthorization() {
    const tokenData = store.getters['auth/token'];

    return Api.get("/api/admin/loans?filterStatus=pending_customer_confirmation&filterType", {
      headers: {
        Authorization: 'Bearer '+tokenData['token']
      }
    });
  },

  async offerSent() {
    const tokenData = store.getters['auth/token'];

    return Api.get("/api/admin/loans?filterStatus=confirmation_sent&filterType", {
      headers: {
        Authorization: 'Bearer '+tokenData['token']
      }
    });
  },

  async pendingApproval() {
    const tokenData = store.getters['auth/token'];

    return Api.get("/api/admin/loans?filterStatus=pending_approval&filterType", {
      headers: {
        Authorization: 'Bearer '+tokenData['token']
      }
    });
  },

  async pendingDeductionSetup() {
    const tokenData = store.getters['auth/token'];

    return Api.get("/api/admin/loans?filterStatus=pending_deduction_setup&filterType", {
      headers: {
        Authorization: 'Bearer '+tokenData['token']
      }
    });
  },

  async disbursed() {
    const tokenData = store.getters['auth/token'];

    return Api.get("/api/admin/loans?filterStatus=disbursed~completed~liquidated~pending_pickup&filterType", {
      headers: {
        Authorization: 'Bearer '+tokenData['token']
      }
    });
  },

  async pendingDisbursal() {
    const tokenData = store.getters['auth/token'];

    return Api.get("/api/admin/loans?filterStatus=pending_disbursement&filterType", {
      headers: {
        Authorization: 'Bearer '+tokenData['token']
      }
    });
  },

  async completed() {
    const tokenData = store.getters['auth/token'];

    return Api.get("/api/admin/loans?filterStatus=completed~liquidated&filterType", {
      headers: {
        Authorization: 'Bearer '+tokenData['token']
      }
    });
  },

  async rejected() {
    const tokenData = store.getters['auth/token'];

    return Api.get("/api/admin/loans?filterStatus=rejected&filterType", {
      headers: {
        Authorization: 'Bearer '+tokenData['token']
      }
    });
  },

  async loanDetails(id) {
    const tokenData = store.getters['auth/token'];

    return Api.get(`/api/admin/loans/${id}/details`, {
      headers: {
        Authorization: 'Bearer '+tokenData['token']
      }
    });
  },

  async loanTypes(){
    const tokenData = store.getters['auth/token'];

    return Api.get('/api/admin/loanTypes/all', {
      headers: {
        Authorization: 'Bearer '+tokenData['token']
      }
    });
  },

  async banks(){
    const tokenData = store.getters['auth/token'];

    return Api.get('/api/banks');
  },

  async affordabilityCheck(id) {
    const tokenData = store.getters['auth/token'];

    return Api.get(`/api/admin/loans/${id}/affordability`, {
      headers: {
        Authorization: 'Bearer '+tokenData['token']
      }
    });
  },

  async approve(id) {
    const tokenData = store.getters['auth/token'];


    return Api.put(`/api/admin/loans/${id}/approve`,{},{
      headers: {
        Authorization: 'Bearer '+tokenData['token']
      }
    });
  },

  async disburse(loan, formData) {
    const tokenData = store.getters['auth/token'];
    return Api.put(`/api/admin/loans/${loan}/disburse`,formData,{
      headers: {
        'Authorization': 'Bearer '+tokenData['token'],
        'Content-Type': 'application/json' 
      }
    });
  },

  async calculateOffer(formData) {
    const tokenData = store.getters['auth/token'];
    return Api.post('/api/admin/loans/offer/calculate',formData,{
      headers: {
        'Authorization': 'Bearer '+tokenData['token'],
        'Content-Type': 'application/json' 
      }
    });
  },

  async initiateDevicePickup(reference) {
    const tokenData = store.getters['auth/token'];
    return Api.get(`/api/admin/device/pickup/details?loan_reference=${reference}`,{
      headers: {
        'Authorization': 'Bearer '+tokenData['token'],
        'Content-Type': 'application/json' 
      }
    });
  },

  async sendDevicePickupOtp(reference) {
    const tokenData = store.getters['auth/token'];
    return Api.get(`/api/admin/device/pickup/send/otp?loan_reference=${reference}`,{
      headers: {
        'Authorization': 'Bearer '+tokenData['token'],
        'Content-Type': 'application/json' 
      }
    });
  },

  async confirmDevicePickup(formData) {
    const tokenData = store.getters['auth/token'];
    return Api.post('/api/admin/device/pickup/confirm', formData, {
      headers: {
        'Authorization': 'Bearer '+tokenData['token'],
        'Content-Type': 'application/json' 
      }
    });
  },

  async reject(id) {
    const tokenData = store.getters['auth/token'];

    return Api.put(`/api/admin/loans/${id}/reject`,{}, {
      headers: {
        Authorization: 'Bearer '+tokenData['token']
      }
    });
  },

  async uploadAuthorization(id, formData) {
    const tokenData = store.getters['auth/token'];

    return Api.post(`/api/admin/loans/authorization/${id}/upload`,formData,{
      headers: {
        Authorization: 'Bearer '+tokenData['token'],
        'Content-Type': 'multipart/form-data' 
      }
    });
  },


  async updateFile(id, formData) {
    const tokenData = store.getters['auth/token'];

    return Api.post(`/api/admin/loans/file/${id}/update`,formData,{
      headers: {
        Authorization: 'Bearer '+tokenData['token'],
        'Content-Type': 'multipart/form-data' 
      }
    });
  },
};