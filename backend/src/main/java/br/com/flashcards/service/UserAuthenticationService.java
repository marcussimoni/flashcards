package br.com.flashcards.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import br.com.flashcards.repository.UserAuthenticationRepository;

@Service
public class UserAuthenticationService implements UserDetailsService{

	@Autowired
	private UserAuthenticationRepository repository;
	
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		Optional<UserDetails> optional = repository.findByEmail(email);
		
		if(optional.isPresent()) {
			return optional.get();
		} else {
			throw new UsernameNotFoundException("username or password invalid");
		}
	}

}
