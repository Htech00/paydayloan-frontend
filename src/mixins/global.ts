import store from "@/store";

export default{
    namespaced: true,
    methods:{
        hasAnyPermission: function (permissions) {
          if(store.getters){
            const tokenData = store.getters['auth/token'];
            const allPermissions = tokenData['permissions'];
            let hasPermission = false;
            permissions.forEach(function(item){
              hasPermission = allPermissions?.includes(item)
            });
            return hasPermission;
          }else{
            return false;
          }
          
        },
        formatDate(dateString){
          const months = ["Jan", "Feb", "Mar","Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
          const current_datetime = new Date(dateString)
          return current_datetime.getDate() + " " + months[current_datetime.getMonth()] + " " + current_datetime.getFullYear()
        },
        formatDateTime(dateString){
          const months = ["Jan", "Feb", "Mar","Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
          const current_datetime = dateString ? new Date(dateString) : null
          return current_datetime ? current_datetime.getDate() + " " + months[current_datetime.getMonth()] + " " + current_datetime.getFullYear() +" " +current_datetime.toLocaleTimeString() : null
        },
        formatNumber(number){
          const formatter = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'NGN' });
          return formatter.format(number).substring(4);
        },
        sentenceCase(str) {
              return str.charAt(0).toUpperCase() + str.slice(1);
        },
        isOdd(num){
              return num % 2;
        }
      }
}