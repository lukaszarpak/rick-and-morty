<template>
    <div class="py-8 select-data-wrapper">
      <span
        class="mr-12"
        :class="!selected ? 'selected' : ''"
        @click="select(0)">
          All Characters
      </span>
      <span
        :class="selected  ? 'selected' : ''"
        @click="select(1)">
          Favorites
      </span>
    </div>
    <span v-if="loading">loading...</span>
    <span v-if="error">{{error}}</span>
    <DataTable
      v-if="allCharacters"
      :value="!selected ? allCharacters : favoriteCharacters"
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
            <!-- eslint-disable-next-line max-len -->
            <!-- eslint-disable-next-line max-len eslint-disable-next-line vue/max-attributes-per-line -->
            <Button :disabled="slotProps.data.selected && !selected" class="p-button-rounded p-mr-2" :class="selected ? 'is-favorite' : ''" @click="!selected ? addToFavorites(slotProps.data) : removeFromFavorites(slotProps.data)">
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

    const { result, loading, error } = useQuery(allCharactersQuery);
    // const allCharacters = useResult(result, null, data => data.characters.results);
    const queryResults = useResult(result, null, data => data.characters.results);
    const allCharacters = ref<Readonly<any>>([]);

    const selected = ref(0);
    const favoriteCharacters = ref<any[]>([]);

    const select = (index: number) => {
      selected.value = index;
    };

    const addToFavorites = (data: any) => {
      const index = allCharacters.value.findIndex((character: any) => character.id === data.id);
      allCharacters.value[index].selected = true;
      console.log(index);

      favoriteCharacters.value.push(allCharacters.value[index]);
    };
    const removeFromFavorites = (data: any) => {
      const index = allCharacters.value.findIndex((character: any) => character.id === data.id);
      allCharacters.value[index].selected = false;
      const index1 = favoriteCharacters.value.findIndex(character => character.id === data.id);
      favoriteCharacters.value.splice(index1, 1);
    };

    watch(queryResults, () => {
      // eslint-disable-next-line max-len
      allCharacters.value = queryResults.value.map((queryResult: any) => ({ ...queryResult, selected: false }));
      console.log(allCharacters.value);
    });

    return {
      select,
      selected,
      columnsSchema,
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
