package br.com.flashcards.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import br.com.flashcards.model.Deck;
import br.com.flashcards.model.Flashcard;

public interface FlashcardRepository extends PagingAndSortingRepository<Flashcard, Long>{

	@Query(value = "SELECT q FROM Flashcard q WHERE q.deck = :deck")
	Page<Flashcard> findAll(@Param("deck") Deck deck, Pageable page);
	
	@Query("SELECT COUNT(q) FROM Flashcard q WHERE LOWER(q.question) = LOWER(:question) AND q.deck.id = :deck")
	Long questionExists(@Param("deck") Long deck, @Param("question") String question);

	@Query("SELECT q FROM Flashcard q WHERE q.deck.id = :deck AND LOWER(q.question) = LOWER(:question)")
	Optional<Flashcard> findQuestion(@Param("deck") Long deck, @Param("question") String question);

	@Query("SELECT q FROM Flashcard q WHERE q.deck = :deck")
	List<Flashcard> findByDeck(@Param("deck") Deck deck);
	
}
