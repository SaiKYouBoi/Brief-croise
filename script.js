const urlinput = document.querySelector("input[name=url]");
const employeeimage = document.getElementById("employeeimage");

urlinput.addEventListener("change", () => {
  let url = urlinput.value;

  employeeimage.src = url;
});

const addemployee = document.getElementById("addemployee");
const addemployeemodal = document.getElementById("addemployeemodal");
const cancel = document.getElementById("cancel");
const experiencesform = document.getElementById("experiences");
const addexperiencebtn = document.querySelector(".addexperience");
const Employeeform = document.getElementById("Employeeform");
const employees = document.getElementById("employees");

addemployee.addEventListener("click", () => {
  addemployeemodal.classList.remove("hidden");
});

cancel.addEventListener("click", (e) => {
  e.preventDefault();

  addemployeemodal.classList.add("hidden");
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
                            <input class="border-gray-300  rounded-md mb-2 mt-2.5 border-2 w-full h-[42px] py-2 px-3"
                                name="Company / Organization" type="text" placeholder="Company / Organization">

                            <div class="flex gap-1.5 mt-2.5">
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
                        </div>
`
  );
});

// display employees in the side bar
const emp = [
  {
    id: 1,
    name: "Harry Potter",
    image: "./images/profiles/harry.webp",
    role: "Manager",
  },
  {
    id: 1,
    name: "Amine potter",
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

const allexpforms = document.querySelectorAll(".expform")

Employeeform.addEventListener("input", () => {
  
const nameregex = /^[A-Za-z]{2,}$/;
  const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneregex = /^(?:\+212|0)(6|7)[0-9]{8}$/;

  allexpforms.forEach((exp) => {
    const allinputs = exp.querySelectorAll("input");
    const exptextarea = exp.querySelectorAll("textarea");

    const jobtitle = allinputs[0];
    const company = allinputs[1];
    const startdate = allinputs[2];
    const enddate = allinputs[3];
    
    

  });
});
