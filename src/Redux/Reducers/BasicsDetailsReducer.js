const initialState = {
  basicDetail: [],
  basicDetailSubmitted: false,
};

const BasicDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "BASIC_DETAILS":
      return { ...state, basicDetail: action.payload };
    case "BASIC_SUBMIT":
      return { ...state, basicDetailSubmitted: action.payload };
    default:
      return state;
  }
};

export default BasicDetailsReducer;
