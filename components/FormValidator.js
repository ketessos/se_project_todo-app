class FormValidator {
  constructor(settings, formEl) {
    this._inputSelector = settings.inputSelector;
    this._formSelector = settings.formSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._errorClass = settings.errorClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._formEl = formEl;
  }

  _checkInputValidity(inputElement) {
    const errorElement = this._formEl.querySelector(
      `#${inputElement.id}-error`
    );

    if (!inputElement.validity.valid) {
      inputElement.classList.add(this._inputErrorClass);
      errorElement.textContent = inputElement.validationMessage;
      errorElement.classList.add(this._errorClass);
    } else {
      inputElement.classList.remove(this._inputErrorClass);
      errorElement.textContent = "";
      errorElement.classList.remove(this._errorClass);
    }
  }

  _toggleButtonState() {
    const hasInvalidInput = this._inputList.some(
      (input) => !input.validity.valid
    );

    if (hasInvalidInput) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  setEventListeners() {
    this._inputList = Array.from(
      this._formEl.querySelectorAll(this._inputSelector)
    );

    this._buttonElement = this._formEl.querySelector(
      this._submitButtonSelector
    );
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._formEl.addEventListener("submit", (evt) => {
      this.resetValidation();
      evt.preventDefault();
    });
    this.setEventListeners();
  }

  resetValidation() {
    this._inputList.forEach((inputElement) => {
      const errorElement = this._formEl.querySelector(
        `#${inputElement.id}-error`
      );
      inputElement.classList.remove(this._inputErrorClass);
      errorElement.textContent = "";
      errorElement.classList.remove(this._errorClass);
    });
    this._toggleButtonState();
  }
}

export default FormValidator;
