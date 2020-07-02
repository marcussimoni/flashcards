package br.com.flashcards;

import org.junit.Test;
import org.junit.jupiter.api.Assertions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import br.com.flashcards.service.UserAuthenticationService;

public class UserAuthenticationTest extends JUnitTestConfig {

	@Autowired
	private UserAuthenticationService service;
	
	@Test
	public void mustFindByEmail() {
		UserDetails userDetails = service.loadUserByUsername("test@flashcards.com");
		Assertions.assertNotNull(userDetails);
	}
	
	@Test(expected = UsernameNotFoundException.class)
	public void mustThrowExceptionIfNotFound() {
		UserDetails userDetails = service.loadUserByUsername("email-not-found@flashcards.com");
		Assertions.assertNotNull(userDetails);
	}
	
}
