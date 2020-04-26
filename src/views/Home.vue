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
            - <span class="font-italic">{{ date }}</span>
          </h3>
          <b-alert
            v-if="!covidAvailableStats"
            show
            dismissible
            variant="danger"
          >
            Not available statistics for this country!
          </b-alert>
        </b-col>
      </b-row>
      <b-row v-if="covidAvailableStats" class="mb-4">
        <b-col>
          <b-card-group deck>
            <b-card
              bg-variant="light"
              header="Confirmed Cases"
              class="text-center"
            >
              <b-card-text>
                <div class="mb-2 text-center">
                  <h3 class="font-weight-bold">{{ confirmed }}</h3>
                </div>
                <div>Number of confirmed cases of COVID-19</div>
              </b-card-text>
            </b-card>
            <b-card
              bg-variant="success"
              text-variant="white"
              header="Recoveries"
              class="text-center"
            >
              <b-card-text>
                <div class="mb-2 text-center">
                  <h3 class="font-weight-bold">{{ recovered }}</h3>
                </div>
                <div>
                  Number of recoveries from COVID-19
                </div>
              </b-card-text>
            </b-card>
            <b-card
              bg-variant="danger"
              text-variant="white"
              header="Deaths"
              class="text-center"
            >
              <b-card-text>
                <div class="mb-2 text-center">
                  <h3 class="font-weight-bold">{{ deaths }}</h3>
                </div>
                <div>
                  Number of deaths caused by COVID-19
                </div></b-card-text
              >
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
      <b-row class="justify-content-md-center">
        <b-col col md="6">
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
              <b-avatar
                variant="dark"
                :src="country.flag"
                class="mr-2"
              ></b-avatar>
              {{ country.name }}
            </b-dropdown-item>
          </b-dropdown>
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
  methods: {
    ...mapActions({
      fetchCountries: "fetchCountries",
      setCurrentCountry: "setCurrentCountry",
      fetchCovidData: "fetchCovidData"
    })
  },
  computed: {
    ...mapGetters([
      "currentCountry",
      "countryList",
      "covidData",
      "covidAvailableStats"
    ])
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
    this.fetchCountries();
    this.fetchCovidData();
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
