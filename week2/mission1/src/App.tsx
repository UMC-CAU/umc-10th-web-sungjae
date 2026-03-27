import './App.css';
import Input from './components/Input'; 
import TodoList from './components/TodoList';
import { TodoProvider } from './contexts/TodoContext';

function App() {
  // App은 데이터를 직접 가지고 있지 않게 됨

  return (
    <TodoProvider>
      <div className="todo-container">
        <h1 className="todo-container__header">성재의 TODO</h1>

        {/* 2. 입력창 컴포넌트: Props를 모두 삭제 */}
        <Input /> 

        <div className="render-container">
          {/* 3. 할 일 리스트 컴포넌트: props를 삭제하고, 구분용 Prop만 남김*/}
          <TodoList title="할 일" isCompleteSection={false} />

          {/* 4. 완료 리스트 컴포넌트 */}
          <TodoList title="완료" isCompleteSection={true} />
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;