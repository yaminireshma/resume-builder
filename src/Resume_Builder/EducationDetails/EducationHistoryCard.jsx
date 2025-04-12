import React from "react";
import styles from "./Educationhistory.module.css";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const EducationHistoryCard = ({
  history,
  handleDelete,
  handleEdit,
  index,
  editColor,
}) => {
  const { name, location, degree, startdate, enddate, field } = history;
  return (
    <div
      className={`${styles.EducationWrapper} ${editColor && styles.editColor}`}
    >
      <div className={styles.text}>
        <div>
          <div className={styles.degree}>{degree}</div>

          <div className={styles.details}>
            <div className={styles.name}>{name}</div>
            <div>---</div>
            <div className={styles.location}>{location}</div>
          </div>
          <div className={styles.dates}>
            <div className={styles.startDate}>{startdate}</div>
            <div>{"to"}</div>
            <div className={styles.endDate}>{enddate}</div>
          </div>
        </div>

        <div>
          <div className={styles.descriptionHeading}>{field}</div>
        </div>
      </div>

      <div className={styles.icons}>
        <FaEdit
          className={styles.icon}
          onClick={() => handleEdit(index, history)}
        />
        <MdDelete className={styles.icon} onClick={() => handleDelete(index)} />
      </div>
    </div>
  );
};
export default EducationHistoryCard;
