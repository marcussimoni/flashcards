import api from "./api";

const DeckService = {

    findAll: () => {
        return api.get('deck');
    },

    createNew: (deck) => {
        return api.post('deck', deck)
    },

    updateDeck: (deck) => {
        return api.put(`deck/${deck.id}`, deck)
    },

    delete: (deck) => {
        return api.delete(`deck/${deck.id}`)
    }

}

export default DeckService;