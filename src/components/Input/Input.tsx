import React, { useState } from "react";
import styles from "./Input.module.scss";

const Input: React.FC<{ addNewTodo: (todo: string, key: string) => void }> = (
  props
) => {
  const [userInput, setUserInput] = useState<string>("");

  const onSubmitHandler = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (userInput.length > 0) {
      const key = `${new Date().toString()}_${userInput}`;
      props.addNewTodo(userInput, key);
      setUserInput("");
    }
  };
  return (
    <form onSubmit={onSubmitHandler} className={styles.user_input_form}>
      <input
        placeholder="todo"
        value={userInput}
        onChange={(e: React.FormEvent<HTMLInputElement>) => {
          setUserInput(e.currentTarget.value);
        }}
      />
    </form>
  );
};

export default Input;
