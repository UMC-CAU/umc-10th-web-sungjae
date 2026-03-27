import { useTodo } from '../contexts/TodoContext';
import TodoItem from './TodoItem';

interface TodoListProps {
  title: string;
  isCompleteSection: boolean; // 할 일 섹션인지 완료 섹션인지 구분용
}

const TodoList = ({ title, isCompleteSection }: TodoListProps) => {
  // 보관함에서 전체 todos만 꺼내기
  const { todos } = useTodo();

  // 섹션에 맞는 데이터만 필터링
  const filteredTodos = todos.filter(todo => todo.isComplete === isCompleteSection);

  return (
    <div className="render-container__section">
      <h2 className="render-container__title">{title}</h2>
      <div className="render-container__list">
        {filteredTodos.map(todo => (
          // 이제 TodoItem에게 함수를 주지 않고 최소한의 정보(id, text, isComplete)만 줌
          <TodoItem 
            key={todo.id} 
            id={todo.id}
            text={todo.text} 
            isComplete={todo.isComplete} 
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;