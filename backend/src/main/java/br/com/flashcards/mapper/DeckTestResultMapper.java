package br.com.flashcards.mapper;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import br.com.flashcards.dto.TestResultDto;
import br.com.flashcards.model.DeckTestResult;

@Component
public class DeckTestResultMapper extends Mapper<DeckTestResult, TestResultDto>{

	public DeckTestResultMapper() {
		super(new ModelMapper());
	}

}
