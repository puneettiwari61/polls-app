import axios from "axios";

const createVote = payload => axios.post("/votes",  payload)


const vote = {
    createVote
}

export default vote