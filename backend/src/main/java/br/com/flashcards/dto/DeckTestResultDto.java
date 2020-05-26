package br.com.flashcards.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class DeckTestResultDto extends FlashcardDto {

	private Long difficulty;
	
}
