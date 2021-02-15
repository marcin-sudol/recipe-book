class Popup {
  constructor(updateTabIndexCallback) {
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.updateTabIndexCallback = updateTabIndexCallback;
    // should be assigned in extending class
    this.popupContainer = undefined;
    this.popupWindow = undefined;
  }

  open() {
    this.popupContainer.classList.add("visible");
    this.popupWindow.style.display = "flex";
    this.popupWindow
      .animate(
        {
          opacity: [0, 1],
          transform: ["translateY(-100px)", "translateY(0px)"],
        },
        { duration: 400, easing: "ease-out" }
      )
      .finished.then(this.updateTabIndexCallback);
  }

  close() {
    this.popupWindow.style.display = "none";
    this.popupContainer.classList.remove("visible");
    this.updateTabIndexCallback();
  }

  isVisible() {
    return this.popupContainer.classList.contains("visible");
  }
}

// -------------------------------------------------------
// EDIT POPUP
// -------------------------------------------------------
class EditPopup extends Popup {
  constructor(saveRecipeCallback, updateTabIndexCallback) {
    super(updateTabIndexCallback);

    this.addStep = this.addStep.bind(this);
    this.removeStep = this.removeStep.bind(this);
    this.clear = this.clear.bind(this);
    this.submit = this.submit.bind(this);
    this.popupContainer = document.getElementById("popup-edit-container");
    this.popupWindow = document.getElementById("popup-edit-window");
    this.popupEditForm = document.getElementById("popup-edit-form");
    this.inputStepsList = document.getElementById("input-steps-list");
    this.formValidationWarning = document.getElementById(
      "form-validation-warning"
    );
    this.obj = undefined;
    this.saveRecipeCallback = saveRecipeCallback;
    document.getElementById("add-step-button").onclick = this.addStep;
    document.getElementById("remove-step-button").onclick = this.removeStep;
    document.getElementById("edit-ok-button").onclick = this.submit;
    document.getElementById("edit-clear-button").onclick = this.clear;
    document.getElementById("edit-cancel-button").onclick = this.close;
    this.addStep();
  }

  open(obj) {
    this.obj = obj;
    if (obj === undefined) {
      this.clear();
    } else {
      this.clearValidation();
      this.load();
    }
    super.open();
  }

  addStep() {
    const item = document.createElement("li");
    item.className = "input-steps-item";
    const nextId = this.inputStepsList.childElementCount + 1;
    item.innerHTML = `<input type="text" class="input-step-name" id="input-step-${nextId}" placeholder="Enter step">
    <div class="input-step-break"></div>
    <label class="input-time-label" for="input-time-${nextId}"><i class="far fa-clock"></i><span>minutes:</span></label>
    <input class="input-step-time" id="input-time-${nextId}" type="number" placeholder="min" min="5" max="180" step="5">`;
    this.inputStepsList.appendChild(item);

    item.animate(
      [
        { opacity: 0, maxHeight: "0px" },
        { opacity: 0, maxHeight: "100px" },
        { opacity: 1 },
      ],
      {
        duration: 100,
        easing: "ease-in",
      }
    );
  }

  removeStep() {
    if (this.inputStepsList.childElementCount > 1) {
      const item = this.inputStepsList.lastElementChild;

      item
        .animate(
          [
            { opacity: 1 },
            { opacity: 0, maxHeight: "100px" },
            { opacity: 0, maxHeight: "0px" },
          ],
          {
            duration: 100,
            easing: "ease-out",
          }
        )
        .finished.then(() => {
          this.inputStepsList.removeChild(item);
        });
    }
  }

  removeAllSteps() {
    while (this.inputStepsList.childElementCount > 1) {
      this.inputStepsList.removeChild(this.inputStepsList.lastElementChild);
    }
  }

  load() {
    if (this.obj !== undefined) {
      this.removeAllSteps();
      document.getElementById("input-name").value = this.obj.name;
      document.getElementById("input-ingredients").value = this.obj.ingredients;
      for (let i = 1; i < this.obj.steps.length; i++) {
        this.addStep();
      }
      for (let i = 0; i < this.obj.steps.length; i++) {
        document.getElementById("input-step-" + (i + 1)).value = this.obj.steps[
          i
        ].name;
        document.getElementById("input-time-" + (i + 1)).value = this.obj.steps[
          i
        ].time;
      }
    }
  }

  clear() {
    this.clearValidation();
    this.removeAllSteps();
    const fields = this.popupEditForm.querySelectorAll("input, textarea");
    for (let elem of fields) {
      elem.value = "";
    }
  }

  validate() {
    const fields = this.popupEditForm.querySelectorAll("input, textarea");
    const minutes = this.popupEditForm.getElementsByClassName("input-time");
    let result = true;
    for (let elem of fields) {
      elem.classList.remove("incorrect");
      if (elem.value === "" || elem.value === undefined) {
        elem.classList.add("incorrect");
        result = false;
      }
    }

    for (let elem of minutes) {
      let val = parseInt(elem.value);
      if (Number.isInteger(val))
        if (val < elem.min || val > elem.max) {
          elem.classList.add("incorrect");
          result = false;
        }
    }

    if (!result) this.formValidationWarning.classList.add("visible");
    else this.formValidationWarning.classList.remove("visible");
    return result;
  }

  clearValidation() {
    this.formValidationWarning.classList.remove("visible");
    const fields = this.popupEditForm.querySelectorAll("input, textarea");
    for (let elem of fields) {
      elem.classList.remove("incorrect");
    }
  }

  export() {
    const newObj = {
      name: document.getElementById("input-name").value,
      ingredients: document.getElementById("input-ingredients").value,
      steps: [],
    };
    if (this.obj !== undefined) {
      newObj.id = this.obj.id;
      newObj.rating = Object.assign({}, this.obj.rating);
    } else {
      newObj.rating = { sum: 0, votes: 0 };
    }
    for (let i = 0; i < this.inputStepsList.childElementCount; i++) {
      newObj.steps.push({
        name: document.getElementById("input-step-" + (i + 1)).value,
        time: document.getElementById("input-time-" + (i + 1)).value,
      });
    }
    return newObj;
  }

  submit() {
    if (this.validate()) {
      this.close();
      this.saveRecipeCallback(this.export());
    }
  }

  focus() {
    document.getElementById("input-name").focus();
  }
}

// -------------------------------------------------------
// DELETE POPUP
// -------------------------------------------------------
class DeletePopup extends Popup {
  constructor(deleteRecipeCallback, updateTabIndexCallback) {
    super(updateTabIndexCallback);
    this.open = this.open.bind(this);
    this.submit = this.submit.bind(this);
    this.popupContainer = document.getElementById("popup-delete-container");
    this.popupWindow = document.getElementById("popup-delete-window");
    this.obj = undefined;
    this.deleteRecipeCallback = deleteRecipeCallback;
    document.getElementById("delete-ok-button").onclick = this.submit;
    document.getElementById("delete-cancel-button").onclick = this.close;
  }

  open(obj) {
    this.obj = obj;
    super.open();
  }

  submit() {
    this.close();
    this.deleteRecipeCallback(this.obj);
  }
  focus() {
    document.getElementById("delete-ok-button").focus();
  }
}
