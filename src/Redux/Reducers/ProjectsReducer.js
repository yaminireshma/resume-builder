const intialState = {
  project: [],
  projectSkip: false,
  projectSubmitted: false,
};

const ProjectsReducer = (state = intialState, action) => {
  if (action.type === "PROJECTS") {
    return { ...state, project: action.payload };
  }
  if (action.type === "PROJECT_SKIP") {
    return {
      ...state,
      projectSkip: action.payload,
    };
  }
  if (action.type === "PROJECT_SUBMIT") {
    return {
      ...state,
      projectSubmitted: action.payload,
    };
  } else {
    return state;
  }
};
export default ProjectsReducer;
