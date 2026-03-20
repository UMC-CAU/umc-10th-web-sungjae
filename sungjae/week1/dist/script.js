"use strict";
let todos = [];
const textInput = document.getElementById('todo-input');
const addButton = document.getElementById('add-button');
const todoListContainer = document.getElementById('todo-list');
const completedListContainer = document.getElementById('completed-list');
addButton.addEventListener('click', () => {
    const text = textInput.value.trim();
    if (text === "") {
        alert("할 일을 입력하세요");
        return;
    }
    const newTodo = {
        id: Date.now(),
        text: text,
        isComplete: false
    };
    todos.push(newTodo);
    textInput.value = "";
    textInput.focus();
    render();
});
function render() {
    todoListContainer.innerHTML = "";
    completedListContainer.innerHTML = "";
    todos.forEach((todo) => {
        const item = document.createElement('div');
        item.className = 'render-container__item';
        const span = document.createElement('span');
        span.textContent = todo.text;
        const button = document.createElement('button');
        button.className = 'render-container__item-button';
        if (todo.isComplete) {
            button.textContent = "삭제";
            button.classList.add('render-container__item-button--delete');
        }
        else {
            button.textContent = "완료";
        }
        button.textContent = todo.isComplete ? "삭제" : "완료";
        button.addEventListener('click', () => {
            if (!todo.isComplete) {
                todo.isComplete = true;
            }
            else {
                todos = todos.filter(t => t.id !== todo.id);
            }
            render();
        });
        item.appendChild(span);
        item.appendChild(button);
        if (todo.isComplete) {
            completedListContainer.appendChild(item);
        }
        else {
            todoListContainer.appendChild(item);
        }
    });
}
