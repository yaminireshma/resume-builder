const intialState = {
  languages: [],
  languageSubmitted: false,
};

const LanguagesReducer = (state = intialState, action) => {
  switch (action.type) {
    case "LANGUAGE":
      return {
        ...state,
        languages: action.payload,
      };
    case "LANGUAGE_SUBMIT":
      return {
        ...state,
        languageSubmitted: action.payload,
      };
    default:
      return state;
  }
};
export default LanguagesReducer;
