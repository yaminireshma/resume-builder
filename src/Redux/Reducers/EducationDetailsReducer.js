const intialState = {
  education: [],
  educationSubmitted: false,
};

const EducationDetailsReducer = (state = intialState, action) => {
  switch (action.type) {
    case "EDUCATION":
      return {
        ...state,
        education: action.payload,
      };
    case "EDUCATION_SUBMIT":
      return {
        ...state,
        educationSubmitted: action.payload,
      };
    default:
      return state;
  }
};
export default EducationDetailsReducer;
