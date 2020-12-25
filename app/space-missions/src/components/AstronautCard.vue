<template>
  <div class="astronaut-card">
    <div
      class="img"
      :style="{ backgroundImage: `url(${astronaut.picture})` }"
    ></div>
    <div class="pl-4">
      <router-link :to="`astronaut/${astronaut.id}`">
        <h4 class="mt-4">{{ astronaut.name }}</h4>
      </router-link>
      <p>{{ astronaut.nationality }}</p>
    </div>
    <button class="remove" @click="$emit('removeAstronaut', astronaut.id)">
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
