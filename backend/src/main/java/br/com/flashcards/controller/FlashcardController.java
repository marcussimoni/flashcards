package br.com.flashcards.controller;

import java.util.List;

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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.flashcards.dto.FlashcardDto;
import br.com.flashcards.exception.FlashcardException;
import br.com.flashcards.service.FlashcardService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "question", produces = MediaType.APPLICATION_JSON_VALUE)
public class FlashcardController {

	private static final String QUESTION = "question";
	
	private FlashcardService service;
	
	public FlashcardController(FlashcardService service) {
		this.service = service;
	}
	
	@Cacheable(QUESTION)
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
	
	@CacheEvict(value = QUESTION, allEntries = true)
	@PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
	public FlashcardDto save(@RequestBody FlashcardDto dto) throws InterruptedException {
		return service.save(dto);
	}
	
	@CacheEvict(value = QUESTION, allEntries = true)
	@DeleteMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
	public void delete(@RequestBody List<Long> ids) throws InterruptedException {
		service.delete(ids);
	}
	
	@GetMapping(path = "older-flashcards")
	public List<FlashcardDto> findAllOlderThan(){
		return service.findAllOlderThan();
	}
	
}
