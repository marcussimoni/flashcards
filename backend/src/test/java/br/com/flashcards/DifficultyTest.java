package br.com.flashcards;

import java.util.Optional;

import org.junit.Test;
import org.junit.jupiter.api.Assertions;
import org.springframework.beans.factory.annotation.Autowired;

import br.com.flashcards.model.Difficulty;
import br.com.flashcards.service.DifficultyService;

public class DifficultyTest extends JUnitTestConfig {

	@Autowired
	private DifficultyService service;
	
	@Test
	public void mustFindById() {
		long id = 1L;
		Optional<Difficulty> optional = service.findById(id);

		Assertions.assertFalse(optional.isEmpty());
		
		Difficulty difficulty = optional.get();
		
		Assertions.assertEquals(id, difficulty.getId());
		Assertions.assertEquals("Easy", difficulty.getDescription());
	}
	
}
