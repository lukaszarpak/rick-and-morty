<template>
    <div class="py-8 select-table-data">
      <span
        class="mr-12"
        :class="selected === 0 ? 'selected' : ''"
        @click="select(0)">
        All Characters
      </span>
      <span
        :class="selected === 1 ? 'selected' : ''"
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
              class="p-button-rounded p-button-success p-mr-2"
              @click="addToFavorites(slotProps.data)"><i class="pi pi-star" /></Button>
          </template>
        </Column>
    </DataTable>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';

/* Prime Components */
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

/* Data */
import testData from '../data/test';

export default defineComponent({
  components: {
    DataTable,
    Column,
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

    return {
      select, selected, columnsSchema, characters,
    };
  },
});
</script>
<style lang="scss" scoped>
.select-table-data {
  font-weight: 500;
  display: flex;
  align-items: center;

  span {
    position: relative;
    color: #11B0C8;
    cursor: pointer;

    &.selected::after {
      content: '';
      display: block;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 3px;
      background-color: #11B0C8;
    }
  }

}
</style>
