window.addEventListener("DOMContentLoaded", (event) => {
    createInnerHtml();
  });
  
  //  Viewing Employee Payroll details in a Tabular Format from JS File using Template Literals.
  const createInnerHtml = () => {
    const CreateHeaderhtml =
      "<th>Profile Pic</th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th><th>Start Date</th><th>Actions</th>";
      let innerHTML = `${CreateHeaderhtml}`;
      let empData = createEmployeePayrollJSON();
      empData.forEach(empDataList=>{
          innerHTML = `${innerHTML} 
            <tr>
                <td><img src="${empDataList._profilePic}" alt="" class="profile"></td>
                <td>${empDataList._name}</td>
                <td>${empDataList._gender}</td>
                <td>${getDeptHtml(empDataList._department)}</td>
                <td>${empDataList._salary}</td>
                <td>${empDataList._startDate}</td>
                <td>
                  <img name="${empDataList._id}" src="../assets/icons/delete-black-18dp.svg" alt="delete" id="icon">
                  <img name="${empDataList._id}" src="../assets/icons/create-black-18dp.svg" alt="create" id="icon">  
                </td>
            </tr>
              
      `;
      });
    document.querySelector("#display-table").innerHTML = innerHTML;
  };
  //Returns a list of JSON Object
const createEmployeePayrollJSON = () => {
    let empPayrollList = [
        {
            _name: 'Ahamed',
            _gender: 'Male',
            _department: ['HR','Sales'],
            _salary: 250000,
            _startDate: '21 Sep 2020',
            _note: 'afdssdfs',
            _id: new Date().getTime(),
            _profilePic: '../assets/profile-images/Ellipse -2.png'
        },
        {
            _name: 'Xyz',
            _gender: 'Male',
            _department: ['Engineering', 'Sales'],
            _salary:350000,
            _startDate: '18 Aug 2021',
            _note: '',
            _id: new Date().getTime()+1,
            _profilePic: '../assets/profile-images/Ellipse -3.png'
        }
    ];
    return empPayrollList;
}
//Iterates the dept to populate dept column 
const getDeptHtml = (deptList) => {
    let deptHtml = '';
    for (const dept of deptList) {
        deptHtml = `${deptHtml}<div class="dept-label">${dept}</div>`
    }
    return deptHtml;
}