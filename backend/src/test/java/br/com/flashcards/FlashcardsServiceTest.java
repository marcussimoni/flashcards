package br.com.flashcards;

import java.time.LocalDateTime;
import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.junit.jupiter.api.Assertions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.test.util.ReflectionTestUtils;

import br.com.flashcards.dto.DeckDto;
import br.com.flashcards.dto.FlashcardDto;
import br.com.flashcards.exception.FlashcardException;
import br.com.flashcards.service.DeckService;
import br.com.flashcards.service.FlashcardService;

public class FlashcardsServiceTest extends JUnitTestConfig {

	@Autowired
	private DeckService deckService;
	
	@Autowired
	private MockAutenticatedUser autenticantedUser;
	
	@Autowired
	private FlashcardService flashcardService;
	
	private DeckDto deckDto;
	
	@Before
	public void deckTestsInit() {
		ReflectionTestUtils.setField(deckService, "userService", autenticantedUser.getUserService());
		ReflectionTestUtils.setField(flashcardService, "userService", autenticantedUser.getUserService());
	}
	
	@Test
	public void mustSaveFlashcard() {
		FlashcardDto dto = flashcardBuilder();
		
		flashcardService.save(dto);
	}
	
	@Test
	public void mustSaveSameFlashcard() {
		FlashcardDto dto = flashcardBuilder();
		
		flashcardService.save(dto);
		flashcardService.save(dto);
	}

	private FlashcardDto flashcardBuilder() {
		deckDto = deckService.save(DeckTests.buildDeck());
		FlashcardDto dto = new FlashcardDto();
		dto.setDeck(deckDto);
		dto.setQuestion("Test question");
		dto.setAnswer("Test answer");
		return dto;
	}
	
	@Test(expected = FlashcardException.class)
	public void mustValidateNullQuestion() {
		FlashcardDto flashcardDto = new FlashcardDto();
		flashcardService.save(flashcardDto);
	}
	
	@Test(expected = FlashcardException.class)
	public void mustValidateEmptyQuestion() {
		FlashcardDto flashcardDto = new FlashcardDto();
		flashcardDto.setQuestion("");
		flashcardService.save(flashcardDto);
	}
	
	@Test(expected = FlashcardException.class)
	public void mustValidateNullAnswer() {
		FlashcardDto flashcardDto = new FlashcardDto();
		flashcardDto.setQuestion("not empty");
		flashcardService.save(flashcardDto);
	}
	
	@Test(expected = FlashcardException.class)
	public void mustValidateEmptyAnswer() {
		FlashcardDto flashcardDto = new FlashcardDto();
		flashcardDto.setQuestion("not empty");
		flashcardDto.setAnswer("");
		flashcardService.save(flashcardDto);
	}
	
	@Test
	public void mustFindAll() {
		FlashcardDto dto = flashcardBuilder();
		flashcardService.save(dto);
		
		List<FlashcardDto> list = flashcardService.findAll(dto.getDeck().getId(), Pageable.unpaged());
		
		Assertions.assertFalse(list.isEmpty());
	}
	
	@Test
	public void mustFindById() {
		FlashcardDto dto = flashcardBuilder();
		FlashcardDto entity = flashcardService.save(dto);
		
		Assertions.assertNotNull(flashcardService.findById(entity.getId()));
	}
	
	@Test
	public void mustFindAllOlderThan() {
		FlashcardDto dto = flashcardBuilder();
		flashcardService.save(dto);
	
		DeckDto deckDto = DeckTests.buildDeck();
		deckDto.setName("deck test 2");
		deckDto.setId(null);
		deckDto = deckService.save(deckDto);
		
		FlashcardDto dto2 = flashcardBuilder();
		dto2.setDeck(deckDto);
		flashcardService.save(dto2);
		
		LocalDateTime date = LocalDateTime.now();
		flashcardService.findAllOlderThan(date);
	}
	
	@Test(expected = FlashcardException.class)
	public void mustThrowExceptionIfQuestionNotFound() {
		FlashcardDto dto = flashcardBuilder();
		flashcardService.save(dto);
		
		flashcardService.findQuestion(dto.getDeck().getId(), "question not found");
	}
	
}
