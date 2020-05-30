<template>
  <div class="home">
    <b-container>
      <b-row class="mb-4">
        <b-col>
          <h1>COVID-19 Tracker</h1>
        </b-col>
      </b-row>
    </b-container>
    <b-container
      v-if="Object.entries(this.covidData).length > 0 || !covidAvailableStats"
    >
      <b-row class="mb-4">
        <b-col>
          <h3 class="text-center">
            <span class="text-capitalize font-weight-bold">{{
              currentCountry.name
            }}</span>
          </h3>
          <unavailable-alert v-if="!covidAvailableStats"></unavailable-alert>
        </b-col>
      </b-row>
      <b-row v-if="covidAvailableStats" class="mb-4">
        <b-col>
          <h4>{{ date }}</h4>
          <cards
            :confirmed="confirmed"
            :recovered="recovered"
            :deaths="deaths"
          ></cards>
        </b-col>
      </b-row>
      <b-row class="justify-content-md-center mb-4">
        <b-col col md="6">
          <countries-dropdown
            :currentCountry="currentCountry"
          ></countries-dropdown>
        </b-col>
      </b-row>
      <b-row v-if="covidAvailableStats" class="mb-4">
        <b-col>
          <chart></chart>
        </b-col>
      </b-row>
    </b-container>
    <b-container v-else>
      <div class="d-flex justify-content-center">
        <div class="spinner-border text-danger" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </b-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import Cards from "@/components/Cards.vue";
import Chart from "@/components/Chart.vue";
import UnavailableAlert from "@/components/UnavailableAlert.vue";
import CountriesDropdown from "@/components/countries/Dropdown.vue";

export default {
  name: "Home",
  data() {
    return {
      confirmed: 0,
      recovered: 0,
      deaths: 0,
      date: null
    };
  },
  components: {
    Cards,
    CountriesDropdown,
    Chart,
    UnavailableAlert
  },
  methods: {
    ...mapActions({
      fetchCountries: "fetchCountries",
      fetchCovidData: "fetchCovidData"
    })
  },
  computed: {
    ...mapGetters(["currentCountry", "covidData", "covidAvailableStats"])
  },
  watch: {
    covidData: {
      handler: function() {
        if (Object.entries(this.covidData).length === 0) {
          return;
        }
        let lastData = this.covidData.result[
          Object.keys(this.covidData.result)[
            Object.keys(this.covidData.result).length - 1
          ]
        ];
        this.confirmed = new Intl.NumberFormat().format(lastData.confirmed);
        this.recovered = new Intl.NumberFormat().format(lastData.recovered);
        this.deaths = new Intl.NumberFormat().format(lastData.deaths);
        this.date = Object.keys(this.covidData.result)[
          Object.keys(this.covidData.result).length - 1
        ];
      },
      deep: true
    },
    currentCountry: {
      handler: function() {
        this.fetchCovidData(
          this.currentCountry.name == "Global"
            ? null
            : this.currentCountry.alpha3Code
        );
      },
      deep: true
    }
  },
  created() {
    if (this.$router.currentRoute.name == "Country") {
      this.fetchCountries(this.$route.params.alpha3Code);
    } else {
      this.fetchCountries();
      this.fetchCovidData();
    }
  }
};
</script>
