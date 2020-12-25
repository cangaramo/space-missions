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
        <h2 class="mb-4">Add new</h2>
        <form>
          <label>Name</label>
          <input type="text" placeholder="Apollo 11" v-model="new_mission.name" />
          <label>Insignia image</label>
          <input
            type="text"
            placeholder="https://upload.wikimedia.org/wikipedia/commons/2/27/Apollo_11_insignia.png"
            v-model.number="new_mission.insignia"
          />
          <label>Astronauts</label>
          <multiselect 
            v-model="selectedAstronauts"
            tag-placeholder="Add this as new tag" 
            placeholder="Search astronaut"
            label="name" track-by="code"
            :options="options"
            :multiple="true" 
            :taggable="true" 
            @tag="addTag">
          </multiselect>
          <label>Date</label>
          <input type="text" placeholder="July 1969" v-model="new_mission.date" />
          <label>Description</label>
          <textarea v-model="new_mission.description" placeholder="Short description of the mission"></textarea>
          <input type="submit" @click.prevent="addMission" />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { GET_MISSIONS, GET_ASTRONAUTS } from "@/graphql/queries.js";
import { ADD_MISSION, DELETE_MISSION } from "@/graphql/mutations.js";
import Multiselect from 'vue-multiselect'

export default {
  name: "Home",
  data() {
    return {
      new_mission: {
        name: "",
        insignia: null,
        date: "",
        description: '',
        astronauts: null,
      },
      selectedAstronauts: null,
      options: [],
    };
  },
  components: { 
    Multiselect 
  },
  created() {
    if (this.astronauts) {
      this.astronauts.forEach((astronaut) => {
        this.options.push({ name: astronaut.name, code: astronaut.id })
      });
      console.log(this.options);
    }
  },
  methods: {
    addTag (newTag) {
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
      }
      this.options.push(tag)
      this.value.push(tag)
    },
    clearMission() {
      this.new_mission = {
        name: "",
        insignia: null,
        date: "",
        description: '',
        astronauts: null,
      };
      this.selectedAstronauts = [];
    },
    async addMission() {
      // Astronauts ids
      const astronautsIds = []
      this.selectedAstronauts.forEach( (astronaut) => { 
       astronautsIds.push(astronaut.code);
      });
  
      await this.$apollo.mutate({
        // Query
        mutation: ADD_MISSION,
        // Parameters
        variables: {
          name: this.new_mission.name,
          insignia: this.new_mission.insignia,
          date: this.new_mission.date.toString(),
          description: this.new_mission.description,
          astronauts: astronautsIds,
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
      variables () {
        if (this.astronauts && this.options.length === 0) {
          this.astronauts.forEach((astronaut) => {
            this.options.push({ name: astronaut.name, code: astronaut.id })
          });
        }
        return {}
      },
    },
    missions: {
      query: GET_MISSIONS,
    },
  },
};
</script>
<style></style>
