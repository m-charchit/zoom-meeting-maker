var cls9 = document.querySelector("#cls9")
var cls10 = document.querySelector("#cls10")
var createbtn = document.querySelector("#create")

const showPopups = (type, msg) => {
    let pop = document.getElementById("show_popups")
    pop.classList.remove("d-none")
    setTimeout(()=>{pop.classList.add("d-none")},3000)
    pop.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert" style="position:fixed; width:85%; left: 50%; transform: translate(-50%, 0);" >
        ${msg}
        <button type="button" class="btn-close" data-mdb-dismiss="alert" aria-label="Close"></button>
        </div>`
}

const createMessage = (result) => {
    let options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',hour:'numeric',minute:'numeric',hour12:true };
    let message = `Suman Lata is inviting you to a scheduled Zoom meeting.
        
Topic: ${result["topic"]}
Time: ${new Date(result.time).toLocaleString('en-US', options).slice(5,)}

Join Zoom Meeting
${result["join_url"]}

Meeting ID: ${result["meetingId"]}
Passcode: ${result["passcode"]}`
        return message
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

        cls10.value = createMessage(response.class10)
        cls9.value = createMessage(response.class9)

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
    navigator.clipboard.writeText(elem.value)
    showPopups("success", `Message copied! Go to your class ${cls} group and paste this.`)
}

document.querySelector("#copycls9").addEventListener("click", (e) => {
    copyMsg(cls9, "9")
}, false)
document.querySelector("#copycls10").addEventListener("click", (e) => {
    copyMsg(cls10, "10")
}, false)