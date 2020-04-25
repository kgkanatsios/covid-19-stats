import Axios from "axios";

const state = {
  global: [],
  country: []
};
const mutations = {
  SET_GLOBAL(state, { globalData }) {
    state.global = globalData;
  },
  SET_COUNTRY(state, { countryData }) {
    state.country = countryData;
  }
};
const actions = {
  fetchGlobalData: ({ commit }) => {
    Axios.get("https://covidapi.info/api/v1/global/count")
      .then(res => {
        commit("SET_GLOBAL", {
          globalData: res.data
        });
      })
      .catch(error => console.log(error));
  },
  fetchCountryData: ({ commit }, countryName) => {
    Axios.get("https://covidapi.info/api/v1/country/" + countryName)
      .then(res => {
        commit("SET_COUNTRY", {
          countryData: res.data
        });
      })
      .catch(error => console.log(error));
  }
};
const getters = {
  covidGlobal: state => {
    return state.global;
  },
  covidCountry: state => {
    return state.country;
  }
};
export default {
  state,
  mutations,
  actions,
  getters
};
