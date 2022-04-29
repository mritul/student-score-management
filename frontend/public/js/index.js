//We wrap under ifs as we use same index.js in both pages
const addForm = document.querySelector("#add-student");

if (addForm) {
  addForm.addEventListener("submit", (e) => {
    console.log(addForm);
    window.alert("Student record added succesfully");
  });
}

const updateForm = document.querySelector("#update-student");
if (updateForm) {
  updateForm.addEventListener("submit", (e) => {
    e.preventDefault();
    var data = {};
    var formDetailsArr = $("#update-student").serializeArray(); //jQuery makes it easier for us to serialize form-details
    formDetailsArr.forEach((detail) => {
      data[detail.name] = detail.value;
    });
    //Also note that we put id and port we have in backend, inside hidden input in form so that we can access it here in frontend

    //Since PUT and DELETE cannot be performed through form we do it in frontend javascript

    var request = {
      url: `http://localhost:${data.port}/api/students/${data.id}`,
      method: "PUT",
      data: data,
    };

    $.ajax(request).done((response) => {
      alert("Data updated succesfully");
    });
  });
}
if (window.location.pathname == "/") {
  const deleteBtn = document.querySelectorAll(".deleteBtn");
  deleteBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-target");
      const port = btn.getAttribute("data-port");
      var request = {
        url: `http://localhost:${port}/api/students/${id}`,
        method: "DELETE",
      };
      if (window.confirm("Do you really want to delete the record?")) {
        $.ajax(request).done((response) => {
          alert("Data deleted successfully");
          location.reload();
        });
      }
    });
  });
}
