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
    <DataTable
      :value="characters"
      :rows="8"
      :paginator="true"
      paginatorTemplate="PrevPageLink PageLinks NextPageLink"
      responsiveLayout="scroll">
        <Column
          field="photo"
          header="Photo"
          >
          <template #body="slotProps">
            <img :src="slotProps.data.photo" />
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
              @click="addToFavorites(slotProps.data)">
              <i class="i-icon star" />
            </Button>
          </template>
        </Column>
    </DataTable>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';

/* Prime Components */
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';

/* Data */
import testData from '../data/test';

export default defineComponent({
  components: {
    DataTable,
    Column,
    Button,
  },
  setup() {
    const columnsSchema = ref([
      { field: 'character-id', header: 'Character ID' },
      { field: 'name', header: 'Name' },
      { field: 'gender', header: 'Gender' },
      { field: 'species', header: 'Species' },
      { field: 'last-episode', header: 'Last Episode' },
    ]);
    const characters = ref(testData);
    const selected = ref(0);

    const select = (index: number) => {
      selected.value = index;
    };

    const addToFavorites = () => {
      console.log('test');
    };

    return {
      select, selected, columnsSchema, characters, addToFavorites,
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
