<template>
    <div class="py-8 select-data-wrapper">
      <span
        class="mr-12"
        :class="isAllCharactersTab ? 'selected' : ''"
        @click="selectAllCharactersTab(true)">
          All Characters
      </span>
      <span
        :class="!isAllCharactersTab  ? 'selected' : ''"
        @click="selectAllCharactersTab(false)">
          Favorites
      </span>
    </div>
    <span v-if="loading">Loading data...</span>
    <span v-if="error">{{error}}</span>
    <DataTable
      v-if="allCharacters && !loading && !error"
      :value="isAllCharactersTab ? allCharacters : favoriteCharacters"
      :rows="8"
      :paginator="true"
      paginatorTemplate="PrevPageLink PageLinks NextPageLink"
      responsiveLayout="scroll">
        <Column
          field="image"
          header="Photo"
          >
          <template #body="slotProps">
            <img :src="slotProps.data.image" />
          </template>
        </Column>
        <Column
          v-for="col of columnsSchema"
          :field="col.field"
          :header="col.header"
          :key="col.field">
        </Column>
        <Column
          :exportable="false"
          field="add-to-favorites"
          header="Add To Favorites">
          <template #body="slotProps">
            <Button
                class="p-button-rounded p-mr-2"
                :class="slotProps.data.favorite ? 'is-favorite' : ''"
                @click="handleSelection(slotProps.data)">
              <i class="i-icon star" />
            </Button>
          </template>
        </Column>
    </DataTable>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

/* Prime Components */
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';

/* Fetching data */
import { useQuery, useResult } from '@vue/apollo-composable';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const allCharactersQuery = require('../graphql/allCharacters.query.gql');

export default defineComponent({
  components: {
    DataTable,
    Column,
    Button,
  },
  setup() {
    const columnsSchema = ref([
      { field: 'id', header: 'Character ID' },
      { field: 'name', header: 'Name' },
      { field: 'gender', header: 'Gender' },
      { field: 'species', header: 'Species' },
      { field: 'last-episode', header: 'Last Episode' },
    ]);

    const allCharacters = ref<Readonly<any>>([]);
    const isAllCharactersTab = ref(true);
    const favoriteCharacters = ref<any[]>([]);

    const { result, loading, error } = useQuery(allCharactersQuery);
    const queryResults = useResult(result, null, data => data.characters.results);

    watch(queryResults, () => {
      allCharacters.value = queryResults.value.map((queryResult: any) => ({ ...queryResult, favorite: false }));
    });

    const findSelectedIndex = (data: any) => allCharacters.value.findIndex((character: any) => character.id === data.id);

    const selectAllCharactersTab = (index: boolean) => {
      isAllCharactersTab.value = index;
    };

    const addToFavorites = (data: any) => {
      const index = findSelectedIndex(data);
      allCharacters.value[index].favorite = true;
      favoriteCharacters.value.push(allCharacters.value[index]);
    };

    const removeFromFavorites = (data: any) => {
      const index = findSelectedIndex(data);
      allCharacters.value[index].favorite = false;
      const favoriteCharacterIndex = favoriteCharacters.value.findIndex(character => character.id === data.id);
      favoriteCharacters.value.splice(favoriteCharacterIndex, 1);
    };

    const handleSelection = (data: any) => {
      if (isAllCharactersTab.value) {
        return data.favorite ? removeFromFavorites(data) : addToFavorites(data);
      }
      return removeFromFavorites(data);
    };

    return {
      selectAllCharactersTab,
      isAllCharactersTab,
      columnsSchema,
      handleSelection,
      addToFavorites,
      removeFromFavorites,
      allCharacters,
      loading,
      error,
      favoriteCharacters,
    };
  },
});
</script>
<style lang="scss" scoped>
.select-data-wrapper {
  font-weight: 500;
  display: flex;
  align-items: center;

  span {
    position: relative;
    color: $mainBlue;
    cursor: pointer;

    &.selected::after {
      content: '';
      display: block;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 3px;
      background-color: $mainBlue;
    }
  }
}
</style>
