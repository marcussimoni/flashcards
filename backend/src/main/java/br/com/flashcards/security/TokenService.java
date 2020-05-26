package br.com.flashcards.security;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import br.com.flashcards.model.User;
import br.com.flashcards.service.UserAuthenticationService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
public class TokenService {
	
	@Value("${jwt.token.expiration}")
	private String expiration;
	
	@Value("${jwt.token.password}")
	private String password;
	
	@Autowired
	private UserAuthenticationService userAutenticationService;

	public String getToken(UsernamePasswordAuthenticationToken authentication) {
		Date today = new Date();
		return Jwts.builder()
					.setIssuer("API_FLASHCARDS")
					.setSubject(authentication.getPrincipal().toString())
					.setIssuedAt(today)
					.setExpiration(new Date(today.getTime() + Long.parseLong(expiration)))
					.signWith(SignatureAlgorithm.HS256, password)
					.compact();
	}
	
	public boolean isTokenValid(String token) {
		try {
			parseToken(token);
			return true;
		} catch (Exception e) {
			return false;
		}
	}

	private Jws<Claims> parseToken(String token) {
		return Jwts.parser().setSigningKey(password).parseClaimsJws(token);
	}

	public User getUserFromToken(String token) {
		String email = parseToken(token).getBody().getSubject();
		return (User) userAutenticationService.loadUserByUsername(email);
	}
}
