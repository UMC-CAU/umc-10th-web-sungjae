interface Todo{
  id: number; //각 항목 구별한 id
  text: string; //입력한 할 일 내용 
  isComplete: boolean; //할 일 완료했는지 여부
}

let todos: Todo[] = []; //Todo에 입력되는 데이터들을 담아둘 배열

//1. 입력창(Input)값 가져오기
const textInput = document.getElementById('todo-input') as HTMLInputElement;

//2. 추가하는 버튼 가져오기
const addButton = document.getElementById('add-button') as HTMLButtonElement;

//3. 할 일 목록이 그려질 공간 
const todoListContainer = document.getElementById('todo-list') as HTMLDivElement;

//4. 완료 목록이 그려질 공간 
const completedListContainer = document.getElementById('completed-list') as HTMLDivElement;

//5.추가 버튼 클릭 시 생기는 이벤트 리스너
addButton.addEventListener('click', ()=>{
  //입력창 입력된 값 가져오기
  const text = textInput.value.trim(); //trim은 양옆의 쓸데없는 빈칸 지워주고 텍스트만 남겨주는 기느

  //빈 값인지 체크 (체크하는 이유는 만약 아무것도 안 썼는데 버튼 누를 때마다 목록에 빈 줄 생겨선 안되기 때문. 글작 ㅏ하나라도 있어야함)
  if (text === ""){
    alert("할 일을 입력하세요"); //사용자가 빈값 입력했을 때 입력창 안에 나올 내용
    return;
  }

  //새로운 Todo객체 만들기
  const newTodo: Todo = {
    id: Date.now(), //입력하는 todo마다의 고유한 id. gemini말로는 date.now로 하면 id 중복될 일 없다고 해서 사용
    text: text, 
    isComplete: false
  }


  //위에 만들었던 todos 배열에 업로드
  todos.push(newTodo);

  //입력창 비우기 & 포커스 추가
  textInput.value = ""; //입력 끝나면 지움 
  textInput.focus();

  //화면에 그려주기
  render(); 

})

//6.이제 위의 내용들을 렌더링 해줄 차례
function render(){
  //초기화 해주는 작업임. 이게 없으면 추가할 때마다 기존 값이 중복해서 생김 
  todoListContainer.innerHTML = ""; 
  completedListContainer.innerHTML = "";

  //todos 배열에서 하나씩 꺼내는 것
  todos.forEach((todo) =>{ //forEach: 배열에 있는 데이터 수 만큼 반복해서 실행
    //할 일들을 담을 상자
    const item = document.createElement('div');
    item.className = 'render-container__item';

    //입력된 할 일 내용 넣기
    const span = document.createElement('span');
    span.textContent= todo.text;

    //완료, 삭제 버튼
    const button = document.createElement('button');
    button.className = 'render-container__item-button';

    if (todo.isComplete) {
    button.textContent = "삭제";
    button.classList.add('render-container__item-button--delete'); // 삭제 버튼일 때만 클래스 추가
    } else {
    button.textContent = "완료";
    
    }

    //상태에 따라 버튼 글자 다르게
    button.textContent = todo.isComplete ? "삭제":"완료"; 
    button.addEventListener('click', () => {
        if (!todo.isComplete) {
            // 미완료 상태면 완료로 변경
            todo.isComplete = true;
        } else {
            // 완료 상태면 목록에서 삭제 
            todos = todos.filter(t => t.id !== todo.id);
        }
        
        // 데이터가 바뀌었으니 다시 그림
        render();
    });

    //상자에 글자, 버튼 넣기
    item.appendChild(span);
    item.appendChild(button);

    //완료 했는지에 따라 알맞은 상자에 넣어줄 것
    if(todo.isComplete) {
      completedListContainer.appendChild(item);
    }else{
      todoListContainer.appendChild(item);
    }
  })

}