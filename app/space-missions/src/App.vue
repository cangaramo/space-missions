<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Missions</router-link> |
      <router-link to="/astronauts">Astronauts</router-link>
    </div>
    <router-view />
  </div>
</template>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="scss" src="@/scss/app.scss"></style>
