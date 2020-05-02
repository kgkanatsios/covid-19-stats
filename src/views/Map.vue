<template>
  <div>
    <b-container>
      <b-row class="mb-4">
        <b-col>
          <h3 class="text-center">
            <span class="text-capitalize font-weight-bold">{{
              currentCountry.name
            }}</span>
          </h3>
        </b-col>
      </b-row>
    </b-container>
    <b-container fluid>
      <b-row>
        <b-col style="height:700px;">
          <l-map class="w-100 h-100 d-flex" :zoom="zoom" :center="center">
            <l-tile-layer :url="url"></l-tile-layer>
            <l-circle
              v-for="(data, index) in mapData"
              :key="index"
              :lat-lng="[data.country.latlng[0], data.country.latlng[1]]"
              :radius="radiusLimit(data.stats.confirmed)"
              color="red"
              fillColor="red"
              :name="data.country.name"
            >
              <l-popup
                :lat-lng="[data.country.latlng[0], data.country.latlng[1]]"
              >
                <div class="text-center">
                  <h6>{{ data.country.name }}</h6>
                  <div>
                    <div class="text-info">
                      Confirmed:
                      <span class="font-weight-bold">{{
                        new Intl.NumberFormat().format(data.stats.confirmed)
                      }}</span>
                    </div>
                    <div class="text-success">
                      Recoveries:
                      <span class="font-weight-bold">{{
                        new Intl.NumberFormat().format(data.stats.recovered)
                      }}</span>
                    </div>
                    <div class="text-danger">
                      Deaths:
                      <span class="font-weight-bold">{{
                        new Intl.NumberFormat().format(data.stats.deaths)
                      }}</span>
                    </div>
                  </div>
                </div>
              </l-popup>
            </l-circle>
          </l-map>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { LMap, LTileLayer, LCircle, LPopup } from "vue2-leaflet";
import "leaflet/dist/leaflet.css";

export default {
  name: "Map",
  data() {
    return {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      zoom: 2,
      center: [47.41322, -1.219482],
      bounds: null
    };
  },
  components: {
    LMap,
    LTileLayer,
    LCircle,
    LPopup
  },
  methods: {
    ...mapActions({
      fetchCountries: "fetchCountries",
      fetchCovidLatestData: "fetchCovidLatestData"
    }),
    radiusLimit: function(radius) {
      return radius < 20000 ? 20000 : radius;
    }
  },
  computed: {
    ...mapGetters(["currentCountry", "countryList", "covidLatestData"]),
    mapData: function() {
      if (Object.entries(this.covidLatestData).length === 0) {
        return {};
      }
      const data = [];
      Object.keys(this.covidLatestData.result).forEach(covidLatestDataKey => {
        let alpha3Code = Object.keys(
          this.covidLatestData.result[covidLatestDataKey]
        );
        let countryData = this.countryList.find(
          country => country.alpha3Code == alpha3Code
        );
        if (countryData != null) {
          data.push({
            country: countryData,
            stats: this.covidLatestData.result[covidLatestDataKey][alpha3Code]
          });
        }
      });
      return data;
    }
  },
  created() {
    this.fetchCountries();
    this.fetchCovidLatestData();
  }
};
</script>

<style></style>
