const urlinput = document.querySelector("input[name=url]");
const employeeimage = document.getElementById("employeeimage");

urlinput.addEventListener("input", () => {
  let url = urlinput.value;
  if(!url){
      employeeimage.src = "./images/anonymous-user.webp"
  }else{
     employeeimage.src = url;
  }
});

const addemployee = document.getElementById("addemployee");
const addemployeemodal = document.getElementById("addemployeemodal");
const cancel = document.getElementById("cancel");
const experiencesform = document.getElementById("experiences");
const addexperiencebtn = document.querySelector(".addexperience");
const Employeeform = document.getElementById("Employeeform");
const employees = document.getElementById("employees");
const modal = document.querySelector(".modal")


addemployee.addEventListener("click", () => {
  addemployeemodal.classList.remove("hidden");
});

// Closing modal
cancel.addEventListener("click", (e) => {
  e.preventDefault();
  addemployeemodal.classList.add("hidden");
  const allexpforms = experiencesform.querySelectorAll(".expform");
  allexpforms.forEach((exp,index)=>{
    if(index>0){
      exp.remove()
    }
  })
  Employeeform.reset();
});

addexperiencebtn.addEventListener("click", (e) => {
  e.preventDefault();

  experiencesform.insertAdjacentHTML(
    "beforeend",
    `
<div class="expform border border-gray-400 rounded-[11px] p-4 mt-2.5">
                            <input class="border-gray-300  rounded-md mb-2 border-2 w-full h-[42px] py-2 px-3"
                                name="jobtitle" type="text" placeholder="Job Title">
                            <p class="error text-red-400 text-[12px] w-full hidden" id="nameerror">Job title must be at least 6 characters.</p>
                            <input class="border-gray-300  rounded-md mb-2 mt-2.5 border-2 w-full h-[42px] py-2 px-3"
                                name="Company / Organization" type="text" placeholder="Company / Organization">
                            <p class="error text-red-400 text-[12px] w-full hidden" id="nameerror">Only letters, numbers, spaces, .-'& allowed.</p>

                            <div class="flex flex-col xl:flex-row gap-1.5 mt-2.5">
                                <div><label class="block mb-1" for="Sdate">Start Date</label>
                                    <input class="border-gray-300  rounded-md mb-2 border-2 w-full h-[38px] py-2 px-3"
                                        name="phone" type="date">
                                </div>
                                <div><label class="block mb-1 " for="Edate">End Date</label>
                                    <input class="border-gray-300  rounded-md mb-2 border-2 w-full h-[38px] py-2 px-3"
                                        name="phone" type="date">
                                </div>
                            </div>
                            <textarea class="border-gray-300 rounded-md mt-2.5 border-2 w-full py-2 px-3" rows="2"
                                name="Description" id="Description" placeholder="Description"></textarea>
                                <p class="error text-red-400 text-[12px] w-full hidden" id="nameerror">Only letters, numbers, spaces, .-'& allowed.</p>
                            
                        </div>
`
  );
});

//display employees in the side bar
const emp = [
  {
    id: 1,
    name: "Harry Potter",
    image: "./images/profiles/harry.webp",
    role: "Manager",
  },
  {
    id: 1,
    name: "Harry Potter",
    image: "./images/profiles/harry.webp",
    role: "Manager",
  },
];

function displayemployees(infos) {
  employees.innerHTML = "";

  infos.forEach((emp) => {
    employees.innerHTML += `
    <div class="employee flex items-center gap-4.5 w-full h-16 mt-3 border-l-4 border-[#2A0404] rounded-[5px] shadow-md hover:shadow-lg transition duration-300 hover:ease-in hover:scale-102 p-3 cursor-pointer">
                        <img class="w-12 h-12 rounded-[50%] object-cover" src="${emp.image}" alt="profile-image">
                        <div class="nameandrole flex flex-col gap-0.5">
                            <h1 class="text-[16px] font-medium">${emp.name}</h1>
                            <p class="text-[12px] text-gray-400 font-light">${emp.role}</p>
                        </div>
                    </div>
    `;
  });
}

displayemployees(emp);


// validate inputs
function validate(input, regex) {
  
  const errorm = input?.nextElementSibling;

  if (errorm) {
    if (!regex.test(input.value.trim()) && input.value) {
    input.classList.add("border-red-500");
    errorm.classList.remove("hidden");
    errorm.classList.add("fade-in");

    return false;
  } else {
    input.classList.remove("border-red-500");
    errorm.classList.add("hidden");
    errorm.classList.remove("fade-in");
    return true;
  }
  }
}

function validateEmployyeform(){
  const name = modal.querySelector("input[name]")
  const email = modal.querySelector("input[name=email]")
  const phone = modal.querySelector("input[name=phone]")
  
  allValid = true

  const nameregex = /^[A-Za-z]{6,}$/;
  const emailregex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phoneregex = /^(?:\+212|0)(6|7)[0-9]{8}$/;  

  const validname = validate(name ,nameregex)

  const validemail = validate(email ,emailregex)

  const validphone = validate(phone ,phoneregex)

  if(!validname || validemail || validphone){
    allValid = false;
  }
  allValid = true;
}

function validateallexp() {
const allexpforms = experiencesform.querySelectorAll(".expform");
    
let allValid = true;

    const jobregex = /^[A-Za-z]{2,}$/;
    const companyregex = /^[A-Za-z .&'-]{2,14}$/;
    const descregex = /^\s*\S.+$/;

    allexpforms.forEach((exp) => {
      const allinputs = exp.querySelectorAll("input");
      const exptextarea = exp.querySelector("textarea");

      const jobtitle = allinputs[0];
      const company = allinputs[1];
      const startdate = allinputs[2];
      const enddate = allinputs[3];

      const validjobtitle = validate(jobtitle, jobregex);

      const validcompany = validate(company, companyregex);

      const validdescrp = validate(exptextarea, descregex);

      if (!validjobtitle || !validcompany || !validdescrp) {
        allValid = false;
      }
    });

    return allValid;
  }

// Event for typing in form and exp
Employeeform.addEventListener("input", () => {
  validateallexp()
  validateEmployyeform()
}); 
 
// Event for the submit button
Employeeform.addEventListener("submit", (e) => {
  e.preventDefault();
  const roleselect = modal.querySelector("select[name=roles]")
    
  if (!roleselect.value) {
    alert("Please select a role.");
    return;
  }

  if (!validateallexp()) {
    alert("Please fix the highlighted fields.");
    return;
  }

  if (!validateEmployyeform()) {
    alert("Please fix the highlighted fields.");
    return;
  }
}); 