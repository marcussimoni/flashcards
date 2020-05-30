package br.com.flashcards.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.flashcards.dto.DeckDto;
import br.com.flashcards.exception.FlashcardException;
import br.com.flashcards.mapper.DeckMapper;
import br.com.flashcards.model.Deck;
import br.com.flashcards.model.User;
import br.com.flashcards.repository.DeckRepository;
import br.com.flashcards.service.DeckService;
import br.com.flashcards.service.FlashcardService;
import br.com.flashcards.service.UserService;

@Service
public class DeckServiceImpl implements DeckService {

	@Autowired
	private DeckRepository repository;
	
	@Autowired
	private DeckMapper mapper;
	
	@Autowired
	private UserService userService;

	@Autowired
	private FlashcardService questionService;
	
	@Override
	public DeckDto save(DeckDto dto) {
		Deck entity = mapper.dtoToEntity(dto);
		entity.setUser(userService.userAuthenticated());
		return mapper.entityToDto(repository.save(entity));
	}

	@Override
	public DeckDto findById(Long id) {
		Deck deck = findDeckById(id);
		return mapper.entityToDto(deck);
	}

	@Override
	public Deck findDeckById(Long id) {
		Optional<Deck> optional = repository.findById(id);
		if(optional.isPresent()) {
			return optional.get();
		} else {
			throw new FlashcardException("Deck not found");
		}
	}

	@Override
	public List<DeckDto> findAll(Pageable page) {
		User user = userService.userAuthenticated();
		return mapper.entityToDto(repository.findAll(user, page));
	}

	@Override
	@Transactional
	public DeckDto remove(Long id) {
		Deck deck = findDeckById(id);
		questionService.deleteByDeck(deck);
		repository.delete(deck);
		return mapper.entityToDto(deck);
	}

	@Override
	@Transactional
	public DeckDto update(Long id, DeckDto dto) {
		Deck deck = findDeckById(id);
		
		deck.setName(dto.getName());
		deck.setDescription(dto.getDescription());
		deck.setActive(dto.isChecked());
		
		repository.save(deck);
		
		return mapper.entityToDto(deck);
	}

}
