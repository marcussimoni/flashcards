package br.com.flashcards.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import br.com.flashcards.model.Deck;
import br.com.flashcards.model.User;

public interface DeckRepository extends CrudRepository<Deck, Long>{

	@Query("SELECT d FROM Deck d WHERE d.user = :user ")
	List<Deck> findAll(@Param("user") User user, Pageable page);

}
