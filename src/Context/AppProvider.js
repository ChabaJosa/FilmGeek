import createDataContext from "./CreateDataContext";
import * as firebase from "firebase";
// import * as SecureStore from "expo-secure-store";

const appReducer = (state, action) => {
  switch (action.type) {
    case "get_new_profile":
      return {
        data: action.payload,
        status: action.isLoggedIn,
        message: action.message,
      };
    case "get_profile":
      return {
        data: action.payload,
        status: action.isLoggedIn,
        message: action.message,
      };
    case "get_movie":
      return {
        ...state,
        movieData: action.payload,
      };
    case "get_movie_array":
      return {
        ...state,
        movieArrData: action.payload,
      };
    case "logout":
      // SecureStore.deleteItemAsync("user");
      // SecureStore.deleteItemAsync("pwd");
      return {
        data: {},
        status: false,
      };
    default:
      return state;
  }
};

const createProfile = (dispatch) => {
  return async (usr, pwd) => {
    // SecureStore.getItemAsync("user");
    // SecureStore.getItemAsync("pwd");
    //
    try {
      let data = await firebase
        .auth()
        .createUserWithEmailAndPassword(usr, pwd)
        .then((userCredentials) => {
          const user = userCredentials.user;
          return (dataRes = {
            name: user.email,
            token: user.refreshToken,
          });
        });
      //
      if (data != undefined) {
        dispatch({
          type: "get_new_profile",
          payload: data,
          isLoggedIn: true,
          message: "Succesfull Register",
        });
      } else {
        dispatch({
          type: "get_new_profile",
          payload: {},
          isLoggedIn: false,
          message: "Error Upon Register",
        });
      }
      //
    } catch (err) {
      alert(err);
      dispatch({
        type: "get_new_profile",
        payload: {},
        isLoggedIn: false,
        message: "Error Upon Register",
      });
    }
  };
};

const getProfileData = (dispatch) => {
  return async (usr, pwd) => {
    // SecureStore.getItemAsync("user");
    // SecureStore.getItemAsync("pwd");
    //
    try {
      let data = await firebase
        .auth()
        .signInWithEmailAndPassword(usr, pwd)
        .then((userCredentials) => {
          const user = userCredentials.user;
          // console.log("Succesfully LoggedIn  ", user.email);
          return (dataRes = {
            name: user.email,
            token: user.refreshToken,
          });
        });
      //
      dispatch({
        type: "get_profile",
        payload: data,
        isLoggedIn: true,
        message: "Succesfull Sign In",
      });
    } catch (err) {
      alert(err);
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
    let copyArr = [...previousArr];
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
      copyArr.push(data);
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

const getMovieArr = (dispatch) => {
  return async (movie) => {
    //
    try {
      const response = await fetch(
        `http://www.omdbapi.com/?i=tt3896198&apikey=afd0d793&s=${movie}`,
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
      console.log(data);
      //
      dispatch({
        type: "get_movie_array",
        payload: data,
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
    createProfile,
    getProfileData,
    getMovieData,
    getMovieArr,
    logoutProfile,
  },
  []
);
