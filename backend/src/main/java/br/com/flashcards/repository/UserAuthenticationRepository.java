package br.com.flashcards.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.security.core.userdetails.UserDetails;

import br.com.flashcards.model.User;

public interface UserAuthenticationRepository extends CrudRepository<User, Long>{

	Optional<UserDetails> findByEmail(String email);

}
