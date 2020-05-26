import api from "../../services/api"

const DeckResultTestService = {

    findById(id){
        return api.get(`test-result/${id}`)
    }

}

export default DeckResultTestService