import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { IoMdArrowRoundBack } from "react-icons/io";
import styles from "./Projects.module.css";
import { useDispatch } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ProjectHistoryCard from './ProjectHistoryCard'

const Projects = ({
  currentStep,
  setCurrentStep,
}) => {
  const [data, setData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({});
  const [displayErrors, setDisplayErrors] = useState({});
  const [skip, setSkip] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setDisplayErrors({});
  }, [currentStep]);

  useEffect(() => {
    if (skip) {
      setCurrentStep(currentStep + 1);
      setSkip(false);
    }
  }, [skip, currentStep]);

  const validate = (values) => {
    let errors = {};
    if (!values.description) {
      errors.description = "Enter Description";
    }
    setDisplayErrors(errors);
    return errors;
  };

  const formik = useFormik({
    validateOnBlur: false,
    validateOnChange: false,
    initialValues: {
      description: "",
    },
    onSubmit: (values, { resetForm }) => {
      if (editIndex != null) {
        setEditData(values);
      } else {
        setData(values);
      }
      resetForm();
    },
    validate,
  });

  const handleNext = () => {
    const validationErrors = validate(values);
    if (Object.keys(validationErrors).length === 0) {
      handleSubmit();
      setCurrentStep(currentStep + 1);
      dispatch({ type: "PROJECT_SUBMIT", payload: true });
    } else {
      alert("Please fill or clear the form before going to next step");
    }
  };

  const {
    values,
    handleSubmit,
    setValues,
    resetForm,
    setFieldValue,
    dirty,
  } = formik;

  const clearError = (field) => {
    setDisplayErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[field];
      return newErrors;
    });
  };

  const handleEdit = (index, history) => {
    setEditIndex(index);
    setValues(history);
  };

  return (
    <>
      <div className={styles.gobackWrapper}>
        <IoMdArrowRoundBack className={styles.gobackIcon} />
        <div
          className={styles.goback}
          onClick={() => {
            setCurrentStep(currentStep - 1);
          }}
        >
          {"Go Back"}
        </div>
      </div>

      <div className={styles.addWrapper}>
        <h1>Let's add your Projects</h1>
        <div className={styles.alert}>* indicates a required field</div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className={styles.buttons}>
          <button type="submit" className={styles.add}>
            {editIndex !== null ? "Edit" : "Add"}
          </button>
          <button
            type="button"
            className={styles.reset}
            onClick={() => {
              resetForm();
              setDisplayErrors({});
            }}
          >
            Clear
          </button>
        </div>
        <div className={styles.container}>
          <div className={styles.box}>
            <label className={styles.require}>DESCRIPTION</label>
            <div className={styles.textarea}>
              <ReactQuill
                value={values.description}
                onChange={(content) => {
                  setFieldValue("description", content);
                  formik.validateField("description");
                  clearError("description");
                }}
                className={`${styles.quillTextarea}`}
              />
            </div>
            <div className={styles.errorContainer}>
              {displayErrors.description ? (
                <div className={styles.errorEditor}>
                  {displayErrors.description}
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </form>
      <ProjectsSummary
        data={data}
        editIndex={editIndex}
        setEditIndex={setEditIndex}
        setEditData={setEditData}
        editData={editData}
        handleEdit={handleEdit}
      />
      <div className={styles.buttons}>
        <button
          type="button"
          className={styles.nextText}
          onClick={() => {
            dispatch({ type: "PROJECT_SKIP", payload: true });
            setSkip(true);
          }}
        >
          Skip
        </button>
        <button
          className={styles.nextText}
          onClick={() => {
            if (dirty) {
              handleNext();
            } else {
              setCurrentStep(currentStep + 1);
              dispatch({ type: "PROJECT_SUBMIT", payload: true });
            }
          }}
        >
          Next
        </button>
      </div>
    </>
  );
};
export default Projects;

export const ProjectsSummary = ({
  data,
  editIndex,
  setEditIndex,
  setEditData,
  editData,
  handleEdit,
}) => {
  const dispatch = useDispatch();
  const [projectData, setProjectData] = useState([]);

  useEffect(() => {
    dispatch({ type: "PROJECTS", payload: projectData });
  }, [projectData]);

  const handleDelete = (index) => {
    const newData = projectData.filter((val, id) => id !== index);
    setProjectData(newData);
  };

  useEffect(() => {
    if (Object.keys(editData).length > 0) {
      const updatedData = [...projectData];
      updatedData[editIndex] = editData;
      setProjectData(updatedData);
      setEditIndex(null);
      setEditData({});
    }
  }, [editData]);

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      if(data.description!=='<p><br></p>'){
        setProjectData([...projectData, data]);
      }
    }
  }, [data]);
  return (
    <>
      {projectData.length > 0 && <h1>Projects Summary</h1>}
      <div className={styles.cards}>
        {projectData.length > 0 &&
          projectData.map((history, index) => (
            <div key={index}>
              <ProjectHistoryCard
                history={history}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                index={index}
                editColor={editIndex === index}
              />
            </div>
          ))}
      </div>
    </>
  );
};
