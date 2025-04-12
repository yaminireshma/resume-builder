import React from "react";
import styles from "./Employmenthistory.module.css";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import DOMPurify from "dompurify";

const EmploymentHistoryCard = ({
  history,
  handleDelete,
  handleEdit,
  index,
  editColor,
}) => {
  const { jobtitle, location, employer, startdate, enddate, description } =
    history;
  return (
    <div
      className={`${styles.EmploymentWrapper} ${editColor && styles.editColor}`}
    >
      <div className={styles.text}>
        <div>
          <div className={styles.jobtitle}>{jobtitle}</div>

          <div className={styles.employedIn}>
            <div className={styles.employer}>{employer}</div>
            <div>---</div>
            <div className={styles.location}>{location}</div>
          </div>

          <div className={styles.dates}>
            <div className={styles.startDate}>{startdate}</div>
            <div>{"to"}</div>
            <div className={styles.endDate}>
              {enddate === "" ? "Present" : enddate}
            </div>
          </div>
        </div>
        <div>
          {description !== "" && (
            <div className={styles.descriptionHeading}>Description</div>
          )}
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(description),
            }}
          />
        </div>
      </div>

      <div className={styles.icons}>
        <FaEdit
          className={styles.icon}
          onClick={() => {
            handleEdit(index, history);
          }}
        />
        <MdDelete className={styles.icon} onClick={() => handleDelete(index)} />
      </div>
    </div>
  );
};
export default EmploymentHistoryCard;
