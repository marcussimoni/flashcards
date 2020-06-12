package br.com.flashcards;

import java.time.LocalDate;

import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import br.com.flashcards.dto.UserDto;
import br.com.flashcards.service.UserService;

@Transactional
public class UserServiceTest extends JUnitTestConfig {

	@Autowired
	private UserService service;
	
	@Test
	public void mustCreateAccount() {
		UserDto dto = userDtoBuilder();
		service.createAcount(dto);
	}
	
	@Test
	public void mustFindByLogin() {
		createdForTest();
		Assert.assertTrue(service.findByUsername(userDtoBuilder().getUsername()).isPresent());
	}
	
	@Test
	public void mustFindById() {
		UserDto dto = createdForTest();
		Assert.assertNotNull(service.findById(dto.getId()));
	}
	
	private UserDto createdForTest() {
		return service.createAcount(userDtoBuilder());
	}

	private UserDto userDtoBuilder() {
		UserDto dto = new UserDto();
		
		dto.setBirthDate(LocalDate.now());
		dto.setEmail("test2@gmail.com");
		dto.setFirstName("first name");
		dto.setLastName("last name");
		dto.setUsername("test2");
		dto.setPassword("123456");
		return dto;
	}
	
}
