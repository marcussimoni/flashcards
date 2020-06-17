package br.com.flashcards.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.flashcards.constants.FlashcardsContants;
import br.com.flashcards.dto.FlashcardDto;
import br.com.flashcards.dto.OlderFlashcardDto;
import br.com.flashcards.exception.FlashcardException;
import br.com.flashcards.service.FlashcardService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "question", produces = MediaType.APPLICATION_JSON_VALUE)
public class FlashcardController {

	@Autowired
	private FlashcardService service;
		
	@Cacheable(FlashcardsContants.QUESTION)
	@GetMapping(path = "deck/{deckId}")
	public List<FlashcardDto> findAll(@PathVariable Long deckId, @PageableDefault(size = 100, sort = "question", direction = Direction.ASC) Pageable page) throws InterruptedException {
		return service.findAll(deckId, page);
	}
	
	@GetMapping(path = "deck/{deckId}/question/{question}")
	public ResponseEntity<FlashcardDto> findQuestion(@PathVariable Long deckId, @PathVariable String question) throws InterruptedException {
		try {
			return ResponseEntity.ok(service.findQuestion(deckId, question));			
		} catch (FlashcardException e) {
			return ResponseEntity.notFound().build();
		}
	}
	
	@PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
	@CacheEvict(value = FlashcardsContants.QUESTION, allEntries = true)
	public FlashcardDto save(@RequestBody FlashcardDto dto) throws InterruptedException {
		return service.save(dto);
	}
	
	@DeleteMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
	@CacheEvict(value = FlashcardsContants.QUESTION, allEntries = true)
	public void delete(@RequestBody List<Long> ids) throws InterruptedException {
		service.delete(ids);
	}
	
	@GetMapping(path = "older-flashcards")
	public List<OlderFlashcardDto> findAllOlderThan(){
		LocalDateTime date = LocalDateTime.now().minusDays(7L);
		return service.findAllOlderThan(date);
	}
	
	@PutMapping(path = "older-flashcards")
	public void removeOldFlashcards(@RequestBody List<OlderFlashcardDto> flashcards){
		service.removeOldFlashcards(flashcards);
	}
	
}
