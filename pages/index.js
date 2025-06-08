import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupEl.querySelector(".popup__form");

const counter = new TodoCounter(initialTodos, ".counter__text");

function handleCheck(completed) {
  counter.updateCompleted(completed);
}

function handleDelete(isCompleted) {
  counter.updateTotal(false);
  if (isCompleted) {
    counter.updateCompleted(false);
  }
}

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", handleCheck, handleDelete);
  return todo.getView();
};

const section = new Section({
  items: initialTodos,
  renderer: (item) => renderTodo(item),
  containerSelector: ".todos__list",
});

function renderTodo(item) {
  const todoElement = generateTodo(item);
  section.addItem(todoElement);
}

section.renderItems();

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (inputValues) => {
    const name = inputValues.name;
    const dateInput = inputValues.date;

    const date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const id = uuidv4();
    const values = { name, date, id };

    renderTodo(values);
    counter.updateTotal(true);

    newTodoValidator.resetValidation();
    addTodoForm.reset();
    addTodoPopup.close();
  },
});

addTodoPopup.setEventListeners();

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
