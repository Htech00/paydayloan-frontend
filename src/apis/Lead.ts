import store from "@/store";
import Api from "./Api";

export default {
    async allLeads(search='', url = null) {
        const tokenData = store.getters['auth/token'];
            return Api.get(url ?? `/api/admin/leads/view-all-leads?q=${search}`, {
            headers: {
                Authorization: 'Bearer '+tokenData['token']
            }
        });
    },

    async pendingLeads(search='', url = null) {
        const tokenData = store.getters['auth/token'];
            return Api.get(url ?? `/api/admin/leads/list-by-account-officer?q=${search}`, {
            headers: {
                Authorization: 'Bearer '+tokenData['token']
            }
        });
    },

    async statusOptions() {
        const tokenData = store.getters['auth/token'];
            return Api.get('/api/admin/leads/status-options', {
            headers: {
                Authorization: 'Bearer '+tokenData['token']
            }
        });
    },
    async leadsByAccountOfficer(userId, filterStatus, search) {
        const tokenData = store.getters['auth/token'];
            return Api.get(`/api/admin/users/${userId}/view-leads-by-account-officer?q=${search}&filterStatus=${filterStatus}`, {
            headers: {
                Authorization: 'Bearer '+tokenData['token']
            }
        });
    },
    async upload(formData) {
        const tokenData = store.getters['auth/token'];
    
        return Api.post('/api/admin/leads/upload-lead',formData,  {
            headers: {
              Authorization: 'Bearer '+tokenData['token']
            }
          });
    },
    async updateStatus(formData) {
        const tokenData = store.getters['auth/token'];
    
        return Api.patch(`/api/admin/leads/${formData.leadId}/status/update`,formData,  {
            headers: {
              Authorization: 'Bearer '+tokenData['token']
            }
          });
    },
    async reAssign(formData) {
        const tokenData = store.getters['auth/token'];
    
        return Api.patch('/leads/reassign-lead',formData,  {
            headers: {
              Authorization: 'Bearer '+tokenData['token']
            }
          });
    },
}