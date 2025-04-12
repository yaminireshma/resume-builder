const initialState = {
  basicComplete: 0,
  profileComplete: 0,
  educationComplete: 0,
  skillComplete: 0,
  languageComplete: 0,
};

const GlobalReducer = (state = initialState, action) => {
  switch (action.type) {
    case "BASIC_COMPLETENESS":
      return {
        ...state,
        basicComplete: action.payload,
      };
    case "PROFILE_COMPLETENESS":
      return {
        ...state,
        profileComplete: action.payload,
      };
    case "EDUCATION_COMPLETENESS":
      return {
        ...state,
        educationComplete: action.payload,
      };
    case "SKILL_COMPLETENESS":
      return {
        ...state,
        skillComplete: +action.payload,
      };
    case "LANGUAGE_COMPLETENESS":
      return {
        ...state,
        languageComplete: action.payload,
      };
    default:
      return state;
  }
};
export default GlobalReducer;
