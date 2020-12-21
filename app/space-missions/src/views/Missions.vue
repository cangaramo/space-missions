<template>
  <div class="container">
    <div class="row">
      <div class="col-8">
        <h2 class="mb-4">Missions 🚀</h2>
        <div class="row">
          <div class="col-6 px-2 mb-4" v-for="(mission, index) in missions" :key="index">
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
              <button class="remove" @click="removeMission(mission.id)">
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-4 pl-5">
        <h2 class="mb-4">Add new Mission</h2>
        <form>
          <input type="text" placeholder="Name" v-model="new_mission.name" />
          <input
            type="text"
            placeholder="Insignia"
            v-model.number="new_mission.insignia"
          />
          <select v-model.number="new_mission.astronauts">
            <option value="null">Select astronaut</option>
            <option
              :value="astronaut.id"
              v-for="astronaut in astronauts"
              :key="astronaut.id"
            >
              {{ astronaut.name }}
            </option>
          </select>
          <input type="text" placeholder="Year" v-model="new_mission.year" />
          <input type="submit" @click.prevent="addMission" />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { GET_MISSIONS, GET_ASTRONAUTS } from "@/graphql/queries.js";
import { ADD_MISSION, DELETE_MISSION } from "@/graphql/mutations.js";

export default {
  name: "Home",
  data() {
    return {
      new_mission: {
        name: "",
        insignia: null,
        year: "",
        astronauts: null,
      },
    };
  },
  methods: {
    clearAstronaut() {
      this.new_astronaut = {
        name: "",
        picture: "",
      };
    },
    async addMission() {
      await this.$apollo.mutate({
        // Query
        mutation: ADD_MISSION,
        // Parameters
        variables: {
          name: this.new_mission.name,
          insignia: this.new_mission.insignia,
          date: this.new_mission.year.toString(),
          astronauts: [1, 2],
        },
        update: (store, { data: { addMission } }) => {
          const data = store.readQuery({ query: GET_MISSIONS });

          // Match names with astronaut ids
          const dataAstronauts = store.readQuery({ query: GET_ASTRONAUTS })
            .astronauts;
          addMission.astronauts.forEach(function(missionAstronaut, index) {
            dataAstronauts.forEach(function(astronaut) {
              if (astronaut.id == missionAstronaut) {
                addMission.astronauts[index] = astronaut.name;
              }
            });
          });

          data.missions.push(addMission);
          store.writeQuery({ query: GET_MISSIONS, data });
        },
      });
      this.clearMission();
    },
    async removeMission(id) {
      await this.$apollo.mutate({
        // Query
        mutation: DELETE_MISSION,
        // Parameters
        variables: {
          id: id,
        },
        update: (cache, { data: { deleteMission } }) => {
          const data = cache.readQuery({ query: GET_MISSIONS });
          data.missions = deleteMission;
          cache.writeQuery({ query: GET_MISSIONS, data });
        },
      });
    },
  },
  apollo: {
    astronauts: {
      query: GET_ASTRONAUTS,
    },
    missions: {
      query: GET_MISSIONS,
    },
  },
};
</script>
<style></style>
