class TodoCounter {
  // todos should be the array of initial todos
  // selector is the selector for the counter text element
  constructor(todos, selector = ".counter__text") {
    this._element = document.querySelector(selector);
    this._completedTodos = todos.filter((todo) => todo.completed).length;
    this._total = todos.length;

    if (this._element) {
      this._updateText();
    } else {
      console.warn(`Element with selector "${selector}" not found.`);
    }
  }

  // Call this when a checkbox is clicked or a completed to-do is deleted
  updateCompleted = (increment) => {
    if (increment) {
      this._completedTodos += 1;
    } else {
      this._completedTodos -= 1;
    }
    this._updateText();
  };

  // Call this when a to-do is added or deleted
  updateTotal = (increment) => {
    if (increment) {
      this._total += 1;
    } else {
      this._total -= 1;
    }
    this._updateText();
  };

  _updateText() {
    this._element.textContent = `Showing ${this._completedTodos} out of ${this._total} completed`;
  }
}

export default TodoCounter;