package br.com.flashcards.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.flashcards.dto.TokenDto;
import br.com.flashcards.dto.UserDto;
import br.com.flashcards.security.TokenService;
import br.com.flashcards.service.UserService;

@RestController
@RequestMapping("authentication")
public class AuthenticationController {
	
	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private TokenService tokenService;
	
	@Autowired
	private UserService userService;
		
	@PostMapping(path = "sign-in")
	public ResponseEntity<?> autenticate(@RequestBody UserDto userDto){
		
		UsernamePasswordAuthenticationToken authentication = usernamePasswordAutenticationTokenBuilder(userDto);

		try {
			authenticationManager.authenticate(authentication);
			String token = tokenService.getToken(authentication);
			System.out.println("token: " + token);
			return ResponseEntity.ok(new TokenDto(token, "Bearer"));
		} catch (AuthenticationException e) {
			return ResponseEntity.badRequest().build();
		}
		
	}

	@PostMapping(path = "sign-up")
	public ResponseEntity<?> signUp(@RequestBody UserDto userDto){
		return ResponseEntity.status(HttpStatus.CREATED).body(userService.createAcount(userDto));
	}

	private UsernamePasswordAuthenticationToken usernamePasswordAutenticationTokenBuilder(UserDto userDto) {
		String password = userDto.getPassword();
		String email = userDto.getEmail();
		UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(email, password);
		return authentication;
	}
}
