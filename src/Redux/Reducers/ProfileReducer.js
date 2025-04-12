const intialState = {
  profile: [],
  profileSubmitted: false,
};

const ProfileReducer = (state = intialState, action) => {
  if (action.type === "PROFILE") {
    return { ...state, profile: action.payload };
  }
  if (action.type === "PROFILE_SUBMIT") {
    return { ...state, profileSubmitted: action.payload };
  } else {
    return state;
  }
};
export default ProfileReducer;
