package br.com.flashcards.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import br.com.flashcards.dto.DeckTestResultDto;
import br.com.flashcards.model.DeckTestResult;

public interface DeckTestResultRepository extends CrudRepository<DeckTestResult, Long>{

	@Query("SELECT d FROM DeckTestResult d WHERE d.deck.id = :deckId")
	List<DeckTestResultDto> findByDeck(@Param("deckId") Long deckId);

	@Query(value = "select deck.name as deckName, d.description, count(a.difficulty_id) as total, test.timestamp from flashcards.deck_test_result test inner join " +
			"flashcards.deck on deck.id = test.deck_id inner join flashcards.answer a " +
			"on a.test_result_id = test.id inner join flashcards.difficulty d on " +
			"d.id = a.difficulty_id where test.id = :id " +
			"group by deck.name, test.timestamp, a.difficulty_id, d.description", nativeQuery = true)
	List<IResultDto> findTestResultById(@Param("id") Long id);

	interface IResultDto {
		String getDeckName();
		String getDescription();
		Integer getTotal();
		LocalDateTime getTimestamp();
	}
	
}
