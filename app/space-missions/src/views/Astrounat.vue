<template>
  <div class="container">
    <div class="astronaut-single-wrapper" v-if="astronaut">
      <div class="astronaut-single">
        <div class="row">
          <div class="col-md-8">
            <div class="info">
              <h4>{{ astronaut.name }}</h4>
              <div v-html="astronaut.short_bio"></div>
            </div>
          </div>
          <div class="col-md-4 order-first order-md-last">
            <div
              class="img"
              :style="{ backgroundImage: `url(${astronaut.picture})` }"
            ></div>
          </div>
        </div>
      </div>
    </div>
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

</style>
