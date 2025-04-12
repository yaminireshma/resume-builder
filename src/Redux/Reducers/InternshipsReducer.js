const intialState = {
  internship: [],
  internshipSkip: false,
  internshipSubmitted: false,
};

const InternshipsReducer = (state = intialState, action) => {
  if (action.type === "INTERNSHIPS") {
    return { ...state, internship: action.payload };
  }
  if (action.type === "INTERNSHIP_SKIP") {
    return {
      ...state,
      internshipSkip: action.payload,
    };
  }
  if (action.type === "INTERNSHIP_SUBMIT") {
    return {
      ...state,
      internshipSubmitted: action.payload,
    };
  } else {
    return state;
  }
};
export default InternshipsReducer;
