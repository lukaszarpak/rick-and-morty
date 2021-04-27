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
    <span v-if="!isAllCharactersTab && !filteredCharacters.length">No favorite characters selected</span>
    <DataTable
      v-else-if="filteredCharacters.length && !loading && !error"
      :value="filteredCharacters"
      :rows="8"
      :paginator="true"
      paginatorTemplate="PrevPageLink PageLinks NextPageLink CurrentPageReport"
      @page="onPageChange($event)"
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
          field="id"
          header="Character ID"/>
        <Column
          field="name"
          header="Name"/>
        <Column
          field="gender"
          header="Gender">
          <template #body="slotProps">
            <div class="flex items-center">
              <i
                class="i-icon"
                :class="slotProps.data.gender.toLowerCase()"/>
              <span class="ml-1">{{ slotProps.data.gender }}</span>
            </div>
          </template>
        </Column>
        <Column
          field="species"
          header="Species"/>
        <Column
          field="episode"
          header="Last Episode"/>
        <Column
          field="add-to-favorites"
          header="Add To Favorites">
          <template #body="slotProps">
            <Button
                class="p-button-rounded p-mr-2"
                :class="slotProps.data.favorite ? 'is-favorite' : ''"
                @click="handleSelection(slotProps.data)"
                >
              <i class="i-icon star" />
            </Button>
          </template>
        </Column>
    </DataTable>
</template>
<script lang="ts">
/* eslint-disable */
import {
  defineComponent, ref, watch, computed, inject, Ref
} from 'vue';

/* Data */
import columnsSchema from '../data/columnsSchema'

/* Prime Components */
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';

/* Fetching data */
import { useQuery, useResult } from '@vue/apollo-composable';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const fetchCharactersQuery = require('../graphql/fetchCharacters.query.gql');

/* Types */
import { FetchedData } from '../types'

export default defineComponent({
  components: {
    DataTable,
    Column,
    Button,
  },
  setup() {
    /* Data */
    const searchBy: any = inject('searchBy', 'name'),
          searchValue: any = inject('searchValue'),
          isAllCharactersTab = ref(true),
          fetchedCharacters = ref<FetchedData[]>([]),
          favoriteCharacters = ref<FetchedData[]>([]);
    
    let pageNumber = 1,
        { result, loading, error, refetch } = useQuery(fetchCharactersQuery, { pageNumber }),
        queryResults = useResult(result, null, data => data.characters.results),
        currentPage = null,
        pageCount = null;


    /* Computed */
    watch(queryResults, () => {
        const fetchedData = queryResults.value.map((queryResult: FetchedData) => ({ ...queryResult, favorite: false, episode: queryResult.episode[queryResult.episode.length - 1].episode }));
        fetchedCharacters.value.push(...fetchedData)
    })

    watch(favoriteCharacters.value, () => {
      favoriteCharacters.value = favoriteCharacters.value.sort((a, b) => a.id - b.id)
    })

    const characters = computed(() => isAllCharactersTab.value ? fetchedCharacters.value : favoriteCharacters.value);

    const filteredCharacters = computed(() => {
      return Object.values(characters.value).filter((character: FetchedData) => {
        return (character as any)[searchBy.value].toLowerCase().includes(searchValue.value.toLowerCase())
      })
    })

    /*Methods */
    const findSelectedIndex = (selectedItem: FetchedData, charactersArray: Ref<FetchedData[]>) => charactersArray.value.findIndex((character: any) => character.id === selectedItem.id);

    const selectAllCharactersTab = (index: boolean) => {
      isAllCharactersTab.value = index;
    };

    const addToFavorites = (data: FetchedData) => {
      const index = findSelectedIndex(data, fetchedCharacters);
      fetchedCharacters.value[index].favorite = true;
      favoriteCharacters.value.push(fetchedCharacters.value[index]);
    };

    const removeFromFavorites = (data: FetchedData) => {
      const index = findSelectedIndex(data, fetchedCharacters);
      const favoriteCharacterIndex = findSelectedIndex(data, favoriteCharacters);
      fetchedCharacters.value[index].favorite = false;
      favoriteCharacters.value.splice(favoriteCharacterIndex, 1);
    };

    const handleSelection = (data: FetchedData) => {
      if (isAllCharactersTab.value) {
        return data.favorite ? removeFromFavorites(data) : addToFavorites(data);
      }
      return removeFromFavorites(data);
    };

    const onPageChange = (event: any) => {
      currentPage = event.page;
      pageCount = event.pageCount;

      if (pageCount - 1 === currentPage && isAllCharactersTab.value) {
        pageNumber++;
        refetch({ pageNumber })
      }
    }

    return {
      selectAllCharactersTab,
      isAllCharactersTab,
      columnsSchema,
      handleSelection,
      addToFavorites,
      removeFromFavorites,
      loading,
      error,
      filteredCharacters,
      onPageChange
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
