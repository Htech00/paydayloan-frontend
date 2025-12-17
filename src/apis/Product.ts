import store from "@/store";
import Api from "./Api";

export default {
    async allProducts(search='', url = null) {
        const tokenData = store.getters['auth/token'];
            return Api.get(url ?? `/api/admin/products?q=${search}`, {
            headers: {
                Authorization: 'Bearer '+tokenData['token']
            }
        });
    },

    async create(formData) {
        const tokenData = store.getters['auth/token'];
            return Api.post('/api/admin/products/new', formData, {
            headers: {
                Authorization: 'Bearer '+tokenData['token']
            }
        });
    },

    async update(formData) {
        const id = formData.id;
        const tokenData = store.getters['auth/token'];
            return Api.put(`/api/admin/products/${id}/update`, formData, {
            headers: {
                Authorization: 'Bearer '+tokenData['token']
            }
        });
    },
    async createImage(productId, formData) {
        const tokenData = store.getters['auth/token'];
        const id = productId;
        return Api.post(`/api/admin/products/${id}/image/create`,formData,  {
            headers: {
              Authorization: 'Bearer '+tokenData['token']
            }
          });
    },
    async deleteImage(id) {
        const tokenData = store.getters['auth/token'];
    
        return Api.delete(`/api/admin/products/${id}/image/delete`,  {
            headers: {
              Authorization: 'Bearer '+tokenData['token']
            }
          });
    },
}