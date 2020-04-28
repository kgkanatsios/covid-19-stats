<template>
  <b-dropdown
    :text="currentCountry.name"
    :block="true"
    :no-flip="false"
    variant="dark"
    class="m-2"
    menu-class="w-100 countries-list overflow-auto"
  >
    <b-dropdown-item
      @click="
        setCurrentCountry(['Global', null]);
        updateBrowserUrl(['Global', null]);
      "
      >Global</b-dropdown-item
    >
    <b-dropdown-divider></b-dropdown-divider>
    <b-dropdown-item
      v-for="(country, index) in countryList"
      :key="index"
      @click="
        setCurrentCountry([country.name, country.alpha3Code]);
        updateBrowserUrl([country.name, country.alpha3Code]);
      "
    >
      <b-avatar variant="dark" :src="country.flag" class="mr-2"></b-avatar>
      {{ country.name }}
    </b-dropdown-item>
  </b-dropdown>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "CountriesDropdown",
  props: {
    currentCountry: Object
  },
  methods: {
    ...mapActions({
      setCurrentCountry: "setCurrentCountry"
    }),
    updateBrowserUrl([name, alpha3Code]) {
      this.$router.push(
        name == "Global"
          ? {
              name: "Home"
            }
          : {
              name: "Country",
              params: {
                alpha3Code: alpha3Code,
                name: name
              }
            }
      );
    }
  },
  computed: {
    ...mapGetters(["countryList"])
  }
};
</script>

<style lang="scss">
ul {
  &.countries-list {
    max-height: 300px !important;
  }
}
</style>
