import { PROFILE_LOADING, CLEAR_PRESENT_PROFILE } from "./actions";

//Profile loading action for showing spinner while loding
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

//Clear Profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_PRESENT_PROFILE
  };
};
