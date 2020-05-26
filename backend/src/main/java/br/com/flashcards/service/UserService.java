package br.com.flashcards.service;

import java.util.List;
import java.util.Optional;

import br.com.flashcards.dto.UserDto;
import br.com.flashcards.model.User;

public interface UserService {

	public UserDto createAcount(UserDto dto);

	public User findById(Long userId);
	
	public Optional<User> findByUsername(String username);

	public List<UserDto> findAll();
	
	public User userAuthenticated();
	
}
