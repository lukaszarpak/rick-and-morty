<template>
  <header class="container-fluid border-b p-fixed">
    <nav class="container flex flex-col md:flex-row items-center py-2">
      <img
        class="w-full max-width-240 py-2"
        src="./assets/img/logo.png" />
      <SearchBox
        @updateSearchBy="updateSearchBy"
        @updateSearchValue="updateSearchValue"/>
    </nav>
  </header>
  <main class="container">
    <Main />
  </main>
</template>

<script lang="ts">
import {
  defineComponent, provide, ref, readonly, computed,
} from 'vue';

/* Components */
import Main from './views/Main.vue';
import SearchBox from './components/SearchBox.vue';

/* Types */
import { Keys } from './data/types/types';

export default defineComponent({
  setup() {
    const searchBy = ref<Record<number, boolean>>({ 0: true });
    const searchValue = ref<string>('');

    const updateSearchBy = (searchByValue: Record<Keys, boolean>) => {
      searchBy.value = searchByValue;
    };

    const updateSearchValue = (searchV: string) => {
      searchValue.value = searchV;
    };

    const computedSearchByValue = computed(() => {
      let searchByValue = '';
      switch (Object.getOwnPropertyNames(searchBy.value)[0]) {
        case '0':
          searchByValue = 'name';
          break;
        case '1':
          searchByValue = 'id';
          break;
        case '2':
          searchByValue = 'episode';
          break;
        default:
          break;
      }
      return searchByValue;
    });

    provide('searchBy', readonly(computedSearchByValue));
    provide('searchValue', readonly(searchValue));

    return {
      updateSearchBy,
      updateSearchValue,
    };
  },
  components: {
    Main,
    SearchBox,
  },
});
</script>
<style lang="scss" scoped>
.max-width-240 {
  max-width: 240px;
}
</style>
