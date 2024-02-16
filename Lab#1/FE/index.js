// element references
// ==================
const nameInput = document.getElementById('name'); // get the name input field
const idInput = document.getElementById('id'); // get the id input field
const submitButton = document.querySelector('button[type="submit"]'); // get the submit button

// functions
// =========

// fetch employees from the BE
function fetchEmployees() {
  fetch('http://localhost:3000/api/v1/employee')
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('dataTable')
      tableBody.innerHTML = ''
      const list = data.data
      list.forEach(item => {
        const row = document.createElement("tr");
        const idCell = document.createElement("td");
        idCell.textContent = item.id;
        row.appendChild(idCell);

        const nameCell = document.createElement("td");
        nameCell.textContent = item.name;
        row.appendChild(nameCell);

        const deleteCell = document.createElement("td");
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("btn", "btn-danger", "btn-sm");
        deleteCell.appendChild(deleteButton);

        // TODO
        // add event listener to delete button
        deleteButton.addEventListener("click", (event) => {
          event.preventDefault(); // prevent the default behavior
          deleteEmployee(); // call deleteEmployee
        });

        row.appendChild(deleteCell);

        tableBody.appendChild(row);
      })
    })
    .catch(error => console.error(error))
}

// TODO
// create employee function
function createEmployee (){
  // get data from input field
  const id = document.getElementById('id').value; // get the id from the input field
  const name = document.getElementById('name').value; // get the name from the input field
  // send data to BE
  fetch('http://localhost:3000/api/v1/employee', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 
      id: id,
      name: name
    })
  })
  .then(response => {
    if(response.status === 409) {
      alert('Employee with this id already exists');
      throw new Error('Conflict');
    }
    return response.json();
  }) // parse the response as JSON
  .then(() => fetchEmployees()) // call fetchEmployees
  .catch(error => console.error(error)); // log any errors
}

// TODO
// delete employee function
function deleteEmployee (){
  // get id
  const id = (event.target.parentNode).parentNode.firstChild.textContent; // get the id from the input field
  // given that the row structure is like this:
  // <tr>
  //   <td>id</td>
  //   <td>name</td>
  //   <td>
  //     <button>Delete</button>
  //   </td>
  // </tr>
  // send id to BE
  fetch(`http://localhost:3000/api/v1/employee/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json()) // parse the response as JSON
  .then(() => fetchEmployees()) // call fetchEmployees
  .catch(error => console.error(error)); // log any errors
}

// initializing
// ============

fetchEmployees(); // call fetchEmployees initially

// event listeners
// ===============

// prevent the user from entering anything other than letters and spaces in the name input field
nameInput.addEventListener('keypress', (event) => {
  const key = String.fromCharCode(!event.charCode ? event.which : event.charCode); // get the key that was pressed
  const regex = /[A-Za-z\s]/; // accept only letters and spaces
  
  if (!regex.test(key)) { // if the key is not a letter or a space
     event.preventDefault(); // prevent the default behavior which is to add the character to the input field
     alert('name can only contain letters and spaces'); // alert the user that name can only contain letters and spaces
     return false; // return false
  }
});

// TODO
// add event listener to submit button
submitButton.addEventListener('click', (event) => {
  event.preventDefault(); // prevent the default form submission
  // check if the id or name is empty
  const id = document.getElementById('id').value; // get the id from the input field
  const name = document.getElementById('name').value; // get the name from the input field
  if(id === '' || name === ''){
    alert('Please fill in all fields'); // alert the user to fill in all fields
    return;
  }
  createEmployee(); // call createEmployee
});


