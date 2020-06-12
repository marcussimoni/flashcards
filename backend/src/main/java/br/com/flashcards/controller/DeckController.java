package br.com.flashcards.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.flashcards.dto.DeckDto;
import br.com.flashcards.service.DeckService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "deck")
public class DeckController {

	@Autowired
	private DeckService service;

	@GetMapping
	public List<DeckDto> findAll(Pageable page) {
		return service.findAll(page);
	}
	
	@GetMapping(path = "{id}")
	public DeckDto findById(@PathVariable Long id) {
		return service.findById(id);
	}
	
	@PostMapping
	public DeckDto save(@RequestBody DeckDto dto) {
		return service.save(dto);
	}
	
	@PutMapping(path = "{id}")
	public DeckDto update(@PathVariable Long id, @RequestBody DeckDto dto) {
		return service.update(id, dto);
	}
	
	@DeleteMapping(path = "{id}")
	public DeckDto delete(@PathVariable Long id) {
		return service.remove(id);
	}
	
}
