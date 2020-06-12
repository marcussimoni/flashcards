package br.com.flashcards.service.impl;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import br.com.flashcards.constants.FlashcardsContants;
import br.com.flashcards.dto.FlashcardDto;
import br.com.flashcards.dto.OlderFlashcardDto;
import br.com.flashcards.exception.FlashcardException;
import br.com.flashcards.mapper.FlashcardMapper;
import br.com.flashcards.model.Deck;
import br.com.flashcards.model.Flashcard;
import br.com.flashcards.model.User;
import br.com.flashcards.repository.FlashcardRepository;
import br.com.flashcards.service.DeckService;
import br.com.flashcards.service.FlashcardService;
import br.com.flashcards.service.UserService;


@Service
public class FlashcardServiceImpl implements FlashcardService {

	@Autowired
	private FlashcardRepository repository;
	
	@Autowired
	private FlashcardMapper mapper;
	
	@Autowired
	private DeckService deckService;
	
	@Autowired
	private UserService userService;
	
	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public FlashcardDto save(FlashcardDto dto) {
		
		Optional<FlashcardDto> optional = validateQuestion(dto);
		
		if(optional.isPresent()) {
			return optional.get();
		}
		
		Flashcard entity = mapper.dtoToEntity(dto);
		
		capitalizeQuestion(entity);
		
		Deck deck = deckService.findDeckById(dto.getDeck().getId());
		entity.setDeck(deck);
		
		repository.save(entity);
				
		return mapper.entityToDto(entity);
		
	}

	private void capitalizeQuestion(Flashcard entity) {
		String question = entity.getQuestion();
		
		if(Objects.nonNull(question)) {

			entity.setQuestion(StringUtils.capitalize(question.trim().toLowerCase()));
			
		}
		
	}

	private Optional<FlashcardDto> validateQuestion(FlashcardDto dto) {
		
		String question = dto.getQuestion();
		
		if(Objects.isNull(question) || question.isEmpty()) {
			throw new FlashcardException("Question is mandatory");
		}
		
		if(Objects.isNull(dto.getAnswer()) || dto.getAnswer().isEmpty()) {
			throw new FlashcardException("Answer is mandatory");
		}
		
		Long questions = repository.questionExists(dto.getDeck().getId(), question.trim());
		
		if(questions == 1) {
			return Optional.of(findQuestion(dto.getDeck().getId(), question));
		}
				
		if(questions > 1) {
			throw new FlashcardException("Question already exists");			
		}
		
		return Optional.empty();
	}

	@Override
	public List<FlashcardDto> findAll(Long deckId, Pageable page) {
		Deck deck = deckService.findDeckById(deckId);
		return mapper.entityToDto(repository.findAll(deck, page).getContent());
	}

	@Override
	@Transactional
	public void delete(List<Long> ids) {
		for (Long id : ids) {
			if(repository.findById(id).isPresent()) {
				repository.deleteById(id);				
			}
		}
	}

	@Override
	public FlashcardDto findQuestion(Long deckId, String question) {
		Optional<Flashcard> optional = repository.findQuestion(deckId, question);
		if(optional.isPresent()) {
			return mapper.entityToDto(optional.get());
		} else {
			throw new FlashcardException("Question not found");
		}
	}

	@Override
	public void deleteByDeck(Deck deck) {
		List<Flashcard> questions = repository.findByDeck(deck);
		
		if(!questions.isEmpty()) {
			repository.deleteAll(questions);
		}
		
	}

	@Override
	@Cacheable("question")
	public Optional<Flashcard> findById(Long id) {
		return repository.findById(id);
	}

	@Override
	public List<OlderFlashcardDto> findAllOlderThan() {
		User user = userService.userAuthenticated();
		LocalDateTime date = LocalDateTime.now().minusDays(7L);
		
		List<FlashcardDto> list = mapper.entityToDto(repository.findAllOlderThan(user, date));
		List<OlderFlashcardDto> flashcards = new ArrayList<>();
		
		OlderFlashcardDto dto = new OlderFlashcardDto();
		
		for (FlashcardDto flashcard : list) {
			
			if(dto.getDeck().equals(flashcard.getDeck())) {
				
				flashcards.get(flashcards.size() - 1).getFlashcards().add(flashcard);
				
			} else {
				
				dto = new OlderFlashcardDto();
				dto.setDeck(flashcard.getDeck());
				dto.getFlashcards().add(flashcard);
				flashcards.add(dto);
				
			}
		}
		
		return flashcards;		
	}

	@Override
	@Transactional
	@CacheEvict(value = FlashcardsContants.QUESTION, allEntries = true)
	public void removeOldFlashcards(List<OlderFlashcardDto> list) {
		
		for (OlderFlashcardDto dto : list) {
			
			List<Long> flashcardsId = null;
			
			if(dto.getDeck().isChecked()) {
				
				flashcardsId = dto.getFlashcards().stream().map(FlashcardDto::getId).collect(Collectors.toList());
				
			} else {
				
				flashcardsId = dto.getFlashcards().stream().filter(FlashcardDto::isChecked).map(FlashcardDto::getId).collect(Collectors.toList());
				
			}
			
			if(!flashcardsId.isEmpty()) {
				inactivateOldFlashcards(flashcardsId);
			}
			
			updateTimeStamp(dto);
			
		}
		
	}

	private void updateTimeStamp(OlderFlashcardDto dto) {
		List<Long> ids = dto.getFlashcards().stream().filter(flashcard -> flashcard.isChecked() == false).map(FlashcardDto::getId).collect(Collectors.toList());
		repository.updateTimeStampFlashcards(LocalDateTime.now(), ids);		
	}

	private void inactivateOldFlashcards(List<Long> flashcardsId) {
		repository.inactivateOldFlashcards(flashcardsId);
	}
	
}
