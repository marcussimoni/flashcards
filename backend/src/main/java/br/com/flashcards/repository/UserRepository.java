package br.com.flashcards.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data .repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import br.com.flashcards.model.User;

public interface UserRepository extends CrudRepository<User, Long>{

	Optional<User> findByUsername(String username);
	
	@Query("SELECT u FROM User u WHERE u.email = :email")
	Optional<User> findByEmail(@Param("email") String email);

}
