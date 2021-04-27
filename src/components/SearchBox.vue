<template>
  <div class="md:ml-12 py-6 md:py-0 search-box-wrapper">
    <div class="search-by-label">
        Search by
    </div>
    <TreeSelect
        v-model="searchBy"
        @change="updateSearchBy(searchBy)"
        :options="searchOptions"
        selectionMode="single"
        class="selector"
    />
    <span class="p-input-icon-right search-input">
        <InputText
          type="text"
          v-model="searchValue"/>
        <i class="i-icon search" />
    </span>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

/* Prime Components */
import TreeSelect from 'primevue/treeselect';
import InputText from 'primevue/inputtext';

/* Data */
import searchOptions from '../data/searchByOptions';

/* Types */
import { Keys } from '../data/types/types';

export default defineComponent({
  components: {
    TreeSelect,
    InputText,
  },
  setup(props, { emit }) {
    const searchValue = ref('');
    const searchBy = ref({ 0: true });

    const updateSearchBy = (value: Record<Keys, boolean>) => {
      emit('updateSearchBy', value);
    };

    watch(searchValue, newVal => {
      emit('updateSearchValue', newVal);
    });

    return {
      searchBy,
      updateSearchBy,
      searchOptions,
      searchValue,
    };
  },
});
</script>
<style lang="scss" scoped>

.search-box-wrapper {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
  font-weight: 500;

  @include mobile {
    border-radius: 12px 0 0 12px;
    display: flex;
    justify-content: center;
  }

  @include tablet {
    justify-content: flex-start;
  }

  .search-input {
    grid-column: 1/3;
  }

  .search-by-label {  // label styling
    height: 40px;
    width: 100%;
    border: 1px solid $lightGray;
    border-bottom-color: transparent;
    border-right-color: transparent;
    border-radius: 12px 0 0 0;
    padding: 0.5rem;
    cursor: default;

    @include mobile {
      border-radius: 12px 0 0 12px;
      border: 1px solid $lightGray;
      border-right-color: transparent;
      width: 130px;
      padding: 0.5rem 1rem;
    }
  }
}

</style>
