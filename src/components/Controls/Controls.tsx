import { useState } from "react";
import styles from "./Controls.module.scss";

const Controls: React.FC<{
  itemsLeft: number;
  setFilter: (filter: string) => void;
  removeComletedeItems: () => void;
}> = (props) => {
  const [activeButton, setActiveButton] = useState(1);
  return (
    <div className={styles.control_container}>
      <div className={styles.itemsLeft}>{props.itemsLeft} items left</div>
      <div className={styles.filters}>
        <button
          onClick={() => {
            props.setFilter("All");
            setActiveButton(1);
          }}
          className={activeButton === 1 ? styles.active : ""}
        >
          All
        </button>
        <button
          onClick={() => {
            props.setFilter("Active");
            setActiveButton(2);
          }}
          className={activeButton === 2 ? styles.active : ""}
        >
          Active
        </button>
        <button
          onClick={() => {
            props.setFilter("Completed");
            setActiveButton(3);
          }}
          className={activeButton === 3 ? styles.active : ""}
        >
          Completed
        </button>
      </div>
      <div className={styles.clearCompleted}>
        <button
          onClick={() => {
            props.removeComletedeItems();
          }}
        >
          Clear completed
        </button>
      </div>
    </div>
  );
};

export default Controls;
