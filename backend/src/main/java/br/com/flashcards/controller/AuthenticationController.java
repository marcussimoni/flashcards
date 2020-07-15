package br.com.flashcards.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.flashcards.constants.Urls;
import br.com.flashcards.dto.UserDto;
import br.com.flashcards.service.UserService;


@RestController
@RequestMapping(Urls.API_BASE + "authentication")
public class AuthenticationController {

	@Autowired
	private UserService userService;
		
	@PostMapping(path = "sign-in")
	public ResponseEntity<?> autenticate(@RequestBody UserDto userDto){

		try {
			return ResponseEntity.ok(userService.authenticate(userDto));
		} catch (AuthenticationException e) {
			return ResponseEntity.badRequest().build();
		}
		
	}

	@PostMapping(path = "sign-up")
	public ResponseEntity<?> signUp(@RequestBody UserDto userDto){
		return ResponseEntity.status(HttpStatus.CREATED).body(userService.createAcount(userDto));
	}

}