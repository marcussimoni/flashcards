package br.com.flashcards.service;

import java.util.List;

import br.com.flashcards.dto.DeckTestResultDto;
import br.com.flashcards.dto.ResultDto;

public interface DeckTestResultService {

	Long save(List<DeckTestResultDto> testResult);

	List<DeckTestResultDto> listTestResults(Long id);

	ResultDto findById(Long id);
		
}
