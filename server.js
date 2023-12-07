require("dotenv").config()

const express = require("express")
const axios = require("axios")
const app = express()

const auth = {
    username: process.env.PROJECT_ID,
    password: process.env.API_TOKEN
}

const SPACE = `https://${process.env.SPACE_URL}`

app.use(express.static(__dirname))
app.use(express.json())

app.post("/send_code", async (req, res) => {

    try {
        const { phone, username } = req.body
        let createCodeURL = `${SPACE}/api/relay/rest/verified_caller_ids`
        let request = await axios.post(createCodeURL, {
            number: phone,
            name: username
        }, {
            auth: auth
        })

        res.send({data: request.data})

    } catch (error) {

        console.log(error)
        console.log(error.code)
        console.log(error.response.data.errors[0].detail)

    }

})

app.post("/verify_token", async (req, res) => {

    try {
        const { verify_id, code } = req.body
        let createCodeURL = `${SPACE}/api/relay/rest/verified_caller_ids/${verify_id}/verification`
        let request = await axios.put(createCodeURL, {
            verification_code: code
        }, {
            auth: auth
        })

        res.send({data: request.data})

    } catch (error) {

        console.log(error)
        console.log(error.code)
        console.log(error.response.data.errors[0].detail)

    }

})

app.listen(3000, ()=>{
    console.log("App listening at port 3000")
})