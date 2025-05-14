class Todo {
    constructor(data, selector) {
      this._data = data;
      this._templateElement = document.querySelector(selector);
    }
  
    _setEventListeners() {
      this._todoCheckboxEl.addEventListener("change", () => {
        this._data.completed = this._todoCheckboxEl.checked;
        console.log(`Todo "${this._data.name}" completed:`, this._data.completed);
      });
  
      const todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");
      todoDeleteBtn.addEventListener("click", () => {
        this._todoElement.remove();
        console.log(`Todo "${this._data.name}" deleted.`);
      });
    }
  
    _generateCheckboxEl() {
      this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
      this._todoLabel = this._todoElement.querySelector(".todo__label");
      this._todoCheckboxEl.checked = this._data.completed;
      this._todoCheckboxEl.id = `todo-${this._data.id}`;
      this._todoLabel.setAttribute("for", `todo-${this._data.id}`);
    }
  
    getView() {
      this._todoElement = this._templateElement.content.querySelector(".todo").cloneNode(true);
  
      const todoNameEl = this._todoElement.querySelector(".todo__name");
      const todoDateEl = this._todoElement.querySelector(".todo__date");
  
    todoNameEl.textContent = this._data.name;

    const date = new Date(this._data.date);
    todoDateEl.textContent = this._data.date && !isNaN(date.getTime())
    ? date.toLocaleDateString()
    : "";
  
      this._generateCheckboxEl();
      this._setEventListeners();
  
      return this._todoElement;
    }
  }
  
  export default Todo;