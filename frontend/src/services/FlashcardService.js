import api from "./api";

const FlashcardService = {
    findAll: (url) => {
        return api.get(url)
    },

    saveResult: (flashcards) => {
        return api.post('test-result', flashcards)
    },

    findAllOlderThan: () => {
        return api.get('flashcards/older-flashcards')
    }, 

    removeOldFlashcards: (flashcards) => {
        return api.put('flashcards/older-flashcards', flashcards)
    }
}

export default FlashcardService;