let empList;
window.addEventListener("DOMContentLoaded", (event) => {
    if(site_properties.use_local.match("true"))
        getEmployeePayrollFromLocalStorage();
    else
        getEmployeePayrollFromServer();
});
const getEmployeePayrollFromLocalStorage=()=>
{
    empList = localStorage.getItem("EmployeePayrollList") ? JSON.parse(localStorage.getItem("EmployeePayrollList")) : [];
    processResponse();
}
const processResponse = () =>{
    document.querySelector(".emp-count").textContent = empList.length;
    createInnerHtml();
    localStorage.removeItem('editEmp');
  }
  const getEmployeePayrollFromServer=()=>{
      makePromiseCall("GET",site_properties.server_url,true)
      .then(responseText=>{
        empList = JSON.parse(responseText);
        processResponse();
      }).catch(error=>{
        console.log("Get error Status: "+JSON.stringify(error));
        empList=[];
        processResponse();
      })
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
            <td>${empDataList._gender}</td>
            <td>${getDeptHtml(empDataList._dept)}</td>
            <td>₹ ${empDataList._salary}</td>
            <td>${stringifyDate(empDataList._startDate)}</td>
            <td>
                <img id="${empDataList.id}" src="../assets/icons/delete-black-18dp.svg" alt="delete" id="icon" onclick="remove(this)">
                <img id="${empDataList.id}" src="../assets/icons/create-black-18dp.svg" alt="create" id="icon" onclick="update(this)">  
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
  let employeePayrollData=empList.find(empData => empData.id == node.id);
  if(!employeePayrollData) return ;
  const index= empList.map(empData => empData.id).indexOf(employeePayrollData.id);
  empList.splice(index,1);
  localStorage.setItem("EmployeePayrollList",JSON.stringify(empList));
  document.querySelector(".emp-count").textContent=empList.length;
  createInnerHtml();
}
const update=(node)=>{
    let empPayrollData = empList.find(empData=>empData.id==node.id);
    if(!empPayrollData)return;
    localStorage.setItem('editEmp',JSON.stringify(empPayrollData));
    window.location.replace(site_properties.register_page);
  }

