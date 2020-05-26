package br.com.flashcards.security;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import br.com.flashcards.model.User;

public class AuthenticationFilter extends OncePerRequestFilter {

	private TokenService tokenService;
	
	public AuthenticationFilter(TokenService tokenService) {
		super();
		this.tokenService = tokenService;
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
		
		String token = getToken(request);
		
		if(tokenService.isTokenValid(token)) {
			authenticate(token);
		}
		
		filterChain.doFilter(request, response);
		
	}

	private void authenticate(String token) {
		User user = tokenService.getUserFromToken(token);
		Authentication authentication = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
		SecurityContextHolder.getContext().setAuthentication(authentication);
	}

	private String getToken(HttpServletRequest request) {
		String token = request.getHeader("Authorization");
		
		if(StringUtils.isEmpty(token) || !token.startsWith("Bearer")) {
			return null;
		}
		
		int tokenStartsIn = 7;
		return token.substring(tokenStartsIn, token.length());
	}

}
