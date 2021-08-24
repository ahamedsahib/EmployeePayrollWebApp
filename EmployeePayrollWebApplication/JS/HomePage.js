let empList;
window.addEventListener("DOMContentLoaded", (event) => {
  empList=getEmployeePayrollFromLocalStorage();
  document.querySelector(".emp-count").textContent = empList.length;
  createInnerHtml();
});
const getEmployeePayrollFromLocalStorage=()=>
{
    return localStorage.getItem("EmployeePayrollList") ? JSON.parse(localStorage.getItem("EmployeePayrollList")) : [];
}
//  Viewing Employee Payroll details in a Tabular Format from JS File using Template Literals.
const createInnerHtml = () => {
const CreateHeaderhtml =
    "<th>Profile Pic</th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th><th>Start Date</th><th>Actions</th>";
    let innerHtml = `${CreateHeaderhtml}` ;
    if(empList.length == 0)return;
    empList.forEach(empDataList=>{
        innerHtml=`${innerHtml}
        <tr>
            <td><img src="${empDataList._profilePic}" alt="" class="profile"></td>
            <td>${empDataList._name}</td>
            <td>${empDataList.Gender}</td>
            <td>${getDeptHtml(empDataList._dept)}</td>
            <td>₹ ${empDataList._salary}</td>
            <td>${stringifyDate(empDataList._startDate)}</td>
            <td>
                <img name="${empDataList._id}" src="../assets/icons/delete-black-18dp.svg" alt="delete" id="icon">
                <img name="${empDataList._id}" src="../assets/icons/create-black-18dp.svg" alt="create" id="icon">  
            </td>
        </tr>      
    `;
    });
document.querySelector("#display-table").innerHTML = innerHtml;
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