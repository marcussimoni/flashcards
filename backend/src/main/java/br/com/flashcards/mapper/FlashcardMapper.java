package br.com.flashcards.mapper;

import javax.annotation.PostConstruct;

import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.springframework.stereotype.Component;

import br.com.flashcards.dto.FlashcardDto;
import br.com.flashcards.model.Flashcard;

@Component
public class FlashcardMapper extends Mapper<Flashcard, FlashcardDto>{

	public FlashcardMapper() {
		super(new ModelMapper());
	}

	@PostConstruct
	public void configMapper() {
		mapper.addMappings(new PropertyMap<Flashcard, FlashcardDto>() {

			@Override
			protected void configure() {
				map().setChecked(source.getActive());
			}
			
		});
		
	}
	
}
