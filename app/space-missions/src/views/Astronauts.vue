<template>
  <div class="container">
    <div class="row">
      <div class="col-8 pr-4">
        <h2 class="mb-4">Astronauts 🧑‍🚀</h2>
        <div class="row">
          <div
            class="col-6"
            v-for="(astronaut, index) in astronauts"
            :key="index"
          >
            <div class="astronaut">
              <div class="img" :style="{ backgroundImage: `url(${astronaut.picture})` }"></div>
              <div class="pl-4">
                <h4 class="mt-4">{{ astronaut.name }}</h4>
                <p>{{ astronaut.nationality }}</p>
              </div>
              <button class="remove" @click="removeAstronaut(astronaut.id)">
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
          <input type="text" placeholder="Neil Armstrong" v-model="new_astronaut.name" />
          <label>Picture URL</label>
          <input
            type="text"
            placeholder="https://upload.wikimedia.org/wikipedia/commons/0/0d/Neil_Armstrong_pose.jpg"
            v-model.number="new_astronaut.picture"
          />
           <label>Nationality</label>
          <input type="text" placeholder="American" v-model="new_astronaut.nationality" />
          <input type="submit" @click.prevent="addAstronaut" />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { GET_ASTRONAUTS } from "@/graphql/queries.js";
import { ADD_ASTRONAUT, DELETE_ASTRONAUT } from "@/graphql/mutations.js";

export default {
  name: "Home",
  data() {
    return {
      new_astronaut: {
        name: "",
        picture: "",
        nationality: "",
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
    async addAstronaut() {
      try {
        await this.$apollo.mutate({
          // Query
          mutation: ADD_ASTRONAUT,
          // Parameters
          variables: {
            name: this.new_astronaut.name,
            picture: this.new_astronaut.picture,
            nationality: this.new_astronaut.nationality,
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
  },
  apollo: {
    astronauts: {
      query: GET_ASTRONAUTS,
    },
  },
};
</script>

<style></style>
