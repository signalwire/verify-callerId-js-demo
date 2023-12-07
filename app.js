let app = document.getElementById("app")

function loadOnboarding() {

    app.innerHTML = document.getElementById("onboard").innerHTML

    const phone = app.querySelector("#phone");
    const username = app.querySelector("#username");

    app.querySelector("form").addEventListener("submit", (e) => {
        e.preventDefault()
        getCode(phone.value, username.value)
    })

}

let url = "/send_code"
async function getCode(phone, username) {

    try {

        let payload = {
            name: username,
            phone: phone
        }

        let request = await axios.post(url, payload, {
            auth: auth
        })

        let id = request.data.data.id
        loadCodeView(id)

    } catch (error) {

        console.log(error)
        console.log(error.code)
        console.log(error.response.data.errors[0].detail)

    }


}

function loadCodeView(userId) {
    app.innerHTML = document.getElementById("verify").innerHTML

    const code = app.querySelector("#code")
    app.querySelector("form").addEventListener("submit", (e) => {
        e.preventDefault()
        validateCode(userId, code.value)
    })
}



async function validateCode(id, code) {

    const backEndUrl = "/verify_token"
    try {

        let backendPayload = {
            code: code, 
            verify_id: id // Not needed if validateURL
        }

        let request = await axios.post(backEndUrl, backendPayload, {
            auth:auth
        })

        let response = request.data.data 

        
        if(response.verified){
            loadVerifiedView(response.verified)
        }else{
            loadVerifiedView("Not verified")
        }
    } catch (err) {
        console.log(err)
    }

}

function loadVerifiedView(message){
    app.innerHTML = document.getElementById("final").innerHTML

    if(message){
        app.querySelector("#text").innerHTML = "This phone number is verified"
    }else{
        app.querySelector("#text").innerHTML = message
    }

    
}



loadOnboarding()
