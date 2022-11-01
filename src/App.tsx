import { useEffect, useState } from "react";
import styles from "./App.module.scss";
import Input from "./components/Input/Input";
import todo from "./components/type";
import Todo from "./components/Todo/Todo";
import Controls from "./components/Controls/Controls";
import img from "./ryan_gosling_new.jpg";


function App() {
  const [tasks, setTasks] = useState<todo[]>([]);
  const [visibleTasks, setVisibleTasks] = useState<todo[]>([]);
  const [filter, setFilter] = useState<string>("All");
  const addNewTodo = (todo: string, key: string) => {
    setTasks((prev) => {
      return [{ title: todo, active: true, key: key }, ...prev];
    });
  };

  const changeTodoStatus = (key: string) => {
    setTasks((prev) => {
      let updatedTasks = prev.map((el) => {
        if (el.key === key) {
          return {
            ...el,
            active: !el.active,
          };
        }
        return { ...el };
      });
      return updatedTasks;
    });
  };

  const removeComletedeItems = () => {
    setTasks((prev) => {
      let updatedTasks = prev.filter((el) => el.active);
      return updatedTasks;
    });
  };

  useEffect(() => {
    switch (filter) {
      case "All":
        setVisibleTasks(tasks);
        break;
      case "Active":
        setVisibleTasks(tasks.filter((el) => el.active));
        break;
      case "Completed":
        setVisibleTasks(tasks.filter((el) => !el.active));
        break;
    }
  }, [filter, tasks]);
  let list = (
    <ul className={styles.list}>
      {visibleTasks.length > 0 ? (
        visibleTasks.map((el) => (
          <li key={el.key}>
            <Todo todo={el} changeTodoStatus={changeTodoStatus} />
          </li>
        ))
      ) : (
        <p className={styles.not_found}>Not found</p>
      )}
    </ul>
  );
  if (tasks.length < 1) list = <p className={styles.zeroTodo}>You are free!</p>;
  return (
    <>
      <div className={styles.App}>
        <h3>todos</h3>
        <Input addNewTodo={addNewTodo} />
        <div className={styles.list_container}>{list}</div>
        {tasks.length > 0 && (
          <Controls
            itemsLeft={tasks.filter((el) => el.active).length}
            setFilter={(newFilter: string) => {
              if (filter !== newFilter) setFilter(newFilter);
            }}
            removeComletedeItems={removeComletedeItems}
          />
        )}
      </div>
      <div className={`${styles.image} ${styles.gosling}`}>
        <img src={img} />
      </div>
      <div className={`${styles.image} ${styles.robert}`}>
        <img
          src={
            "https://media.glamourmagazine.co.uk/photos/6138b9b5236c41e83148aebb/2:3/w_1280,h_1920,c_limit/robert-pattinson-meta_glamour_7jan16_dior_b_1.jpg"
          }
        />
      </div>
    </>
  );
}

export default App;
