package br.com.flashcards.mapper;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import br.com.flashcards.dto.UserDto;
import br.com.flashcards.model.User;

@Component
public class UserMapper extends Mapper<User, UserDto> {

	public UserMapper() {
		super(new ModelMapper());
	}
	
}
