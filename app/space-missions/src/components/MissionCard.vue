<template>
  <div class="mission">
    <div class="top">
      <img :src="mission.insignia" />
      <div class="pl-4">
        <h4>{{ mission.name }}</h4>
        <p>📅 {{ mission.date }}</p>
      </div>
    </div>
    <p class="my-3">{{ mission.description }}</p>
    <p>🧑‍🚀 {{ mission.astronauts.join(", ") }}</p>
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
