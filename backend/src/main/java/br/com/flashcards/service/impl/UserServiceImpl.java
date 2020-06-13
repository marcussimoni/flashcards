package br.com.flashcards.service.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import br.com.flashcards.dto.UserDto;
import br.com.flashcards.mapper.UserMapper;
import br.com.flashcards.model.User;
import br.com.flashcards.repository.UserRepository;
import br.com.flashcards.service.UserService;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private UserMapper userMapper;
	
	@Override
	public UserDto createAcount(UserDto dto) {
		
		User user = new User();
		BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
		
		user.setEmail(dto.getEmail());
		user.setFirstName(dto.getFirstName());
		user.setLastName(dto.getLastName());
		user.setUsername(dto.getUsername());
		user.setPassword(bcrypt.encode(dto.getPassword()));
		
		User entity = userRepository.save(user);
		
		return userMapper.entityToDto(entity);
	}

	@Override
	public User findById(Long userId) {
		Optional<User> optional = userRepository.findById(userId);
		if(optional.isPresent()) {
			return optional.get();
		} else {
			throw new RuntimeException("User not found");
		}
	}

	@Override
	public List<UserDto> findAll() {		
		return StreamSupport
				.stream(userRepository.findAll().spliterator(), false)
				.map(userMapper::entityToDto)
				.collect(Collectors.toList());
	}

	@Override
	public Optional<User> findByUsername(String username) {
		return userRepository.findByUsername(username);
	}

	@Override
	public User userAuthenticated() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		return (User) authentication.getPrincipal();
	}

}
