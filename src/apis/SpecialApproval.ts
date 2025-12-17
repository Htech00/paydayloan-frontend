import store from "@/store";
import Api from "./Api";

export default {
    async allSpecialApprovals(search='', url = null) {
        const tokenData = store.getters['auth/token'];
            return Api.get(url ?? `/api/admin/loans/special-approvals?q=${search}`, {
            headers: {
                Authorization: 'Bearer '+tokenData['token']
            }
        });
    },

    async create(formData) {
        const tokenData = store.getters['auth/token'];
            return Api.post('/api/admin/loans/special-approvals', formData, {
            headers: {
                Authorization: 'Bearer '+tokenData['token']
            }
        });
    },

    async deactivate(id) {
        const tokenData = store.getters['auth/token'];
            return Api.patch(`/api/admin/loans/special-approvals/${id}/deactivate`, {}, {
            headers: {
                Authorization: 'Bearer '+tokenData['token']
            }
        });
    },
}