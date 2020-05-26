package br.com.flashcards.mapper;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import br.com.flashcards.dto.FlashcardDto;
import br.com.flashcards.model.Flashcard;

@Component
public class FlashcardMapper extends Mapper<Flashcard, FlashcardDto>{

	public FlashcardMapper() {
		super(new ModelMapper());
	}

}
