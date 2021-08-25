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
                <img name="${empDataList._name}" src="../assets/icons/delete-black-18dp.svg" alt="delete" id="icon" onclick="remove(this)">
                <img name="${empDataList._name}" src="../assets/icons/create-black-18dp.svg" alt="create" id="icon">  
            </td>
        </tr>      
    `;
    });
document.querySelector("#display-table").innerHTML = innerHtml;
};

//Iterates the dept to populate dept column 
const getDeptHtml = (deptList) => {
    let deptHtml = '';
    for (const dept of deptList) {
        deptHtml = `${deptHtml}<div class="dept-label">${dept}</div>`
    }
    return deptHtml;
}
const remove= (node) =>
{
  let employeePayrollData=empList.find(empData => empData._name == node.name);
  if(!employeePayrollData) return ;
  const index= empList.map(empData => empData._name).indexOf(employeePayrollData._name);
  empList.splice(index,1);
  localStorage.setItem("EmployeePayrollList",JSON.stringify(empList));
  document.querySelector(".emp-count").textContent=empList.length;
  createInnerHtml();
}