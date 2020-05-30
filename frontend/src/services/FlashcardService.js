import api from "./api";

const FlashcardService = {
    findAll: (url) => {
        return api.get(url)
    },

    saveResult: (flashcards) => {
        return api.post('test-result', flashcards)
    },

    findAllOlderThan: () => {
        return api.get('question/older-flashcards')
    }, 

    removeOldFlashcards: (flashcards) => {
        return api.put('question/older-flashcards', flashcards)
    }
}

export default FlashcardService;