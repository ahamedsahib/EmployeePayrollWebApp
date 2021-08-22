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
        this._startDate=value;
    }
    toString(){
        const option = {year:'numeric', month:'long', day:'numeric'};
        const empDate = this.startDate?"undefined":this.startDate.toLocaleDateString("en-US",option);
        return "Empname = "+this.empName+" Profile Pic: "+this.profilePic+"Gender:"+this.gender+" Salary: "+this.salary+
        " startDate: "+this.startDate;
    }

}
module.exports = {EmployeePayrollData};