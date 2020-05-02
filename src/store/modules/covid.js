import Axios from "axios";

const state = {
  data: {},
  latestData: {},
  availableStats: true
};
const mutations = {
  SET_DATA(state, { data }) {
    state.data = data;
  },
  SET_LATEST_DATA(state, { latestData }) {
    state.latestData = latestData;
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
    commit("SET_AVAILABLESTATS", {
      availableStats: true
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
      })
      .catch(error => {
        if (error.response.status == 404) {
          commit("SET_AVAILABLESTATS", {
            availableStats: false
          });
        }
      });
  },
  fetchCovidLatestData: ({ commit }) => {
    Axios.get("https://covidapi.info/api/v1/global/latest")
      .then(res => {
        commit("SET_LATEST_DATA", {
          latestData: res.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
};
const getters = {
  covidData: state => {
    return state.data;
  },
  covidLatestData: state => {
    return state.latestData;
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
