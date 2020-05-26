import api from "../../services/api";

const FlashcardService = {
    findAll: (url) => {
        return api.get(url)
    },

    saveResult: (flashcards) => {
        return api.post('test-result', flashcards)
    }
}

export default FlashcardService;