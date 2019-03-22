import { GET_ERRORS } from "././actions";
import { PRESENT_USER } from "././actions";
import jwt_decode from "jwt-decode";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

//User Registration action
export const userRegister = (userInfo, history) => dispatch => {
  axios
    .post("/api/users/register", userInfo)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//User login action
export const userLogin = userInfo => dispatch => {
  axios
    .post("/api/users/login", userInfo)
    .then(res => {
      //Save token to local storage for verification
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      //set token to auth header
      setAuthToken(token);
      //Decode token to get user data
      const decoded = jwt_decode(token);
      //Set current user
      dispatch(setPresentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//set logged in user
export const setPresentUser = decoded => {
  return {
    type: PRESENT_USER,
    payload: decoded
  };
};

//Log user out
export const logoutUser = () => dispatch => {
  localStorage.removeItem("jwtToken"); //Remove token in use
  setAuthToken(false); //Which in turn deletes authorization, ie see else part in setAuthToken.js
  //Current user then becomes empty and isAuthorisation check fails
  dispatch(setPresentUser({}));
};
