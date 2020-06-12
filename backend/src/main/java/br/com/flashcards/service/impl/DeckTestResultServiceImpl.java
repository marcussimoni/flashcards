package br.com.flashcards.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.flashcards.dto.DeckDto;
import br.com.flashcards.dto.DeckTestResultDto;
import br.com.flashcards.dto.ResultDto;
import br.com.flashcards.dto.TestResultDto;
import br.com.flashcards.dto.TotalAnswer;
import br.com.flashcards.mapper.DeckTestResultMapper;
import br.com.flashcards.model.Answer;
import br.com.flashcards.model.Deck;
import br.com.flashcards.model.DeckTestResult;
import br.com.flashcards.model.Difficulty;
import br.com.flashcards.model.Flashcard;
import br.com.flashcards.model.User;
import br.com.flashcards.repository.DeckTestResultRepository;
import br.com.flashcards.repository.DeckTestResultRepository.IResultDto;
import br.com.flashcards.service.DeckService;
import br.com.flashcards.service.DeckTestResultService;
import br.com.flashcards.service.DifficultyService;
import br.com.flashcards.service.FlashcardService;
import br.com.flashcards.service.UserService;

@Service
public class DeckTestResultServiceImpl implements DeckTestResultService {

	@Autowired
	private DifficultyService difficultyService;
	
	@Autowired
	private DeckTestResultRepository repository;
	
	@Autowired
	private FlashcardService questionService;
	
	@Autowired
	private DeckService deckService;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private DeckTestResultMapper deckTestResultMapper;
	
	@Override
	@Transactional
	public Long save(List<DeckTestResultDto> result) {
		
		DeckTestResult entity = new DeckTestResult();
		
		entity.setUser(userService.userAuthenticated());
		entity.setDeck(getDeck(result));
		
		List<Answer> answers = result.stream().map(dto -> this.answerBuilder(dto, entity)).collect(Collectors.toList());
		
		entity.setAnswers(answers);
		
		DeckTestResult saved = repository.save(entity);
		
		return saved.getId();
		
	}
	
	private Deck getDeck(List<DeckTestResultDto> result) {
		DeckDto deck = result.get(0).getDeck();
		return deckService.findDeckById(deck.getId());
	}

	private Answer answerBuilder(DeckTestResultDto dto, DeckTestResult testResult){
		Difficulty difficulty = difficultyService.findById(dto.getDifficulty()).get();
		Flashcard question = questionService.findById(dto.getId()).get();
		
		return new Answer(question, difficulty, testResult);
	}

	@Override
	public List<DeckTestResultDto> listTestResults(Long deckId) {
		return repository.findByDeck(deckId);
	}

	@Override
	public ResultDto findById(Long id) {
		
		ResultDto dto = new ResultDto();
		
		List<IResultDto> result = repository.findTestResultById(id);
		
		if(!result.isEmpty()) {
			IResultDto iResultDto = result.get(0);
			dto.setTimeStamp(iResultDto.getTimestamp());
			dto.setDescription(iResultDto.getDeckName());
			
			List<TotalAnswer> answers = result.stream().map(item -> {
				return new TotalAnswer(item.getDescription(), item.getTotal());
			}).collect(Collectors.toList());
			
			dto.setAnswers(answers);
		}
		
		return dto;
	}
	
	@Override
	public List<TestResultDto> findAll(Pageable page){
		User user = userService.userAuthenticated();
		List<DeckTestResult> result = repository.findAll(user, page);
		return deckTestResultMapper.entityToDto(result);
	}
}
