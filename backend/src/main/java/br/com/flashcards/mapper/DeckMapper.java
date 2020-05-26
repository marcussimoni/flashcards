package br.com.flashcards.mapper;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import br.com.flashcards.dto.DeckDto;
import br.com.flashcards.model.Deck;

@Component
public class DeckMapper extends Mapper<Deck, DeckDto>{

	public DeckMapper() {
		super(new ModelMapper());
	}

}
