import todo from "../type";
import styles from "./Todo.module.scss";
const Todo: React.FC<{
  todo: todo;
  changeTodoStatus: (key: string) => void;
}> = (props) => {
  return (
    <div
      className={`${styles.item} ${props.todo.active ? "" : styles.notActive}`}
      onClick={() => {
        props.changeTodoStatus(props.todo.key);
      }}
    >
      {props.todo.active ? <button></button> : <button>&#10003;</button>}
      <span>{props.todo.title}</span>
    </div>
  );
};

export default Todo;
