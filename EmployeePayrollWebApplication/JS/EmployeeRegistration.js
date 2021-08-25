let isUpdate = false;//check wether this page is for update or add new employee
let employeePayrollObj = {};
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
    checkForUpdate();
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
  }
  const resetForm=()=>{
    setValue('#name','');
    unsetSelected('[name=profile]');
    unsetSelected('[name=gender]');
    unsetSelected('[name=department]');
    document.querySelector('#salary').value='';
    document.querySelector('#notes').value='';
    document.querySelector('#day').value='';
    document.querySelector('#month').value='';
    document.querySelector('#year').value='';
    setTextValue(".errorDate", "");
    setTextValue("#errorName", "");
    const salary = document.querySelector("#salary");
    const output = document.querySelector(".salary-output");
    output.textContent = 40000;
    alert("Reseted!");
}
const setValue=(id,value)=>{
    const element = document.querySelector(id);
    element.value=value;
}
const unsetSelected=(property)=>{
    let allItems = document.querySelectorAll(property);
    allItems.forEach(item=>{
        item.checked=false;
    });
}
const setSelectedValue=(property,value)=>{
    let allItems = document.querySelectorAll(property);
    allItems.forEach(items=>{
      if(Array.isArray(value)){
        if(value.includes(items.value)){
          items.checked=true;
        }
      }else if(items.value==value){
          items.checked=true;
      }
    });
  }
  //checks whether the page comes for update
  const checkForUpdate=()=>{
    const empPayrollJSON = localStorage.getItem('editEmp');
    isUpdate=empPayrollJSON?true:false;
    if(!isUpdate)return;
    employeePayrollObj=JSON.parse(empPayrollJSON);
    setForm();
  }
  //set form for updation
  const setForm=()=>{
    setValue('#name',employeePayrollObj._name);
    setSelectedValue('[name=profile]',employeePayrollObj._profilePic);
    setSelectedValue('[name=gender]',employeePayrollObj._gender);
    setSelectedValue('[name=department]',employeePayrollObj._dept);
    setValue('#salary',employeePayrollObj._salary);
    setValue('#notes',employeePayrollObj._notes);
    let date= stringifyDate(employeePayrollObj._startDate).split(" ");
    setValue('#day',date[0]);
    setValue('#month',date[1]);
    setValue('#year',date[2]);
  }