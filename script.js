urlinput.addEventListener('change', () => {
const urlinput = document.querySelector("input[name=url]")
const employeeimage = document.getElementById("employeeimage")

let url = urlinput.value

employeeimage.src = url

});

