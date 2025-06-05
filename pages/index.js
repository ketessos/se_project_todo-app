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
const todosList = document.querySelector(".todos__list");

const counter = new TodoCounter(initialTodos, ".counter__text");

const addTodoPopup = new PopupWithForm({ 
  popupSelector: "#add-todo-popup", 
  handleFormSubmit: (inputValues) => {
    const name = inputValues.name;
    const dateInput = inputValues.date;

    const date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const id = uuidv4();

    const values = { name, date, id };
    const todo = generateTodo(values);
    section.addItem(todo);

    newTodoValidator.resetValidation();
    addTodoForm.reset();

    addTodoPopup.close();
  },
});

addTodoPopup.setEventListeners();

function handleCheck(completed) {
  counter.updateCompleted(completed);
}

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", handleCheck);
  const todoElement = todo.getView();
  return todoElement;
};

const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    const todoElement = generateTodo(item);
    section.addItem(todoElement);
  },
  containerSelector: ".todos__list",
});
section.renderItems();

addTodoButton.addEventListener("click", () => {
 addTodoPopup.open();
});

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
