<template>
  <b-dropdown
    :text="currentCountry.name"
    :block="true"
    :no-flip="false"
    variant="dark"
    class="m-2"
    menu-class="w-100 countries-list overflow-auto"
  >
    <b-dropdown-item @click="setCurrentCountry(['Global', null])"
      >Global</b-dropdown-item
    >
    <b-dropdown-divider></b-dropdown-divider>
    <b-dropdown-item
      v-for="(country, index) in countryList"
      :key="index"
      @click="setCurrentCountry([country.name, country.alpha3Code])"
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
    })
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
