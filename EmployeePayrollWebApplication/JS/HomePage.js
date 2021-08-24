window.addEventListener("DOMContentLoaded", (event) => {
    createInnerHtml();
  });
  
  //  Viewing Employee Payroll details in a Tabular Format from JS File using Template Literals.
  const createInnerHtml = () => {
    const Headerhtml =
      "<th>Profile Pic</th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th><th>Start Date</th><th>Actions</th>";
    const innerHTML = `${Headerhtml} 
            <tr>
                <td class='profile-image'><img src="../assets/profile-images/Ellipse -1.png" alt="" class="profile"></td>
                <td>Ahamed</td>
                <td>Male</td>
                <td>
                <div class="dept-label">Engineer</div>
                <div class="dept-label">Sales</div>
                </td>
                <td>25000</td>
                <td>4 Sep 2020</td>
                <td class='icon'>
                <img src="../assets/icons/delete-black-18dp.svg" alt="delete icon" id="icon">
                <img src="../assets/icons/create-black-18dp.svg" alt="create icon" id="icon">  
                </td>
            </tr>
            <tr>
            <td><img src="../assets/profile-images/Ellipse -2.png" alt="" class="profile"></td>
            <td>Ashfaq</td>
            <td>Male</td>
            <td><div class="dept-label">Engineer</div>
            <td>450000</td>
            <td>15 Oct 2020</td>
            <td>
                <img src="../assets/icons/delete-black-18dp.svg" alt="delete" id="icon">
                <img src="../assets/icons/create-black-18dp.svg" alt="create" id="icon">  
            </td>
            </tr>
      `;
    document.querySelector("#display-table").innerHTML = innerHTML;
  };