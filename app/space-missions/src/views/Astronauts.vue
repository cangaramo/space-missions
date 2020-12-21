<template>
  <div class="row px-3">
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
  </div>
</template>

<script>
import {
  GET_ASTRONAUTS,
  ADD_ASTRONAUT,
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
