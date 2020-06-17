package br.com.flashcards;

import java.util.List;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.jupiter.api.Assertions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.transaction.annotation.Transactional;

import br.com.flashcards.dto.DeckDto;
import br.com.flashcards.exception.FlashcardException;
import br.com.flashcards.service.DeckService;

@Transactional
public class DeckTests extends JUnitTestConfig {

	@Autowired
	private DeckService service;
	
	@Autowired
	private MockAutenticatedUser autenticantedUser;
	
	@Before
	public void deckTestsInit() {
		ReflectionTestUtils.setField(service, "userService", autenticantedUser.getUserService());
	}
		
	@Test
	public void mustCreateNewDeck() {
		DeckDto dto = buildDeck();
		service.save(dto);
	}
	
	@Test
	public void mustFindById() {
		DeckDto createdForTest = createdForTest();
		DeckDto deckDto = service.findById(createdForTest.getId());
		DeckDto deckDto2 = buildDeck();
		Assert.assertEquals(deckDto.getDescription(), deckDto2.getDescription());
	}
	
	@Test(expected = FlashcardException.class)
	public void mustThrowExceptionIfIdNotExists() {
		service.findById(99L);
	}
	
	@Test
	public void mustDeleteDeck() {
		DeckDto dto = buildDeck();
		DeckDto entity = service.save(dto);
		
		service.remove(entity.getId());
	}
	
	@Test
	public void mustUpdateDeck() {
		DeckDto dto = buildDeck();
		DeckDto entity = service.save(dto);
		
		String updatedName = "updated";
		
		entity.setName(updatedName);
		
		DeckDto updated = service.update(entity.getId(), entity);
		
		Assertions.assertEquals(updated.getName(), updatedName);
	}

	private DeckDto createdForTest() {
		return service.save(buildDeck());
	}
	
	@Test 
	public void mustFindAll() {
		createdForTest();
		List<DeckDto> list = service.findAll(PageRequest.of(0, 10));
		Assert.assertEquals(list.size(), 1);
	}

	public static DeckDto buildDeck() {
		DeckDto dto = new DeckDto();
		dto.setName("Deck test");
		dto.setDescription("Creating new deck with junit");
		return dto;
	}
	
}
