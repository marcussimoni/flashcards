package br.com.flashcards.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import br.com.flashcards.model.Deck;
import br.com.flashcards.model.Flashcard;
import br.com.flashcards.model.User;

public interface FlashcardRepository extends PagingAndSortingRepository<Flashcard, Long>{

	@Query(value = "SELECT q FROM Flashcard q WHERE q.deck = :deck AND (q.active IS NULL OR q.active = true)")
	Page<Flashcard> findAll(@Param("deck") Deck deck, Pageable page);
	
	@Query("SELECT COUNT(q) FROM Flashcard q WHERE LOWER(q.question) = LOWER(:question) AND q.deck.id = :deck AND (q.active IS NULL OR q.active = true)")
	Long questionExists(@Param("deck") Long deck, @Param("question") String question);

	@Query("SELECT q FROM Flashcard q WHERE q.deck.id = :deck AND LOWER(q.question) = LOWER(:question) AND (q.active IS NULL OR q.active = true)")
	Optional<Flashcard> findQuestion(@Param("deck") Long deck, @Param("question") String question);

	@Query("SELECT q FROM Flashcard q WHERE q.deck = :deck AND (q.active IS NULL OR q.active = true)")
	List<Flashcard> findByDeck(@Param("deck") Deck deck);
	
	@Query("SELECT q FROM Flashcard q INNER JOIN q.deck d WHERE d.user = :user AND q.timeStamp < :date AND (q.active IS NULL OR q.active = true) ORDER BY d.name, q.question ASC")
	List<Flashcard> findAllOlderThan(@Param("user") User user, @Param("date") LocalDateTime date);

	@Modifying
	@Query("UPDATE Flashcard f SET f.active = false WHERE f.id IN :ids")
	void inactivateOldFlashcards(@Param("ids") List<Long> flashcardsId);
	
	@Modifying
	@Query("UPDATE Flashcard f SET f.timeStamp = :data WHERE f.id IN :ids")
	void updateTimeStampFlashcards(@Param("data") LocalDateTime data, @Param("ids") List<Long> flashcardsId);

	
}
