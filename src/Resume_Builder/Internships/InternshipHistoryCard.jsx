import React from "react";
import styles from "./InternshipHistory.module.css";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import DOMPurify from "dompurify";

const InternshipHistoryCard = ({
  history,
  handleDelete,
  handleEdit,
  index,
  editColor,
}) => {
  const { company, techstack, startdate, enddate, description } = history;
  return (
    <div
      className={`${styles.InternshipWrapper} ${editColor && styles.editColor}`}
    >
      <div className={styles.text}>
        <div>
          <div className={styles.company}>{company}</div>
          <div className={styles.techstack}>{techstack}</div>

          <div className={styles.dates}>
            <div className={styles.startDate}>{startdate}</div>
            <div>{"to"}</div>
            <div className={styles.endDate}>{enddate}</div>
          </div>
        </div>
        <div className={styles.desc}>
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
          onClick={() => handleEdit(index, history)}
        />
        <MdDelete className={styles.icon} onClick={() => handleDelete(index)} />
      </div>
    </div>
  );
};
export default InternshipHistoryCard;
