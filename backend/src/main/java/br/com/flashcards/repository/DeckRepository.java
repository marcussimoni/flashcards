package br.com.flashcards.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import br.com.flashcards.dto.DeckDto;
import br.com.flashcards.model.Deck;
import br.com.flashcards.model.User;

public interface DeckRepository extends CrudRepository<Deck, Long>{

	@Query("SELECT NEW br.com.flashcards.dto.DeckDto(d.id, d.name, d.description, d.active, "
		 + "SUM(CASE WHEN (f.active = true) THEN 1 ELSE 0 END)) "
		 + "FROM Deck d LEFT JOIN d.flashcards f "
		 + "WHERE d.user = :user AND d.active = true GROUP BY d.id")
	List<DeckDto> findAll(@Param("user") User user, Pageable page);

	@Modifying
	@Query("UPDATE Deck d SET d.active = false WHERE d = :deck")
	void inactivateDeck(@Param("deck") Deck deck);

}
