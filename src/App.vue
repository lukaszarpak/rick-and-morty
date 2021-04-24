<template>
  <header class="container-fluid border-b p-fixed">
    <nav class="container flex flex-col md:flex-row items-center py-2">
      <img
        class="w-full max-width-240 py-2"
        src="./assets/logo.png" />
      <SearchBox />
    </nav>
  </header>
  <main class="container">
    <Main />
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

/* Components */
import Main from './views/Main.vue';
import SearchBox from './components/SearchBox.vue';

export default defineComponent({
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
