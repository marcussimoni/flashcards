package br.com.flashcards.service;

import java.util.List;
import java.util.Optional;

import br.com.flashcards.dto.UserDto;
import br.com.flashcards.model.User;

public interface UserService {

	UserDto createAcount(UserDto dto);

	User findById(Long userId);
	
	Optional<User> findByUsername(String username);

	List<UserDto> findAll();
	
	User userAuthenticated();
	
}
