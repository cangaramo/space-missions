import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueApollo from 'vue-apollo'
import ApolloClient from 'apollo-boost'

Vue.config.productionTip = false;

const apolloClient = new ApolloClient({
  // uri: 'https://api.spacex.land/graphql'
  uri: 'http://localhost:4000/graphql'
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

Vue.use(VueApollo)

new Vue({
  router,
  apolloProvider,
  render: h => h(App)
}).$mount("#app");
