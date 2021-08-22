class EmployeePayrollData {

    get empName(){
        return this._name;
    }
    set empName(value){
        let namePattern = RegExp("^[A-Z]{1}[a-z]{2,}$");
        if(namePattern.test(value)){
        this._name=value;
        }
        else{
            throw "Invalid Name";
        }
    }
    get profilePic(){
        return this._profilePic;
    }
    set profilePic(value){
        this._profilePic=value;
    }
    get gender(){
        return this._gender;
    }
    set gender(value){
        return this._gender=value;
    }
    get Department(){
        return this._dept;
    }
    set Department(value){
        this._dept=value;
    } 
    get salary(){
        return this._salary;
    }
    set salary(value){
        this._salary=value;
    }
    get startDate(){
        return this._startDate;
    }
    set startDate(value){
        if(value>new Date())
            throw "Start Date is a future date";
        var diff = Math.abs(new Date().getTime() - value.getTime());
        if(diff/(1000*60*60*24)>30)
            throw 'Start Date is Beyond 30 days';
        return this._startDate=value;
    }
    get EmployeeNotes(){
        return this._notes;
    }
    set EmployeeNotes(value){
        this._notes=value;
    }
    toString(){
        const option = {year:'numeric', month:'long', day:'numeric'};
        const empDate = this.startDate?this.startDate.toLocaleDateString("en-US",option):"undefined";
        return "Empname = "+this.empName+" Gender: "+this.Gender+" Profile Pic: "+this.profilePic+" Department: "+this.Department+" Salary: "+this.salary+
        " startDate: "+empDate+" Note: "+this.EmployeeNotes;
    }

}
//module.exports = {EmployeePayrollData};