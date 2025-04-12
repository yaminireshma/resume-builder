const intialState = {
  skills: [],
  skillSubmitted: false,
};

const SkillsReducer = (state = intialState, action) => {
  if (action.type === "SKILLS") {
    return { ...state, skills: action.payload };
  }
  if (action.type === "Skill_SUBMIT") {
    return { ...state, skillSubmitted: action.payload };
  } else {
    return state;
  }
};
export default SkillsReducer;
