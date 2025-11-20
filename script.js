const KEY = "Gryffindor_Gather";

let employeesarr = load();

function save(object) {
  employeesarr.push(object);
  localStorage.setItem(KEY, JSON.stringify(employeesarr));
}

function load() {
  return JSON.parse(localStorage.getItem(KEY) || "[]");
}

const urlinput = document.querySelector("input[name=url]");
const employeeimage = document.getElementById("employeeimage");
urlinput.addEventListener("input", () => {
  let url = urlinput.value;
  if (!url) {
    employeeimage.src = "./images/anonymous-user.webp";
  } else {
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
const modal = document.querySelector(".modal");


addemployee.addEventListener("click", () => {
  addemployeemodal.classList.remove("hidden");
});

// Closing modal Event
cancel.addEventListener("click", (e) => {
  e.preventDefault();
  clearfomr();
});

//the function for clearing the form
function clearfomr() {
  addemployeemodal.classList.add("hidden");
  const allexpforms = experiencesform.querySelectorAll(".expform");
  allexpforms.forEach((exp, index) => {
    if (index > 0) {
      exp.remove();
    }
  });
  Employeeform.reset();
}

//the ecvent for adding exprience form

addexperiencebtn.addEventListener("click", (e) => {
  e.preventDefault();

  experiencesform.insertAdjacentHTML(
    "beforeend",
    `
<div class="expform border border-gray-400 rounded-[11px] p-4 mt-2.5 relative">
                            <i class="removeexpbtn fa-solid fa-circle-minus text-2xl text-[#E53E3E] hover:text-[#C53030] absolute -right-2.5 -top-1.5"></i>
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

// remove exp int the form btn
experiencesform.addEventListener("click", (e) => {
  if(e.target.classList.contains("removeexpbtn")){
    e.target.parentElement.remove();
  }
});

//fucntion for displaying employees in the side bar

function displayemployees(infos) {
  employees.innerHTML = "";
  let filtreddata = infos.filter(e => e.status === "unsigned")
  filtreddata.forEach((emp) => {
    employees.innerHTML += `
    <div onclick="displayinfos('${emp.id}')" class="employee flex items-center gap-4.5 w-full h-16 mt-3 border-l-4 border-[#2A0404] rounded-[5px] shadow-md hover:shadow-lg transition duration-300 hover:ease-in hover:scale-102 p-3 cursor-pointer">
                        <img class="w-12 h-12 rounded-[50%] object-cover" src="${emp.url}" alt="profile-image">
                        <div class="nameandrole flex flex-col gap-0.5">
                            <h1 class="text-[16px] font-medium">${emp.name}</h1>
                            <p class="text-[12px] text-gray-400 font-light">${emp.role}</p>
                        </div>
                    </div>
    `;
  });
}

//display employees in the side bar
displayemployees(employeesarr);

// //display emplyee profile

// displayinfos(){
// const profilemodal = createElement('div')

// profilemodal.innerHTML += `


// `
// }

// validate inputs
function validate(input, regex, secondinput="") {
  const errorm = input?.nextElementSibling;

if (regex == "start") {
   if(new Date(input.value) > Date.now()){
      input.classList.add("border-red-500");
      errorm.classList.remove("hidden");
      errorm.classList.add("fade-in");
      return false
    }else{
      input.classList.remove("border-red-500");
      errorm.classList.add("hidden");
      errorm.classList.remove("fade-in");
      return true
    }
}

if (regex == "end") {
   if(new Date(input.value) < new Date(secondinput.value)){
      input.classList.add("border-red-500");
      errorm.classList.remove("hidden");
      errorm.classList.add("fade-in");
      return false
    }else{
      input.classList.remove("border-red-500");
      errorm.classList.add("hidden");
      errorm.classList.remove("fade-in");
      return true
    }
}

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

//the function for validating form infos name email and phone

function validateEmployyeform() {
  const name = modal.querySelector("input[name]");
  const email = modal.querySelector("input[name=email]");
  const phone = modal.querySelector("input[name=phone]");

  allValid = true;

  const nameregex = /^[A-Z][a-z'-]+(?: [A-Z][a-z'-]+)+$/;
  const emailregex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phoneregex = /^(?:\+212|0)(6|7)[0-9]{8}$/;

  const validname = validate(name, nameregex);

  const validemail = validate(email, emailregex);

  const validphone = validate(phone, phoneregex);

  if (!validname || !validemail || !validphone) {
    allValid = false;
  }

  return allValid;
}

//the function for validatin experience forms

function validateallexp() {
  const allexpforms = experiencesform.querySelectorAll(".expform");

  let allValid = true;

  const jobregex = /^[A-Za-z][A-Za-z0-9\s\-'/]*[A-Za-z0-9]$/;
  const companyregex = /^[A-Za-z0-9][A-Za-z0-9\s\.\-\'&]*[A-Za-z0-9]$/;
  const descregex = /^[A-Za-z0-9\s\.,!?\-'"&:;/()]+$/;

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

    const validsdate = validate(startdate, "start")

    const validedate = validate(enddate, "end", startdate)

    if (!validjobtitle || !validcompany || !validdescrp || !validsdate || !validedate) {
      allValid = false;
    }
  });

  return allValid;
}

// Event for typing in form and exp
Employeeform.addEventListener("input", () => {
  validateallexp();
  validateEmployyeform();
});

// Event for the submit button
Employeeform.addEventListener("submit", (e) => {
  e.preventDefault();

  // console.log(validateallexp());
  // console.log(validateEmployyeform());

  if (!validateallexp()) {
    alert("Please fix the highlighted fields.");
    return;
  }

  if (!validateEmployyeform()) {
    alert("Please fix the highlighted fields.");
    return;
  }

   let filled = true;
  const allinputsss = Employeeform.querySelectorAll("input")
  allinputsss.forEach((input)=>{
    if(input.value === ""){
      filled = false;
    }
  });

  if(!filled){
    alert("Please fill the highlighted fields.");
    return;
  }

  const employeeinfos = collectingformdata();
  save(employeeinfos);
  clearfomr();
  displayemployees(employeesarr);
});

// function for getting thedata(exps)

function getallexpdata() {
  const allexpforms = experiencesform.querySelectorAll(".expform");
  const expData = [];

  allexpforms.forEach((exp) => {
    const allinputs = exp.querySelectorAll("input");
    const exptextarea = exp.querySelector("textarea");

    const data = {
      title: allinputs[0]?.value || "",
      company: allinputs[1]?.value || "",
      startdate: allinputs[2]?.value || "",
      enddate: allinputs[3]?.value || "",
      description: exptextarea?.value || "",
    };

    expData.push(data);
  });

  return expData;
}

// function for collectin that data

function collectingformdata() {
  const name = modal.querySelector("input[name]");
  const email = modal.querySelector("input[name=email]");
  const phone = modal.querySelector("input[name=phone]");
  const urlinput = document.querySelector("input[name=url]");
  const role = modal.querySelector("select[name=roles]");

  const formexperiences = getallexpdata();

  const employeee = {
    id: "EM-" + Date.now(),
    name: name.value,
    role: role.value,
    url: urlinput.value || "./images/anonymous-user.webp",
    email: email.value,
    phone: phone.value,
    experiences: formexperiences,
    status: "unsigned",
  };

  return employeee;
}

const assignemployee = document.getElementById("assignemployee")
const assingingemployees  = document.getElementById("assingingemployees")

//room buttons
const closeassingbtn = document.getElementById("closeassingbtn")
const conferenceroombtn = document.getElementById("conferenceroombtn")
const receptionroombtn = document.getElementById("receptionroombtn")
const archivesroombtn = document.getElementById("archivesroombtn")
const securityroombtn = document.getElementById("securityroombtn")
const staffroombtn = document.getElementById("staffroombtn")
const serverroombtn = document.getElementById("serverroombtn")


closeassingbtn.addEventListener("click",()=>{
  assignemployee.classList.add("hidden")
})

// conference room open asign modal
conferenceroombtn.addEventListener("click",()=>{
  assignemployee.classList.remove("hidden")
  roomfilter(employeesarr)
})

// reception room open asign modal
receptionroombtn.addEventListener("click",()=>{
  let receptionroomemps = employeesarr.filter(e => e.role === "receptionist" || e.role === "cleaningstaff" || e.role=== "manager")
  assignemployee.classList.remove("hidden")
  roomfilter(receptionroomemps)
})

// archive room open asign modal
archivesroombtn.addEventListener("click",()=>{
  let archivesroomemps = employeesarr.filter(e => e.role !== "cleaningstaff")
  assignemployee.classList.remove("hidden")
  roomfilter(archivesroomemps)
})

// security room open asign modal
securityroombtn.addEventListener("click",()=>{
  let securityroomemps = employeesarr.filter(e => e.role == "cleaningstaff" || e.role == "manager" || e.role == "securityagent")
  assignemployee.classList.remove("hidden")
  roomfilter(securityroomemps)
})

// staff room open asign modal
staffroombtn.addEventListener("click",()=>{
  assignemployee.classList.remove("hidden")
  roomfilter(employeesarr)
})

// server room open asign modal
serverroombtn.addEventListener("click",()=>{
  let serverroomemps = employeesarr.filter(e => e.role == "cleaningstaff" || e.role == "manager" || e.role == "technician")
  assignemployee.classList.remove("hidden")
  roomfilter(serverroomemps)
})

function roomfilter(roomarr){
  assingingemployees.innerHTML = "";
  // console.log(conferenceroomemps);
  roomarr.forEach((emp) => {
    assingingemployees.innerHTML += `
    <div onclick="displayinfos('${emp.id}')" class="employee flex items-center gap-4.5 w-full h-16 mt-3 border-l-4 border-[#2A0404] rounded-[5px] shadow-md hover:shadow-lg transition duration-300 hover:ease-in hover:scale-102 p-3 cursor-pointer">
                        <img class="w-12 h-12 rounded-[50%] object-cover" src="${emp.url}" alt="profile-image">
                        <div class="nameandrole flex flex-col gap-0.5">
                            <h1 class="text-[16px] font-medium">${emp.name}</h1>
                            <p class="text-[12px] text-gray-400 font-light">${emp.role}</p>
                        </div>
                    </div>
    `;})
}