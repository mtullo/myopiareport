// selecting all required elements
const dropArea = document.querySelector(".drag-area"),
  button = dropArea.querySelector("button"),
  input = dropArea.querySelector("input");

let imported = false;
console.log(imported);

// ***DRAG AND DROP***
//if user drags file over DragArea
dropArea.addEventListener("dragover", (event) => {
  event.preventDefault(); //prevents default interaction
  //   console.log("File is over drag area");
  dropArea.classList.add("active");
});

//if user leaves dragged file from DragArea
dropArea.addEventListener("dragleave", () => {
  //   console.log("File is NOT over drag area");
  dropArea.classList.remove("active");
});

//if user drops file in DragArea
dropArea.addEventListener("drop", (event) => {
  event.preventDefault(); //prevents default interaction
  //   console.log("File is dropped in drag area");

  uploadedFile = event.dataTransfer.files[0];
  console.log(uploadedFile);
  if (
    uploadedFile.type === "exportData.JSON"
    // uploadedFile.type !== "application/x-javascript"
  ) {
    console.log("wrong file");
    alert("Wrong file type == " + uploadedFile.type);
    return false;
  }

  if (uploadedFile) {
    var readFile = new FileReader();
    readFile.onload = function (e) {
      var contents = e.target.result;
      var json = JSON.parse(contents);
      displayData(json);
    };
    readFile.readAsText(uploadedFile);
  } else {
    console.log("Failed to load file");
  }
});
//***BROWSE FILES***
//on click that copies the same functionality of the drag and drop. Uses file instead of uploaded file.

let file;

button.onclick = () => {
  input.click();
};
input.addEventListener("change", function () {
  file = this.files[0];
  if (file) {
    var readFile = new FileReader();
    readFile.onload = function (e) {
      var contents = e.target.result;
      var json = JSON.parse(contents);
      displayData(json);
    };
    readFile.readAsText(file);
  } else {
    console.log("Failed to load file");
  }
});

function displayData(json) {
  imported = true;
  //first name
  document.getElementById("patient-name-first").innerHTML =
    json.patients[0]?.first_name;
  //first name
  document.getElementById("patient-name-last").innerHTML =
    json.patients[0]?.last_name;

  //Right
  //SEQ
  document.getElementById("r-objective_seq").innerHTML =
    `SEQ: ` + json.patients[0]?.examinations[0]?.objective_seq + ` D`;
  //Sphere
  document.getElementById("r-objective_sphere").innerHTML =
    `Sphere: ` + json.patients[0]?.examinations[0]?.objective_sphere + ` D`;
  //Clyinder
  document.getElementById("r-objective_cylinder").innerHTML =
    `Cylinder: ` + json.patients[0]?.examinations[0]?.objective_cylinder + ` D`;
  //Axis
  document.getElementById("r-objective_axis").innerHTML =
    `Axis: ` +
    json.patients[0]?.examinations[0]?.objective_axis +
    ` <span>&#176;</span>`;
  //Axial Length
  document.getElementById("r-axial_length").innerHTML =
    `Axial Length: ` + json.patients[0]?.examinations[0]?.axial_length + ` mm`;
  //Kera Power
  document.getElementById("r-kera-power").innerHTML =
    `Keratometric Power: ` +
    json.patients[0]?.examinations[0]?.kera_astigmatism +
    ` D`;

  //Left
  //SEQ
  document.getElementById("l-objective_seq").innerHTML =
    `SEQ: ` + json.patients[0]?.examinations[1]?.objective_seq + ` D`;
  //Sphere
  document.getElementById("l-objective_sphere").innerHTML =
    `Sphere: ` + json.patients[0]?.examinations[1]?.objective_sphere + ` D`;
  //Clyinder
  document.getElementById("l-objective_cylinder").innerHTML =
    `Cylinder: ` + json.patients[0]?.examinations[1]?.objective_cylinder + ` D`;
  //Axis
  document.getElementById("l-objective_axis").innerHTML =
    `Axis: ` +
    json.patients[0]?.examinations[1]?.objective_axis +
    ` <span>&#176;</span>`;
  //Axial Length
  document.getElementById("l-axial_length").innerHTML =
    `Axial Length: ` + json.patients[0]?.examinations[1]?.axial_length + ` mm`;
  //Kera Power
  document.getElementById("l-kera-power").innerHTML =
    `Keratometric Power: ` +
    json.patients[0]?.examinations[1]?.kera_astigmatism +
    ` D`;
}
function printScreen() {
  // document.getElementsByClassName("form-check").style.display = "none";
  window.print();
}
