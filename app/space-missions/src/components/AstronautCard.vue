<template>
  <div class="astronaut">
    <div
      class="img"
      :style="{ backgroundImage: `url(${astronaut.picture})` }"
    ></div>
    <div class="pl-4">
      <h4 class="mt-4">{{ astronaut.name }}</h4>
      <p>{{ astronaut.nationality }}</p>
    </div>
    <button class="remove" @click="this.$emit('removeAstronaut', astronaut.id)">
      <i class="fas fa-times"></i>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    astronaut: Object,
  },
};
</script>

<style></style>
