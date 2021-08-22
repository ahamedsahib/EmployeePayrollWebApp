//Salary range setter
const salary = document.querySelector("#salary");
const output = document.querySelector(".salary-output");
output.textContent = salary.value;
salary.addEventListener("input", function () {
  output.textContent = salary.value;
});


const onSubmit=()=>{
    let employee = new EmployeePayrollData();
    try{
    employee.empName= document.getElementById("name").value;
    employee.profilePic=getSelectedValues('[name = profile]').pop();
    employee.gender=getSelectedValues('[name = gender]').pop();;
    employee.salary = document.getElementById("salary").value;
    employee.startDate=document.getElementById("day").value+" "+document.getElementById("month").value+" "+document.getElementById("year").value;
    alert(employee.toString());
        
}catch(e){
        alert(e);
        console.log(employee.empName);
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
