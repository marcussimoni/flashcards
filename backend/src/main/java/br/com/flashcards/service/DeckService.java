package br.com.flashcards.service;

import java.util.List;

import org.springframework.data.domain.Pageable;

import br.com.flashcards.dto.DeckDto;
import br.com.flashcards.model.Deck;

public interface DeckService {

	DeckDto save(DeckDto dto);
	DeckDto findById(Long id);
	List<DeckDto> findAll(Pageable page);
	DeckDto remove(Long id);
	
	Deck findDeckById(Long id);
	DeckDto update(Long id, DeckDto dto);
	
}
