import api from "../../services/api"

const DeckResultTestService = {

    findById(id){
        return api.get(`test-result/${id}`)
    },

    findAll(){
        return api.get('test-result')
    }

}

export default DeckResultTestService