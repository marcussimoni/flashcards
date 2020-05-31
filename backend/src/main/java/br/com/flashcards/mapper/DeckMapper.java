package br.com.flashcards.mapper;

import javax.annotation.PostConstruct;

import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.springframework.stereotype.Component;

import br.com.flashcards.dto.DeckDto;
import br.com.flashcards.model.Deck;

@Component
public class DeckMapper extends Mapper<Deck, DeckDto>{

	public DeckMapper() {
		super(new ModelMapper());
	}

	@PostConstruct
	public void configMapper() {
		mapper.addMappings(new PropertyMap<Deck, DeckDto>() {

			@Override
			protected void configure() {
				map().setChecked(source.getActive());
			}
			
		});
		
	}
	
}
