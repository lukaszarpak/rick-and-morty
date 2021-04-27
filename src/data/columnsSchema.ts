import { ref, Ref } from 'vue';
import { IColumnsSchema } from './types/types';

export default ref([
  { field: 'id', header: 'Character ID' },
  { field: 'name', header: 'Name' },
  { field: 'gender', header: 'Gender' },
  { field: 'species', header: 'Species' },
  { field: 'last-episode', header: 'Last Episode' },
]) as Ref<IColumnsSchema[]>;
