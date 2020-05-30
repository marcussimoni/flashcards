package br.com.flashcards.dto;

import lombok.Data;

@Data
public class FlashcardDto {

	private Long id;
	private String question;
	private String answer;
	private String obs;
	private DeckDto deck;
	private boolean checked;
	
}
