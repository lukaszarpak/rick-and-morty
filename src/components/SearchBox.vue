<template>
  <div class="flex align-center md:ml-12 py-6 md:py-0">
    <div class="search-by-label">
        Search by
    </div>
    <TreeSelect
        v-model="selectedSearchOption"
        :options="searchOptions"
        selectionMode="single"
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
// label styling
.search-by-label {
  height: 100%;
  border: 1px solid #ced4da;
  border-right: none;
  border-radius: 12px 0 0 12px;
  padding: 0.5rem 1rem;
  cursor: default;
}

//select input styling
.p-treeselect  {
  border-right-color: transparent;
  border-radius: 0;
  width: 100px;
}

</style>
