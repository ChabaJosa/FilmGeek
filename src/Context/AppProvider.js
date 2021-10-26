import createDataContext from "./CreateDataContext";
import firebase from "firebase";
import "firebase/auth";
import { LogBox } from "react-native";
// import { getAuth, updateProfile } from "firebase/auth";
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
    case "updt_profile":
      return {
        ...state,
        updateData: action.payload,
      };
    case "get_usr_doc":
      return {
        ...state,
        usrDocData: action.payload,
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
    // Firebase sets some timeers for a long period, which will trigger some warnings.
    //
    LogBox.ignoreLogs([`Setting a timer for a long period`]);
    //
    try {
      const db = firebase.firestore();
      //
      let data = await firebase
        .auth()
        .createUserWithEmailAndPassword(usr, pwd)
        .then((userCredentials) => {
          const user = userCredentials.user;
          return (dataRes = {
            email: user.email,
            name: user.displayName,
            pic: user.photoURL,
            token: user.refreshToken,
          });
        });
      //
      if (data != undefined && data.email != null) {
        db.collection("users")
          .add({
            email: usr,
            bio: "",
            likes: [],
          })
          .then((docRef) => {
            // console.log("Document written with ID: ", docRef.id);
            return docRef;
          })
          .catch((error) => {
            // console.error("Error adding document: ", error);
            return null;
          });
      }
      //
      if (data != undefined && data.email != null) {
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
          console.log("Succesfully LoggedIn  ", user);
          return (dataRes = {
            email: user.email,
            name: user.displayName,
            pic: user.photoURL,
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

const updateProfileData = (dispatch) => {
  return async (name, photo) => {
    // SecureStore.getItemAsync("user");
    // SecureStore.getItemAsync("pwd");
    // This helped a lot: https://rnfirebase.io/reference/auth/user
    //
    try {
      let currUser = await firebase.auth().currentUser;
      //
      let newData = await firebase
        .auth()
        .currentUser.updateProfile({
          displayName: name != null ? name : currUser.displayName,
          photoURL: photo != null ? photo : currUser.photoURL,
        })
        .then(() => {
          return currUser;
        });
      //
      let data;
      if (
        newData.email != undefined &&
        newData.displayName != undefined &&
        newData.photoURL != undefined
      ) {
        data = {
          email: newData.email,
          name: newData.displayName,
          pic: newData.photoURL,
          token: newData.refreshToken,
        };
        //
        dispatch({
          type: "get_profile",
          payload: data,
          isLoggedIn: true,
          message: "Succesfull User Update",
        });
      } else {
        data = newData;
        //
        dispatch({
          type: "updt_profile",
          payload: data,
        });
      }
      //
    } catch (err) {
      console.log("Err2", err);
      alert(err);
      dispatch({
        type: "updt_profile",
        payload: {},
      });
    }
  };
};

const getUserDocData = (dispatch) => {
  return async (email) => {
    //
    try {
      const db = firebase.firestore();
      let docRef = db.collection("users").doc(`${email}`);
      //
      let data = await docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            console.log("Document data:", doc.data());
            return doc.data();
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            return null;
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
      //
      if (data != null) {
        dispatch({
          type: "get_usr_doc",
          payload: data,
          isLoggedIn: true,
          message: "Succesfull Sign In",
        });
      } else {
        dispatch({
          type: "get_usr_doc",
          payload: {},
          isLoggedIn: false,
          message: "Error Upon User Doc Data Retrieval",
        });
      }
    } catch (err) {
      alert(err);
      dispatch({
        type: "get_usr_doc",
        payload: {},
        isLoggedIn: false,
        message: "Error Upon User Doc Data Retrieval",
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
      // console.log(data);
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
    updateProfileData,
    getUserDocData,
    getMovieData,
    getMovieArr,
    logoutProfile,
  },
  []
);
