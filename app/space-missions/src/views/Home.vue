<template>
  <div class="row px-3">
    <div class="col-3">
      <h2>Missions</h2>
      <div class="film" v-for="(mission, index) in missions" :key="index">
        <img :src="mission.insignia" />
        <div class="film-content">
          <router-link
            tag="h4"
            :to="{
              name: 'film',
              params: { id: mission.id },
            }"
          >
            {{ mission.name }}
          </router-link>
          <p>{{ mission.year }}</p>
          <div v-for="(missionAstronaut, index) in mission.astronauts" :key="index">
            <p>{{ missionAstronaut }}</p>
          </div>
        </div>
        <button class="remove" @click="removeMission(mission.id)">
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>
    <div class="col-3">
      <h2>Astronauts</h2>
      <div class="director" v-for="(astronaut, index) in astronauts" :key="index">
        <h4>{{ astronaut.name }}</h4>
        <p>{{ astronaut.country }}</p>
        <button class="remove" @click="removeAstronaut(astronaut.id)">
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>
    <div class="col-3 px-4">
      <h2>Add new Astronaut</h2>
      <form>
        <input type="text" placeholder="Name" v-model="new_astronaut.name" />
        <input
          type="text"
          placeholder="Picture"
          v-model.number="new_astronaut.picture"
        />
        <input type="submit" @click.prevent="addAstronaut" />
      </form>
    </div>
    <div class="col-3 px-4">
      <h2>Add new Mission</h2>
      <form>
        <input type="text" placeholder="Name" v-model="new_mission.name" />
        <input type="text" placeholder="Insignia" v-model.number="new_mission.insignia" />
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
</template>

<script>
import {
  GET_MISSIONS,
  GET_ASTRONAUTS,
  ADD_ASTRONAUT,
  ADD_MISSION,
  DELETE_MISSION,
  DELETE_ASTRONAUT,
} from "@/graphql/queries.js";

export default {
  name: "Home",
  data() {
    return {
      new_astronaut: {
        name: "",
        picture: "",
      },
      new_mission: {
        name: "",
        insignia: null,
        year: '',
        astronauts: null,
      },
    };
  },
  methods: {
    clearMission() {
      this.new_mission = {
        name: "",
        insignia: null,
        year: '',
        astronauts: null,
      };
    },
    clearAstronaut() {
      this.new_astronaut = {
        name: "",
        picture: "",
      };
    },
    async addAstronaut() {
      try {
        await this.$apollo.mutate({
          // Query
          mutation: ADD_ASTRONAUT,
          // Parameters
          variables: {
            name: this.new_astronaut.name,
            picture: this.new_astronaut.picture,
          },
          // Read and write the data from/to our cache for this query.
          update: (cache, { data: { addAstronaut } }) => {
            const data = cache.readQuery({ query: GET_ASTRONAUTS });
            data.astronauts.push(addAstronaut);
            cache.writeQuery({ query: GET_ASTRONAUTS, data });
          },
          //Optimistic UI
          // optimisticResponse: {
          //   __typename: "Mutation",
          //   addDirector: {
          //     __typename: "Director",
          //     id: this.directors.length,
          //     name: this.new_director.name,
          //     country: this.new_director.country,
          //     age: this.new_director.age,
          //   },
          // },
        });
        this.clearAstronaut();
      } catch (error) {
        console.log(error);
      }
    },
    async removeAstronaut(id) {
      await this.$apollo.mutate({
        // Query
        mutation: DELETE_ASTRONAUT,
        // Parameters
        variables: {
          id: id,
        },
        update: (store, { data: { deleteAstronaut } }) => {
          const data = store.readQuery({ query: GET_ASTRONAUTS });
          data.astronauts = deleteAstronaut;
          store.writeQuery({ query: GET_ASTRONAUTS, data });
        },
      });
    },
    async addMission() {
      await this.$apollo.mutate({
        // Query
        mutation: ADD_MISSION,
        // Parameters
        variables: {
          name: this.new_mission.name,
          insignia: this.new_mission.insignia,
          year: this.new_mission.year.toString(),
          astronauts: [1,2],
        },
        update: (store, { data: { addMission } }) => {
          const data = store.readQuery({ query: GET_MISSIONS });

          // Match names with astronaut ids
          const dataAstronauts = store.readQuery({ query: GET_ASTRONAUTS }).astronauts;
          addMission.astronauts.forEach(function (missionAstronaut, index) {
              dataAstronauts.forEach(function (astronaut) {
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="@/scss/home.scss"></style>

<style></style>
