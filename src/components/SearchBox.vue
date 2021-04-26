<template>
  <div class="md:ml-12 py-6 md:py-0 search-box-wrapper">
    <div class="search-by-label">
        Search by
    </div>
    <TreeSelect
        v-model="selectedSearchOption"
        :options="searchOptions"
        selectionMode="single"
        class="selector"
    />
    <span class="p-input-icon-right search-input">
        <InputText
          type="text"
          v-model="searchValue" />
        <i class="i-icon search" />
    </span>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';

/* Prime Components */
import TreeSelect from 'primevue/treeselect';
import InputText from 'primevue/inputtext';

/* Data */
import searchOptions from '../data/searchByOptions';

export default defineComponent({
  components: {
    TreeSelect,
    InputText,
  },
  setup() {
    const selectedSearchOption = ref({ 0: true });
    const searchValue = ref('');

    return {
      selectedSearchOption,
      searchValue,
      searchOptions,
    };
  },
});
</script>
<style lang="scss" scoped>

.search-box-wrapper {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 100%;

  @media screen and (min-width: 386px) {
    border-radius: 12px 0 0 12px;
    display: flex;
    justify-content: center;
  }

  @media screen and (min-width: 768px) {
    justify-content: flex-start;
  }

  .search-input {
    grid-column: 1/3;
  }

  .search-by-label {  // label styling
    height: 100%;
    border: 1px solid $lightGray;
    border-bottom-color: transparent;
    border-right-color: transparent;
    border-radius: 12px 0 0 0;
    padding: 0.5rem 1rem;
    cursor: default;
    width: 100%;

    @media screen and (min-width: 386px) {
      border-radius: 12px 0 0 12px;
      border: 1px solid $lightGray;
      border-right-color: transparent;
      width: 130px;
    }
  }
}

</style>
