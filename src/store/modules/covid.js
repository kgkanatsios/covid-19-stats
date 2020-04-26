import Axios from "axios";

const state = {
  data: {},
  availableStats: true
};
const mutations = {
  SET_DATA(state, { data }) {
    state.data = data;
  },
  SET_AVAILABLESTATS(state, { availableStats }) {
    state.availableStats = availableStats;
  }
};
const actions = {
  fetchCovidData: ({ commit }, countryName = null) => {
    commit("SET_DATA", {
      data: {}
    });
    Axios.get(
      countryName == null
        ? "https://covidapi.info/api/v1/global/count"
        : "https://covidapi.info/api/v1/country/" + countryName
    )
      .then(res => {
        commit("SET_DATA", {
          data: res.data
        });
        commit("SET_AVAILABLESTATS", {
          availableStats: true
        });
      })
      .catch(error => {
        if (error.response.status == 404) {
          commit("SET_AVAILABLESTATS", {
            availableStats: false
          });
        }
      });
  }
};
const getters = {
  covidData: state => {
    return state.data;
  },
  covidAvailableStats: state => {
    return state.availableStats;
  }
};
export default {
  state,
  mutations,
  actions,
  getters
};
