package br.com.flashcards.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.flashcards.constants.Urls;
import br.com.flashcards.dto.UserDto;
import br.com.flashcards.mapper.UserMapper;
import br.com.flashcards.service.UserService;

@RestController
@RequestMapping( Urls.API_BASE + "user")
public class UserController {

	@Autowired
	private UserService service;
	
	@Autowired
	private UserMapper userMapper;
	
	@GetMapping(path = "authenticated")
	public UserDto getAutenticatedUser() {
		return userMapper.entityToDto(service.userAuthenticated());
	}
	
}
