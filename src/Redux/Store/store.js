import { createStore, combineReducers } from "redux";
import BasicDetailsReducer from "../Reducers/BasicsDetailsReducer";
import ProjectsReducer from "../Reducers/ProjectsReducer";
import EducationDetailsReducer from "../Reducers/EducationDetailsReducer";
import EmploymentHistoryReducer from "../Reducers/EmploymentHistoryReducer";
import InternshipsReducer from "../Reducers/InternshipsReducer";
import LanguagesReducer from "../Reducers/LanguagesReducer";
import ProfileReducer from "../Reducers/ProfileReducer";
import SkillsReducer from "../Reducers/SkillsReducer";
import GlobalReducer from "../Reducers/globalReducer";

const rootReducer = combineReducers({
  basicDetails: BasicDetailsReducer,
  projects: ProjectsReducer,
  educationDetails: EducationDetailsReducer,
  employmentHistory: EmploymentHistoryReducer,
  internships: InternshipsReducer,
  languages: LanguagesReducer,
  profile: ProfileReducer,
  skills: SkillsReducer,
  global: GlobalReducer,
});

const store = createStore(rootReducer);
export default store;
