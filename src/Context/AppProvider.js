import createDataContext from "./CreateDataContext";
import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";

const appReducer = (state, action) => {
  switch (action.type) {
    case "get_profile":
      return {
        data: action.payload,
        status: action.isLoggedIn,
      };
    case "get_movie":
      return {
        ...state,
        movieData: action.payload,
      };
    case "logout":
      SecureStore.deleteItemAsync("user");
      SecureStore.deleteItemAsync("pwd");
      return {
        data: {},
        status: false,
      };
    default:
      return state;
  }
};

const getProfileData = (dispatch) => {
  return async (id, pwd) => {
    // SecureStore.getItemAsync("user");
    // SecureStore.getItemAsync("pwd");
    //
    console.log(id, pwd);
    let data = { name: "John Denver" };
    try {
      dispatch({
        type: "get_profile",
        payload: data,
        isLoggedIn: true,
        message: "Succesfull Sign In",
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: "get_profile",
        payload: {},
        isLoggedIn: false,
        message: "Error Upon SignIn",
      });
    }
  };
};

const getMovieData = (dispatch) => {
  return async (previousArr, movie) => {
    //
    let copyArr = [...previousArr]
    try {
      const response = await fetch(
        `http://www.omdbapi.com/?i=tt3896198&apikey=afd0d793&t=${movie}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          // body: JSON.stringify({}),
        }
      );
      let resJson = await response.text();
      let data = JSON.parse(resJson.trim());
      copyArr.push(data)
      //
      dispatch({
        type: "get_movie",
        payload: copyArr,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

const logoutProfile = (dispatch) => {
  return () => {
    dispatch({
      type: "logout",
    });
  };
};

export const { Context, Provider } = createDataContext(
  appReducer,
  {
    getProfileData,
    getMovieData,
    logoutProfile,
  },
  []
);
