/* Fetching data */
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { DefaultApolloClient } from '@vue/apollo-composable';

/* Base */
import { createApp, h, provide } from 'vue';
import PrimeVue from 'primevue/config';
import App from './App.vue';

/* UI components */
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';

/* Styles */
import './assets/scss/main.scss';
import './assets/tailwind.css';

const defaultClient = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache(),
});

createApp(
  {
    setup() {
      provide(DefaultApolloClient, defaultClient);
    },
    render() {
      return h(App);
    },
  },
)
  .use(PrimeVue)
  .mount('#app');
