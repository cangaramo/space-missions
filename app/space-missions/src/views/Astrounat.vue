<template>
  <div class="astronaut-single" v-if="astronaut">
    <h4>{{ astronaut.name }}</h4>
    <p>{{ astronaut }}</p>
  </div>
</template>

<script>
import { GET_ASTRONAUT_BY_ID } from "@/graphql/queries.js";

export default {
  props: {
    id: String,
  },
  apollo: {
    astronaut: {
      query: GET_ASTRONAUT_BY_ID,
      variables() {
        return {
          id: parseInt(this.id),
        };
      },
    },
  },
};
</script>

<style lang="scss">
.astronaut-single {
  color: white;
}
</style>
