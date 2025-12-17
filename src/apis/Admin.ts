import Api from "./Api";
import store from "@/store";

export default {
  async getRoles() {
    const tokenData = store.getters['auth/token'];

    return Api.get("api/admin/roles",  {
        headers: {
          Authorization: 'Bearer '+tokenData['token']
        }
      });
  },

  async getPermissions() {
    const tokenData = store.getters['auth/token'];

    return Api.get("api/admin/permissions",  {
        headers: {
          Authorization: 'Bearer '+tokenData['token']
        }
      });
  },

  async getWebAccess(formData) {
    const tokenData = store.getters['auth/token'];

    const resp = Api.post("api/admin/webAccessToken/issue", formData, {
        headers: {
          Authorization: 'Bearer '+tokenData['token']
        }
      });
      
    return resp;
  },

  async getUsers(isAdmin="no", search='', url=null) {
    const tokenData = store.getters['auth/token'];

    return Api.get(url ?? `api/admin/users?q=${search}&isAdmin=${isAdmin}`,  {
        headers: {
          Authorization: 'Bearer '+tokenData['token']
        }
      });
  },

  async create(formData) {
    const tokenData = store.getters['auth/token'];

    return Api.post('api/admin/user/create',formData,  {
        headers: {
          Authorization: 'Bearer '+tokenData['token']
        }
      });
  },

  async update(formData) {
    const tokenData = store.getters['auth/token'];

    return Api.patch(`api/admin/user/${formData.id}/update`,formData,  {
        headers: {
          Authorization: 'Bearer '+tokenData['token']
        }
      });
  },

  async userUpdate(formData) {
    const tokenData = store.getters['auth/token'];

    return Api.patch(`api/admin/user/profile/${formData.id}/update`,formData,  {
        headers: {
          Authorization: 'Bearer '+tokenData['token']
        }
      });
  },

  async createRole(formData) {
    const tokenData = store.getters['auth/token'];

    return Api.post('api/admin/roles/create',formData,  {
        headers: {
          Authorization: 'Bearer '+tokenData['token']
        }
      });
  },

  async updateRole(formData) {
    const tokenData = store.getters['auth/token'];

    return Api.patch(`api/admin/roles/${formData.id}/update`,formData,  {
        headers: {
          Authorization: 'Bearer '+tokenData['token']
        }
      });
  },
 
};