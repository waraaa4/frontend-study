
// 전역변수 선언
const todoInput = document.getElementById('todo-input');
const addTodoBtn = document.getElementById('add-todo-btn');
const todoList = document.getElementById('todo-list');
const todoCounts = document.getElementById('todo-counts'); // 할 일 개수 표시 요소

// 초기 로드 시 로컬 스토리지에서 할 일 목록 불러오기
document.addEventListener('DOMContentLoaded', loadTodos);

// 전체 삭제 버튼
const clearAllBtn = document.getElementById('clear-all-btn');
clearAllBtn.addEventListener('click', clearAllTodos);

// 할 일 추가 버튼
addTodoBtn.addEventListener('click', addTodo);

// 할 일 추가 함수
function addTodo() {
  // 할 일 텍스트의 양쪽 공백 제거
  // " 할 일 " -> "할 일"
  const todoText = todoInput.value.trim();

  // 할 일 텍스트가 작성되면 트루로 실행
  if (todoText !== '') {
    // 작성된 텍스트와 초기 체크상태를 
    // 할 일 요소 생성 함수에 전달
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
// end

// 할 일 요소 생성 함수
function createTodoElement(text, completed) {
  // li 태그 생성
  const listItem = document.createElement('li');

  // 체크박스 생성
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.classList.add('todo-checkbox');
  // 체크상태 확인
  checkbox.checked = completed;
  // 체크박스 상태 변경 시 이벤트 리스너 등록
  checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
      listItem.classList.add('completed');
    } else {
      listItem.classList.remove('completed');
    }
    // 로컬 스토리지 저장, 카운트 업데이트
    saveTodos();
    updateTodoCounts(); 
  });

  // 할 일 텍스트를 위한 input 요소 생성
  const todoInputField = document.createElement('input');
  todoInputField.type = 'text';
  todoInputField.classList.add('todo-field');
  todoInputField.value = text;
  // input 초기상태 클릭 안되게
  todoInputField.disabled = true;

  // 수정 버튼 생성
  const editButton = document.createElement('button');
  editButton.textContent = '수정';
  editButton.classList.add('edit-btn');
  // 수정 버튼 클릭 시 이벤트 리스너 등록
  editButton.addEventListener('click', () => {
    if (editButton.textContent === '수정') {
      todoInputField.disabled = false;
      todoInputField.focus();
      editButton.textContent = '저장';
    } else {
      todoInputField.disabled = true;
      editButton.textContent = '수정';
      // 로컬 스토리지에 업데이트
      saveTodos();
    }
  });

  // 삭제 버튼 생성
  const deleteButton = document.createElement('button');
  deleteButton.textContent = '삭제';
  deleteButton.classList.add('delete-btn');
  // 삭제 버튼 클릭 시 이벤트 리스너 등록
  deleteButton.addEventListener('click', () => {
    // 할 일 리스트 삭제
    todoList.removeChild(listItem);
    // 로컬 스토리지 업데이트
    saveTodos();
    // 삭제 시 카운트 업데이트
    updateTodoCounts(); 
  });

  // 버튼을 담을 div 생성
  const buttonDiv = document.createElement('div');
  buttonDiv.classList.add('todo-buttons');

  // div에 수정, 삭제 버튼 추가
  buttonDiv.appendChild(editButton);
  buttonDiv.appendChild(deleteButton);

  // li에 체크박스, input 텍스트 필드와 div 추가
  listItem.appendChild(checkbox);
  listItem.appendChild(todoInputField);
  listItem.appendChild(buttonDiv);

  // 페이지 로드 시 로컬 스토리지에 
  // 트루로 저장되어 있으면 클래스 추가
  if (completed) {
    listItem.classList.add('completed');
  }

  return listItem;
} 
// end

// 전체 삭제 함수
function clearAllTodos() {
  // ul 안에 li 모두 제거
  todoList.innerHTML = '';
  // 로컬 스트리지 업데이트
  saveTodos();
  // 전체 삭제 시 카운트 업데이트
  updateTodoCounts();
}
// end

// 로컬 스토리지에 할 일 목록 저장
function saveTodos() {
  // 빈 배열 생성
  const todos = [];
  // todoList 내의 모든 li 요소를 순회
  todoList.querySelectorAll('li').forEach(listItem => {
    // 각 li 요소 내의 텍스트와 완료 상태를 추출
    const todoText = listItem.querySelector('input[type="text"]').value;
    const isCompleted = listItem.querySelector('input[type="checkbox"]').checked;
    // 텍스트와 완료 상태를 객체로 만들어 배열에 추가
    todos.push({ text: todoText, completed: isCompleted });
  });
  // todos 배열을 JSON 문자열로 변환하여 로컬 스토리지에 저장
  localStorage.setItem('todos', JSON.stringify(todos));
}
// end

// 로컬 스토리지에서 할 일 목록 불러오기
function loadTodos() {
  // 로컬 스토리지에서 todos 키에 저장된 데이터를 가져옴
  // 값이 없는 경우 빈 배열 가져옴
  const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
  // 저장된 할 일 목록이 있는 경우 각 항목을 반복하여 처리
  savedTodos.forEach(todo => {
    // 각 할 일 항목을 HTML 요소로 변환하고 화면에 추가
    const listItem = createTodoElement(todo.text, todo.completed);
    todoList.appendChild(listItem);
  });
  // 페이지 로드 시 카운트 업데이트
  updateTodoCounts(); 
}
// end

// 할 일 개수 업데이트 함수
function updateTodoCounts() {
  const totalTodos = todoList.children.length;
  const completedTodos = todoList.querySelectorAll('input[type="checkbox"]:checked').length;
  todoCounts.textContent = `총 ${totalTodos}개 완료 ${completedTodos}개`;
}
// end