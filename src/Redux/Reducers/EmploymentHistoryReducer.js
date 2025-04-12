const initialState = {
  employment: [],
  employmentSkip: false,
  employmentSubmitted: false,
};

const EmploymentHistoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case "EMPLOYMENT":
      return {
        ...state,
        employment: action.payload,
      };
    case "EMPLOYMENT_SKIP":
      return {
        ...state,
        employmentSkip: action.payload,
      };
    case "EMPLOYMENT_SUBMIT":
      return {
        ...state,
        employmentSubmitted: action.payload,
      };
    default:
      return state;
  }
};

export default EmploymentHistoryReducer;
