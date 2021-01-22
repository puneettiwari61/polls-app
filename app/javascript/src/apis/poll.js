import axios from "axios";

const createPoll = payload => axios.post("/polls", payload)
// const signup = payload => axios.post("/users", payload)

const poll = {
    createPoll
}

export default poll