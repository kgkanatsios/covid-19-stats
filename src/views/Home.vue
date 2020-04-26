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
      <b-row class="justify-content-md-center mb-4">
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
      <b-row class="mb-4">
        <b-col>
          <line-chart :chart-data="chartData" :height="150"></line-chart>
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
import LineChart from "@/charts/LineChart.js";

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
    LineChart
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
    ]),
    chartData: function() {
      if (Object.entries(this.covidData).length === 0) {
        return;
      }
      let confirmed = [];
      let recovered = [];
      let deaths = [];
      Object.keys(this.covidData.result).forEach(covidDataKey => {
        confirmed.push(this.covidData.result[covidDataKey].confirmed);
        recovered.push(this.covidData.result[covidDataKey].recovered);
        deaths.push(this.covidData.result[covidDataKey].deaths);
      });
      return {
        labels: Object.keys(this.covidData.result),
        datasets: [
          {
            label: "Confirmed Cases",
            borderColor: "#000000",
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            data: confirmed
          },
          {
            label: "Recoveries",
            borderColor: "#28a745",
            backgroundColor: "rgba(40, 167, 69, 0.2)",
            data: recovered
          },
          {
            label: "Deaths",
            borderColor: "#dc3545",
            backgroundColor: "rgba(220, 53, 69, 0.2)",
            data: deaths
          }
        ]
      };
    }
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
    this.setCurrentCountry(["Global", null]);
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
