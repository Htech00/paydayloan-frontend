import store from "@/store";
import Api from "./Api";

export default {
  async setupDeduction(loan) {
    const tokenData = store.getters['auth/token'];

    return Api.put(`/api/admin/loans/deduction/${loan}/setup`,{},{
      headers: {
        Authorization: 'Bearer '+tokenData['token'],
        'Content-Type': 'application/json' 
      }
    });
  },

  async repaymentMethods() {
    const tokenData = store.getters['auth/token'];

    return Api.get('/api/admin/repayment/methods', {
      headers: {
        Authorization: 'Bearer '+tokenData['token']
      }
    });
  },

  async manualRepayment(formData) {
    const tokenData = store.getters['auth/token'];

    return Api.post(`api/admin/deductions/repayment/manual`,formData,{
      headers: {
        'Content-Type': 'application/json',
         Authorization: 'Bearer '+tokenData['token']
      }
    });
  },

  async payments(status = '', url = null, search = '',  loanId = '', paymentMethod = '') {
    const tokenData = store.getters['auth/token'];

    return Api.get(url ?? `api/admin/deductions/payments?q=${search}&status=${status}&loanId=${loanId}&paymentMethodId=${paymentMethod}`, {
      headers: {
        Authorization: 'Bearer '+tokenData['token']
      }
    });
  },

  async statusOptions() {
    const tokenData = store.getters['auth/token'];
    return Api.get('/api/admin/credit/status-options', {
      headers: {
        Authorization: 'Bearer ' + tokenData['token']
      }
    });
  },

  async deductionSchedule(loan) {
    const tokenData = store.getters['auth/token'];

    return Api.get(`/api/admin/deductions/${loan}/schedule`, {
      headers: {
        Authorization: 'Bearer '+tokenData['token']
      }
    });
  },

  async pendingDeductions(url, search='') {
    const tokenData = store.getters['auth/token'];
    return Api.get((url ?? `/api/admin/deductions/pending?q=${search}`), {
      headers: {
        Authorization: 'Bearer '+tokenData['token']
      }
    });
  },

  async overdueDeductions(url, search='') {
    const tokenData = store.getters['auth/token'];
    return Api.get((url ?? `/api/admin/deductions/overdue?q=${search}`), {
      headers: {
        Authorization: 'Bearer '+tokenData['token']
      }
    });
  },

  async allDeductions(url, search='') {
    const tokenData = store.getters['auth/token'];
    return Api.get((url ?? `/api/admin/deductions/all?q=${search}`), {
      headers: {
        Authorization: 'Bearer '+tokenData['token']
      }
    });
  },

  async getPaymentMethods() {
    const tokenData = store.getters['auth/token'];

    return Api.get("api/admin/repayment/methods",  {
        headers: {
          Authorization: 'Bearer '+tokenData['token']
        }
      });
  },

  async uploadRepayments(formData) {
    const tokenData = store.getters['auth/token'];

    return Api.post('/api/admin/repayments/upload',formData,{
      headers: {
        Authorization: 'Bearer '+tokenData['token'],
        'Content-Type': 'multipart/form-data' 
      }
    });
  },

  async createDeduction(formData) {
    const tokenData = store.getters['auth/token'];

    return Api.post('api/admin/deductions/repayment/manual',formData,  {
        headers: {
          Authorization: 'Bearer '+tokenData['token']
        }
      });
  },

  async stopCollection(formData) {
    const tokenData = store.getters['auth/token'];

    return Api.post('api/admin/deductions/remita/stopLoanCollection',formData,  {
        headers: {
          Authorization: 'Bearer '+tokenData['token']
        }
      });
  },
};