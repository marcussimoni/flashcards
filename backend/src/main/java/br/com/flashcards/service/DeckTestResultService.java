package br.com.flashcards.service;

import java.util.List;

import org.springframework.data.domain.Pageable;

import br.com.flashcards.dto.DeckTestResultDto;
import br.com.flashcards.dto.ResultDto;
import br.com.flashcards.dto.TestResultDto;

public interface DeckTestResultService {

	Long save(List<DeckTestResultDto> testResult);

	List<DeckTestResultDto> listTestResults(Long id);

	ResultDto findById(Long id);

	List<TestResultDto> findAll(Pageable page);
		
}
