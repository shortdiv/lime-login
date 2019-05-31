import GoTrue from "gotrue-js";
import axios from "axios";

export const auth = new GoTrue({
  APIUrl: "https://lime-login.netlify.com/.netlify/identity",
  audience: "",
  setMalibus: "iamperson" // no idea what this does
});

export const state = {
  loading: false,
  user: null
};

export const actions = {
  attemptLogin({ commit, dispatch }, credentials) {
    return new Promise((resolve, reject) => {
      dispatch("attemptConfirmation", credentials).then(() => {
        auth
          .login(credentials.email, credentials.password, true)
          .then(response => {
            // deep clone user object otherwise gotrue will try to mutate a vuex state //
            let user = JSON.parse(JSON.stringify(response));
            resolve(user);
            commit("SET_CURRENT_USER", user);
            dispatch("setCookie");
          })
          .catch(error => {
            reject(error.json);
          });
      });
    });
  },
  attemptConfirmation({ commit, dispatch }, credentials) {
    return new Promise((resolve, reject) => {
      if (!credentials.token) {
        resolve();
        return;
      }
      auth
        .confirm(credentials.token, true)
        .then(response => {
          credentials.token = null;
          dispatch("attemptLogin", credentials);
          console.log(
            "Confirmation email sent",
            JSON.stringify({
              response
            })
          );
          commit("YAY");
          resolve(response);
        })
        .catch(error => {
          reject(error);
          console.log(error);
        });
    });
  },
  attemptSignup({ commit }, credentials) {
    return new Promise((resolve, reject) => {
      auth
        .signup(credentials.email, credentials.password)
        .then(response => {
          console.log("Confirmation email sent", response);
          commit("TOGGLE_LOAD");
          resolve(response);
        })
        .catch(error => {
          reject(error);
          console.log("It's an error", error);
        });
    });
  },
  attemptLogout({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      const user = auth.currentUser();
      user
        .logout()
        .then(() => {
          commit("SET_CURRENT_USER", null);
          dispatch("deleteCookie");
          resolve("User logged out");
        })
        .catch(error => {
          console.log("Failed to logout user: %o", error);
          reject(error);
        });
    });
  },
  setCookie() {
    const user = auth.currentUser();
    const jwt = user.jwt();
    jwt.then(response => {
      axios
        .post("/.netlify/functions/generate-cookie", { jwt: response })
        .then(res => {
          console.log(res);
        })
        .catch(err => console.err(err));
    });
  },
  deleteCookie() {
    axios
      .get("/.netlify/functions/clear-cookie")
      .then(res => {
        console.log(res);
      })
      .catch(err => console.err(err));
  }
};

export const mutations = {
  TOGGLE_LOAD(state) {
    state.loading = !state.loading;
  },
  SET_CURRENT_USER(state, val) {
    state.user = val;
  }
};

export const getters = {
  isLoggedIn(state) {
    return !!state.user;
  }
};
