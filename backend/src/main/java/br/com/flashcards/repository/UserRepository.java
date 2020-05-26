package br.com.flashcards.repository;

import java.util.Optional;

import org.springframework.data .repository.CrudRepository;

import br.com.flashcards.model.User;

public interface UserRepository extends CrudRepository<User, Long>{

	Optional<User> findByUsername(String username);

}
