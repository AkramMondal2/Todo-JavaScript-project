const input = document.querySelector("#input");
const button = document.querySelector("#button");
const outPut = document.querySelector("#outPut");
const all = document.querySelector("#all");
const active = document.querySelector("#active");
const completed = document.querySelector("#completed");
const clearCompleted = document.querySelector("#clearCompleted");

const todos = [];

const activeCompleted = () => {
  outPut.innerHTML = "";
  const activeTodos = [];
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].completed === false) {
      activeTodos.push(todos[i]);
    }
  }
  displayTodos(activeTodos);
};

const onlyCompleted = () => {
  outPut.innerHTML = "";
  const onlyCompletedTodos = [];
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].completed === true) {
      onlyCompletedTodos.push(todos[i]);
    }
  }
  displayTodos(onlyCompletedTodos);
};

const clearCompletedTodos = () => {
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].completed === true) {
      todos.splice(i, 1);
    }
  }
  displayTodos(todos);
};

const cheack = (inputVal) => {
  if (inputVal === "") {
    alert("Field can not be null");
    input.value = "";
    return false;
  }

  for (let i = 0; i < todos.length; i++) {
    if (todos[i].title.toLowerCase() === inputVal.toLowerCase()) {
      alert("already exist");
      input.value = "";
      return false;
    }
  }

  return true;
};

const deleteTodo = (id) => {
  todos.splice(id, 1);
  displayTodos(todos);
};

const completeTodo = (id) => {
  todos[id].completed = !todos[id].completed;
  displayTodos(todos);
};

const displayTodos = (todos) => {
  outPut.innerHTML = "";

  for (let i = 0; i < todos.length; i++) {
    const li = document.createElement("li");
    li.setAttribute(
      "class",
      `${todos[i].completed ? "listItems backGround" : "listItems"}`
    );
    outPut.appendChild(li);

    const span1 = document.createElement("span");
    span1.setAttribute(
      "class",
      `${todos[i].completed ? "lineThrough over" : "over"}`
    );
    span1.textContent = `${todos[i].title}`;
    li.appendChild(span1);

    const span2 = document.createElement("span");
    li.appendChild(span2);

    const doneBtn = document.createElement("button");
    doneBtn.textContent = "Done";
    doneBtn.setAttribute("class", "button");
    doneBtn.setAttribute("onclick", `completeTodo(${i})`);
    span2.appendChild(doneBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.setAttribute("class", "button");
    deleteBtn.setAttribute("onclick", `deleteTodo(${i})`);
    span2.appendChild(deleteBtn);
  }
};

const addTodos = () => {
  const inputVal = input.value.trim();
  if (cheack(inputVal)) {
    todos.push({
      title: inputVal,
      completed: false,
    });
  }
  input.value = "";
  displayTodos(todos);
};

button.addEventListener("click", addTodos);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTodos();
  }
});

all.addEventListener("click", () => {
  displayTodos(todos);
});

active.addEventListener("click", activeCompleted);
completed.addEventListener("click", onlyCompleted);
clearCompleted.addEventListener("click", clearCompletedTodos);
