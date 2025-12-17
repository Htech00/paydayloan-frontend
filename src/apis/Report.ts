import store from "@/store";
import Api from "./Api";

export default {
    async leadsTotals(filter='') {
        const tokenData = store.getters['auth/token'];
            return Api.get(`/api/admin/leads/count?filter=${filter}`, {
            headers: {
                Authorization: 'Bearer '+tokenData['token']
            }
        });
    },
}