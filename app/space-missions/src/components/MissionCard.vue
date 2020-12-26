<template>
  <div class="mission-card">
    <div class="top">
      <img :src="mission.insignia" />
      <div class="pl-4">
        <h4>{{ mission.name }}</h4>
        <p>📅 {{ mission.date }}</p>
      </div>
    </div>
    <p class="my-3">{{ mission.description }}</p>
    🧑‍🚀
    <router-link 
      v-for="(astronaut, index) in mission.astronauts" 
      :key="index"
      :to="`/astronaut/${astronaut.id}`"
    >
      {{ astronaut.name }}
    </router-link>
    <button class="remove" @click="$emit('removeMission', mission.id)">
      <i class="fas fa-times"></i>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    mission: Object,
  },
};
</script>

<style></style>
