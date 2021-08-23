window.addEventListener('DOMContentLoaded',(event)=>{
    const name = document.querySelector("#name");
    name.addEventListener('input',function(){
        if(name.value.length == 0){
               setTextValue('#errorName',"");
               return;
        }
        try{
            (new EmployeePayrollData()).empName= name.value;
            setTextValue('#errorName',"");
        }catch(e){
            setTextValue('#errorName',e);
        }
    });
    // salary range setter
    const salary = document.querySelector("#salary");
    const output = document.querySelector(".salary-output");
    output.textContent = salary.value;
    salary.addEventListener("input", function () {
      output.textContent = salary.value;
    });
    //validates the date
    const date = document.querySelector('.Date');
    date.addEventListener('input',function(){
        let startDate = getInputValue('day')+" "+getInputValue('month')+" "+getInputValue('year');
        try{
            (new EmployeePayrollData()).startDate = new Date(Date.parse(startDate));
            setTextValue('.errorDate',"");
        }catch(e){
            setTextValue('.errorDate',e);
        }
    })
  });
//save create and save payroll object
const save = () => {
    try {
      let employeePayrollData = EmployeePayroll();
      CreateOrUpdateLocal(employeePayrollData);
    } catch (e) {
      return;
    }
  };
//onSubmit validates this function
const EmployeePayroll=()=>{
    let employee=new EmployeePayrollData;
    try{
    employee.empName= getInputValue('name');
    employee.profilePic=getSelectedValues('[name = profile]').pop();
    employee.salary = getInputValue("salary");
    let date = getInputValue('day')+" "+getInputValue('month')+" "+getInputValue('year');
    employee.Gender = getSelectedValues('[name = gender]').pop();
    employee.Department = getSelectedValues('[name = department]');
    employee.EmployeeNotes = getInputValue("notes");
    employee.startDate=new Date(date);
    try{
    employee.startDate = new Date(Date.parse(date));
    }catch(e){
        setTextValue('.errorDate',e);
        throw e;
    }
    alert(employee.toString());
    return employee;
        
}catch(e){
        alert(e);
    }
   
};
//selects value for radio buttons
const getSelectedValues = (values)=>{
    let items = document.querySelectorAll(values);
    let selectedItem = [];
    items.forEach(item=>{
        if(item.checked)
        selectedItem.push(item.value);
    });
    return selectedItem;
}
const setTextValue=(id,value)=>{
    const attribute = document.querySelector(id);
    attribute.textContent=value;
}
const getInputValue = (id)=>{
    let value = document.getElementById(id).value;
    return value;
}
const CreateOrUpdateLocal = (employeePayrollData) => {
    //JSON Object
    let employeeList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if (employeeList != undefined) {
      employeeList.push(employeePayrollData);
    } else {
      employeeList = [employeePayrollData];
    }
    //JSON to String
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeeList));
  };