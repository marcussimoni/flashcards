package br.com.flashcards;

import java.util.Objects;

import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import br.com.flashcards.service.UserService;
import br.com.flashcards.service.impl.UserServiceImpl;

@Component
public class MockAutenticatedUser {

	public static final String AUTHENTICATED_LOGIN = "test";
	
	private UserService userService;
	
	@Autowired
	private UserService service;
	
	@Transactional
	public UserService getUserService() {
		if(Objects.isNull(userService)) {
			userService = Mockito.mock(UserServiceImpl.class);
			Mockito.when(userService.userAuthenticated()).thenReturn(service.findByUsername(AUTHENTICATED_LOGIN).get());
		}
		return userService;
	}
	
}
