package br.com.flashcards.dto;

import java.io.Serializable;
import java.time.LocalDate;

import lombok.Data;

@Data
public class UserDto implements Serializable {
	
	private static final long serialVersionUID = -2937384073552519650L;

	private Long id;
	private String firstName;
	private String lastName;
	private String email;
	private LocalDate birthDate;
	private String password;
	private String username;
	private TokenDto token;
	
}
