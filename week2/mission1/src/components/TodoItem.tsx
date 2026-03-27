import { useTodo } from '../contexts/TodoContext';

const TodoItem = ({ id, text, isComplete }: { id: number, text: string, isComplete: boolean }) => {
  const { toggleComplete, deleteTodo } = useTodo(); // 보관함에서 직접 꺼냄

  return (
    <div className="render-container__item">
      <span>{text}</span>
      <button onClick={() => isComplete ? deleteTodo(id) : toggleComplete(id)}>
        {isComplete ? "삭제" : "완료"}
      </button>
    </div>
  );
};

export default TodoItem;