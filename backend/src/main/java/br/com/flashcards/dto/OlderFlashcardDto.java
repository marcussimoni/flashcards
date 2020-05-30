package br.com.flashcards.dto;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import lombok.Data;

@Data
public class OlderFlashcardDto implements Serializable {

	private static final long serialVersionUID = -468475932872753320L;
	
	private DeckDto deck = new DeckDto();
	private List<FlashcardDto> flashcards = new ArrayList<>();

}
