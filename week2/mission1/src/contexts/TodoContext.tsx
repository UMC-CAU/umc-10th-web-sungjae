import { createContext, useState, useContext, type ReactNode } from 'react';

// 
export interface Todo {
  id: number;
  text: string;
  isComplete: boolean;
}

interface TodoContextType {
  todos: Todo[];
  textInput: string;
  setTextInput: (val: string) => void;
  handleAdd: () => void;
  toggleComplete: (id: number) => void;
  deleteTodo: (id: number) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [textInput, setTextInput] = useState("");

  const handleAdd = () => {
    if (textInput.trim() === "") return;
    const newTodo: Todo = { id: Date.now(), text: textInput, isComplete: false };
    setTodos([...todos, newTodo]);
    setTextInput("");
  };

  const toggleComplete = (id: number) => {
    setTodos(todos.map(t => t.id === id ? { ...t, isComplete: !t.isComplete } : t));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  return (
    <TodoContext.Provider value={{ todos, textInput, setTextInput, handleAdd, toggleComplete, deleteTodo }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) throw new Error("useTodo must be used within a TodoProvider");
  return context;
};