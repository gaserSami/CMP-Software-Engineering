const employee = [
  { id: '1', name: 'Mohamed Sayed' },
];

exports.getEmployees = async (req, res, next) => {
  res.status(200).json({ data: employee });
};

// TODO
exports.deleteEmployee = async (req, res, next) => {
  const id = req.params.id; // get the id from the request params /: id
  const index = employee.findIndex((emp) => emp.id === id); // find the index of the employee with the given id
  employee.splice(index, 1); // remove the employee from the array using the index
  res.status(200).json({ message: 'Employee deleted' }); // send a response with a message
};

// TODO
exports.createEmployee = async (req, res, next) => {
  const id = req.body.id; // get the id from the request body {id: id, name: name}
  const name = req.body.name; // get the name from the request body {id: id, name: name}

  // check if the id already exists
  const idExists = employee.some((emp) => emp.id === id); // check if the id already exists in the array
  if(idExists){
    res.status(409).json({ message: 'Employee already exists' }); // send a response with a message
    return;
  }
  employee.push({ id: id, name: name }); // add the new employee to the array
  res.status(201).json({ message: 'Employee created' }); // send a response with a message
};
