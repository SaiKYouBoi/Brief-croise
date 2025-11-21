const KEY = "Gryffindor_Gather";

let employeesarr = load();

function save(object) {
  employeesarr.push(object);
  localStorage.setItem(KEY, JSON.stringify(employeesarr));
}

function load() {
  return JSON.parse(localStorage.getItem(KEY) || "[]");
}

// the event for the url image

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
<div class="expform border border-[#3C1A09] rounded-[11px] p-4 mt-2.5 relative">
                            <i class="removeexpbtn fa-solid fa-circle-minus text-2xl text-[#E53E3E] hover:text-[#C53030] absolute -right-2.5 -top-1.5"></i>
                            <input class="border-[#3C1A09]  rounded-md mb-2 border-2 w-full h-[42px] py-2 px-3"
                                name="jobtitle" type="text" placeholder="Job Title">
                            <p class="error text-red-400 text-[12px] w-full hidden" id="nameerror">Job title must be at least 6 characters.</p>
                            <input class="border-[#3C1A09]  rounded-md mb-2 mt-2.5 border-2 w-full h-[42px] py-2 px-3"
                                name="Company / Organization" type="text" placeholder="Company / Organization">
                            <p class="error text-red-400 text-[12px] w-full hidden" id="nameerror">Only letters, numbers, spaces, .-'& allowed.</p>

                            <div class="flex flex-col xl:flex-row gap-1.5 mt-2.5">
                                <div><label class="block mb-1" for="Sdate">Start Date</label>
                                    <input class="border-[#3C1A09]  rounded-md mb-2 border-2 w-full h-[38px] py-2 px-3"
                                        name="phone" type="date">
                                    <p class="text-red-400 text-[12px] w-full hidden">  Start date cannot be in the future. Please select today or an earlier date.</p>
                                </div>
                                <div><label class="block mb-1 " for="Edate">End Date</label>
                                    <input class="border-[#3C1A09]  rounded-md mb-2 border-2 w-full h-[38px] py-2 px-3"
                                        name="phone" type="date">
                                        <p class="text-red-400 text-[12px] w-full hidden">End date cannot be before the start date.</p>
                                </div>
                            </div>
                            <textarea class="border-[#3C1A09] rounded-md mt-2.5 border-2 w-full py-2 px-3" rows="2"
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
    <div onclick="empdetails('${emp.id}')" class="bg-[#A89E90] employee flex items-center gap-4.5 w-full h-16 mt-3 border-l-4 border-[#2A0404] rounded-[5px] shadow-md hover:shadow-lg transition duration-300 hover:ease-in hover:scale-102 p-3 cursor-pointer">
                        <img class="w-12 h-12 rounded-[50%] object-cover" src="${emp.url}" alt="profile-image">
                        <div class="nameandrole flex flex-col gap-0.5">
                            <h1 class="text-[16px] font-medium">${emp.name}</h1>
                            <p class="text-[12px] text-white font-light">${emp.role}</p>
                        </div>
                    </div>
    `;
  });
}

//display employees in the side bar
displayemployees(employeesarr);

// //display emplyee profile

const profilemodal = document.querySelector(".profilemodal")
const addemployeprofile = document.getElementById("addemployeprofile")

function empdetails(empid){
let wantedemp = employeesarr.find(emp => emp.id === empid)

addemployeprofile.classList.remove("hidden")


profilemodal.innerHTML = `
  <div class="bg-[url('./images/cover.png')] w-full h-36 rounded-2xl relative">
                <img class="absolute top-19 left-8 w-30 h-30 object-cover border-8 border-[#F3E7C9] rounded-[50%]"
                    src="${wantedemp.url}" alt="profilepic">
                <i onClick="closeempDetails()" class="fa-solid fa-xmark absolute top-4 right-4 text-white transition hover:scale-105"></i>
            </div>
            <div class="pl-0 mt-11 h-10 border-b border-gray-300">
                <div class="flex gap-1 items-center border-b border-black-300 w-19 h-10">
                    <i class="fa-regular fa-user"></i>
                    <p class="">Profile</p>
                </div>
            </div>

            <div class="flex gap-15">
                <div class="flex flex-col gap-2.5 mt-4">
                    <p>Full name:</p>
                    <p>Role:</p>
                    <p>Email:</p>
                    <p>Phone:</p>
                </div>
                <div class="flex flex-col gap-3 mt-4">
                    <p class="text-gray-500 text-[15px]">${wantedemp.name}</p>
                    <p class="text-gray-500 text-[15px]">${wantedemp.role}</p>
                    <p class="text-gray-500 text-[15px]">${wantedemp.email}</p>
                    <p class="text-gray-500 text-[15px]">${wantedemp.phone}</p>
                </div>
            </div>
            <div class="pl-0 mt-2 h-10 border-b border-gray-300">
                <div class="flex gap-1.5 items-center border-b border-black-300 w-27 h-10">
                    <i class="fa-solid fa-briefcase"></i>
                    <p class="">Expreinces</p>
                </div>
                <div class="h-[230px] overflow-y-scroll [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-400
            [&::-webkit-scrollbar-thumb]:rounded-full p-2 overflow-hidden">
                ${
                  wantedemp.experiences.map(exp => `
                          
                <div class="border-black w-full p-3 border rounded-2xl mt-2">
                    <div class="flex justify-between">
                        <div class="w-[50%]">
                            <div class="flex gap-10">
                                <div class="flex flex-col gap-2.5">
                                    <p>Job title:</p>
                                    <p>Start date:</p>
                                </div>
                                <div class="flex flex-col gap-3">
                                    <p class="text-gray-500 text-[15px]">${exp.title}</p>
                                    <p class="text-gray-500 text-[15px]">${exp.startdate}</p>
                                </div>
                            </div>
                        </div>
                        <div class="w-[50%]">
                            <div class="flex gap-10">
                                <div class="flex flex-col gap-2.5">
                                    <p>Company:</p>
                                    <p>End date:</p>
                                </div>
                                <div class="flex flex-col gap-3">
                                    <p class="text-gray-500 text-[15px]">${exp.company}</p>
                                    <p class="text-gray-500 text-[15px]">${exp.enddate}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p class="mt-2 mb-2">Description:</p>
                    <div class="">
                        <p class="text-gray-500 text-justify text-[14px]">${exp.description}</p>
                    </div>
                </div>                 
                    `).join("")
                }
                
                </div>   
            </div>
`
}

//close employee details
function closeempDetails(){
addemployeprofile.classList.add("hidden")
}





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
  let conferenceroomemps = employeesarr.filter(e => e.status === "unsigned")
  assignemployee.classList.remove("hidden")
  roomfilter(conferenceroomemps, "conferenceroom")
})

// reception room open asign modal
receptionroombtn.addEventListener("click",()=>{
  let receptionroomemps = employeesarr.filter(e => (e.role === "receptionist" || e.role === "cleaningstaff" || e.role=== "manager") && e.status === "unsigned")
  assignemployee.classList.remove("hidden")
  roomfilter(receptionroomemps, "reception")
})

// archive room open asign modal
archivesroombtn.addEventListener("click",()=>{
  let archivesroomemps = employeesarr.filter(e => e.role !== "cleaningstaff" && e.status === "unsigned")
  assignemployee.classList.remove("hidden")
  roomfilter(archivesroomemps, "archivesroom")
})

// security room open asign modal
securityroombtn.addEventListener("click",()=>{
  let securityroomemps = employeesarr.filter(e => (e.role == "cleaningstaff" || e.role == "manager" || e.role == "securityagent") && e.status === "unsigned")
  assignemployee.classList.remove("hidden")
  roomfilter(securityroomemps, "securityroom")
})

// staff room open asign modal
staffroombtn.addEventListener("click",()=>{
  let staffroomemps = employeesarr.filter(e => e.status === "unsigned")
  assignemployee.classList.remove("hidden")
  roomfilter(staffroomemps, "staffroom")
})

// server room open asign modal
serverroombtn.addEventListener("click",()=>{
  let serverroomemps = employeesarr.filter(e => (e.role == "cleaningstaff" || e.role == "manager" || e.role == "technician") && e.status === "unsigned")
  assignemployee.classList.remove("hidden")
  roomfilter(serverroomemps, "serverroom")
})

// fucntion that filters a room
function roomfilter(roomarr, roomId){
  assingingemployees.innerHTML = "";
  // console.log(conferenceroomemps);
  roomarr.forEach((emp) => {
    assingingemployees.innerHTML += `
    <div onclick="asignemp('${emp.id}','${roomId}')" class="bg-[#d8cec0] employee flex items-center gap-4.5 w-full h-16 mt-3 border-l-4 border-[#2A0404] rounded-[5px] shadow-md hover:shadow-lg transition duration-300 hover:ease-in hover:scale-102 p-3 cursor-pointer">
                        <img class="w-12 h-12 rounded-[50%] object-cover" src="${emp.url}" alt="profile-image">
                        <div class="nameandrole flex flex-col gap-0.5">
                            <h1 class="text-[16px] font-medium">${emp.name}</h1>
                            <p class="text-[12px] text-white font-light">${emp.role}</p>
                        </div>
                    </div>
    `;})
}

//asinging to a room function
function asignemp(empid, roomId){
    let wantedemp = employeesarr.find(emp => emp.id === empid)
    wantedemp.status = roomId
    localStorage.setItem(KEY, JSON.stringify(employeesarr));
    document.getElementById("closeassingbtn").click();
    displayemployees(employeesarr);
    displayemployeesinroom();
}

function changetounasigned(empid,event){
  event.stopPropagation();
    let wantedemp = employeesarr.find(emp => emp.id === empid)
    wantedemp.status = "unsigned"
    localStorage.setItem(KEY, JSON.stringify(employeesarr));
    document.getElementById("closeassingbtn").click();
    displayemployees(employeesarr);
    displayemployeesinroom();
}



function displayemployeesinroom(){
  let rooms = document.querySelectorAll(".room")
  let roomWorkers = document.querySelectorAll(".room-workers")

  if(roomWorkers){
    roomWorkers.forEach(w => w.remove());
  }
  
  rooms.forEach(room =>{
    let filtredemployees = employeesarr.filter(emp => emp.status === room.id)
    filtredemployees.forEach(emp => {
      room.insertAdjacentHTML("beforeend", `
      <div onclick="empdetails('${emp.id}')" class="room-workers relative bg-[#A89E90] employee flex items-center gap-2.5 w-[48%] h-16 mt-1.5 mr-1 border-l-4 border-[#2A0404] rounded-[5px] shadow-md hover:shadow-lg transition duration-300 hover:ease-in hover:scale-102 p-3 cursor-pointer">
                          <i onClick="changetounasigned('${emp.id}',event)" class="fa-solid fa-circle-xmark absolute text-red-400 hover:text-red-500 top-0.5 right-px"></i>
                          <img class="w-12 h-12 rounded-[50%] object-cover" src="${emp.url}" alt="profile-image">
                          <div class="nameandrole flex flex-col gap-0.5">
                              <h1 class="text-[12px] font-medium">${emp.name}</h1>
                              <p class="text-[9px] text-white font-light">${emp.role}</p>
                          </div>
                      </div>
      `)
    })
  })
}

displayemployeesinroom();