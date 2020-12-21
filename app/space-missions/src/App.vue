<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Missions</router-link> |
      <router-link to="/astronauts">Astronauts</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss" src="@/scss/app.scss"></style>