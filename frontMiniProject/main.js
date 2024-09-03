// script.js

// DOM 요소 가져오기
const todoInput = document.getElementById('todo-input');
const addTodoBtn = document.getElementById('add-todo-btn');
const todoList = document.getElementById('todo-list');
const todoCounts = document.getElementById('todo-counts'); // 할 일 개수 표시 요소

// 초기 로드 시 로컬 스토리지에서 할 일 목록 불러오기
document.addEventListener('DOMContentLoaded', loadTodos);

// 할 일 추가 함수
function addTodo() {
  const todoText = todoInput.value.trim();

  if (todoText !== '') {
    const listItem = createTodoElement(todoText, false);

    // 할 일 목록에 추가
    todoList.appendChild(listItem);

    // 로컬 스토리지에 저장 및 카운트 업데이트
    saveTodos();
    updateTodoCounts();

    // 입력 필드 초기화
    todoInput.value = '';
  }
}

// 할 일 요소 생성 함수
function createTodoElement(text, completed) {
  const listItem = document.createElement('li');

  // 체크박스 생성
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.classList.add('todo-checkbox');
  checkbox.checked = completed;
  checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
      todoInputField.classList.add('completed');
      editButton.classList.add('completed');
      deleteButton.classList.add('completed');
    } else {
      todoInputField.classList.remove('completed');
      editButton.classList.remove('completed');
      deleteButton.classList.remove('completed');
    }
    saveTodos();
    updateTodoCounts(); // 체크박스 상태 변경 시 카운트 업데이트
  });

  // 할 일 텍스트를 위한 input 요소 생성
  const todoInputField = document.createElement('input');
  todoInputField.type = 'text';
  todoInputField.classList.add('todo-field');
  todoInputField.value = text;
  todoInputField.disabled = true;

  // 수정 버튼 생성
  const editButton = document.createElement('button');
  editButton.textContent = '수정';
  editButton.classList.add('edit-btn');
  editButton.addEventListener('click', () => {
    if (editButton.textContent === '수정') {
      todoInputField.disabled = false;
      todoInputField.focus();
      editButton.textContent = '저장';
    } else {
      todoInputField.disabled = true;
      editButton.textContent = '수정';
      saveTodos();
    }
  });

  // 삭제 버튼 생성
  const deleteButton = document.createElement('button');
  deleteButton.textContent = '삭제';
  deleteButton.classList.add('delete-btn');
  deleteButton.addEventListener('click', () => {
    deleteTodo(listItem);
    saveTodos();
    updateTodoCounts(); // 삭제 시 카운트 업데이트
  });

  // 버튼을 담을 div 생성
  const buttonDiv = document.createElement('div');
  buttonDiv.classList.add('todo-buttons');
  buttonDiv.appendChild(editButton);
  buttonDiv.appendChild(deleteButton);

  // <li>에 체크박스, input 텍스트 필드와 수정, 삭제 버튼 추가
  listItem.appendChild(checkbox);
  listItem.appendChild(todoInputField);
  listItem.appendChild(buttonDiv);

  // 완료 상태 적용
  if (completed) {
    listItem.classList.add('completed');
  }

  return listItem;
}

// 할 일 삭제 함수
function deleteTodo(listItem) {
  todoList.removeChild(listItem);
}

// 전체 삭제 함수
function clearAllTodos() {
  todoList.innerHTML = '';
  // 로컬 스트리지 업데이트
  saveTodos();
  // 전체 삭제 시 카운트 업데이트
  updateTodoCounts();
}

// 로컬 스토리지에 할 일 목록 저장
function saveTodos() {
  const todos = [];
  todoList.querySelectorAll('li').forEach(listItem => {
    const todoText = listItem.querySelector('input[type="text"]').value;
    const isCompleted = listItem.querySelector('input[type="checkbox"]').checked;
    todos.push({ text: todoText, completed: isCompleted });
  });
  localStorage.setItem('todos', JSON.stringify(todos));
}

// 로컬 스토리지에서 할 일 목록 불러오기
function loadTodos() {
  const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
  savedTodos.forEach(todo => {
    const listItem = createTodoElement(todo.text, todo.completed);
    todoList.appendChild(listItem);
  });
  updateTodoCounts(); // 페이지 로드 시 카운트 업데이트
}

// 할 일 개수 업데이트 함수
function updateTodoCounts() {
  const totalTodos = todoList.children.length;
  const completedTodos = todoList.querySelectorAll('input[type="checkbox"]:checked').length;
  todoCounts.textContent = `총 ${totalTodos} 개 완료 ${completedTodos} 개`;
}

// "+" 버튼 클릭 이벤트 리스너
addTodoBtn.addEventListener('click', addTodo);

// Enter 키를 눌러도 할 일 추가
todoInput.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    addTodo();
  }
});

// DOM 요소 가져오기: 전체 삭제 버튼
const clearAllBtn = document.getElementById('clear-all-btn');
clearAllBtn.addEventListener('click', clearAllTodos);
