<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="danger" class="mb-4">
      <b-container>
        <b-navbar-brand to="/" class="mr-3 d-flex align-content-center order-0"
          >CO<v-icon
            name="brands/vuejs"
            class="my-auto"
            scale="1.25"
          />ID19</b-navbar-brand
        >
        <div class="mx-auto order-2 order-lg-1">
          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav class="mx-auto">
              <li class="nav-item">
                <b-link to="/" class="nav-link text-white">Home</b-link>
              </li>
              <li class="nav-item">
                <b-link to="/map" class="nav-link text-white">Map</b-link>
              </li>
              <li class="nav-item">
                <b-link to="/about" class="nav-link text-white">About</b-link>
              </li>
            </b-navbar-nav>
          </b-collapse>
        </div>

        <b-navbar-brand
          class="mr-0 ml-3 d-flex align-content-center order-1 order-lg-1"
          href="https://github.com/kgkanatsios/covid-19-stats"
          target="_blank"
          >GitHub <v-icon name="brands/github" class="my-auto ml-1" scale="1.25"
        /></b-navbar-brand>
      </b-container>
    </b-navbar>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
