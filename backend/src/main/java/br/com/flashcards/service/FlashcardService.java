package br.com.flashcards.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;

import br.com.flashcards.dto.FlashcardDto;
import br.com.flashcards.dto.OlderFlashcardDto;
import br.com.flashcards.model.Deck;
import br.com.flashcards.model.Flashcard;

public interface FlashcardService {

	FlashcardDto save(FlashcardDto dto);
	List<FlashcardDto> findAll(Long deckId, Pageable page);
	void delete(List<Long> ids);
	FlashcardDto findQuestion(Long deckId, String question);
	void deleteByDeck(Deck deck);
	Optional<Flashcard >findById(Long id);
	List<OlderFlashcardDto> findAllOlderThan(LocalDateTime date);
	void removeOldFlashcards(List<OlderFlashcardDto> flashcards);
	Long findTotalOlderThan(LocalDateTime date);
	
}
