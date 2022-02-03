var cls9 = document.querySelector("#cls9")
var cls10 = document.querySelector("#cls10")
var createbtn = document.querySelector("#create")
const showPopups = (type, msg) => {
    document.getElementById("show_popups").innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert" >
        ${msg}
        <button type="button" class="btn-close" data-mdb-dismiss="alert" aria-label="Close"></button>
        </div>`
}
const makeRequest = async () => {
    let spinner = document.querySelector("#spinner")
    spinner.classList.remove("d-none")
    createbtn.classList.add("d-none")
    document.getElementById("ins").innerText = "Please wait while we fetch the links!"
    let request = await fetch('/create_meeting', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    if (request.status == 200) {
        let response = await request.json()
        console.log(response)
        cls10.value = response.class10
        cls9.value = response.class9
        document.querySelector("#copydiv").classList.remove("d-none")
        spinner.classList.add("d-none")
        document.getElementById("ins").innerText = "Click on the two buttons to copy the link class wise."
        showPopups("success", "Meeting created successfully! You can copy the links now.")
    } else {
        showPopups("danger", "Error occured! Try again later or contact the creator.")
    }
}
createbtn.addEventListener("click", makeRequest, false)
const copyMsg = (elem, cls) => {
    elem.select()
    document.execCommand("copy");
    showPopups("success", `Message copied! Go to your class ${cls} group and paste this.`)
}
document.querySelector("#copycls9").addEventListener("click", (e) => {
    copyMsg(cls9, "9")
}, false)
document.querySelector("#copycls10").addEventListener("click", (e) => {
    copyMsg(cls10, "10")
}, false)