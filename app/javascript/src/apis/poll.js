import axios from "axios";

const createPoll = payload => axios.post("/polls", {poll: payload})
const fetchPolls = () => axios.get("/polls")
const fetchPollById = (id) => axios.get(`/polls/${id}`)

const poll = {
    createPoll,
    fetchPolls,
    fetchPollById
}

export default poll