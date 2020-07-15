package br.com.flashcards.service.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import br.com.flashcards.dto.TokenDto;
import br.com.flashcards.dto.UserDto;
import br.com.flashcards.mapper.UserMapper;
import br.com.flashcards.model.User;
import br.com.flashcards.repository.UserRepository;
import br.com.flashcards.security.TokenService;
import br.com.flashcards.service.UserService;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private UserMapper userMapper;
	
	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private TokenService tokenService;
	
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
	public Optional<User> findByEmail(String email) {
		return userRepository.findByEmail(email);
	}

	@Override
	public User userAuthenticated() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		return (User) authentication.getPrincipal();
	}

	@Override
	public UserDto authenticate(UserDto dto) {
		UsernamePasswordAuthenticationToken authentication = usernamePasswordAutenticationTokenBuilder(dto);
		authenticationManager.authenticate(authentication);
		String token = tokenService.getToken(authentication);
		TokenDto tokenDto = new TokenDto(token, "Bearer");
		UserDto userDto = userMapper.entityToDto(findByEmail(dto.getEmail()).get());
		userDto.setToken(tokenDto);
		userDto.setPassword(null);
		return userDto;
	}
	
	private UsernamePasswordAuthenticationToken usernamePasswordAutenticationTokenBuilder(UserDto userDto) {
		String password = userDto.getPassword();
		String email = userDto.getEmail();
		UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(email, password);
		return authentication;
	}

}
