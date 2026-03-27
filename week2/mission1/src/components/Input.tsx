import { useTodo } from '../contexts/TodoContext'; // 보관함 가져오기

const Input = () => {
  // 보관함에서 필요한 것만 꺼내기
  const { textInput, setTextInput, handleAdd } = useTodo();

  return (
    <div className="todo-container__form">
      <input 
        type="text" 
        className="todo-container__input" 
        placeholder="할 일 입력하세요"
        value={textInput} 
        onChange={(e) => setTextInput(e.target.value)} 
      />
      <button className="todo-container__button" onClick={handleAdd}>할 일 추가</button>
    </div>
  );
};

export default Input;