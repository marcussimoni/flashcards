package br.com.flashcards.dto;

import java.io.Serializable;

import lombok.Data;

@Data
public class DeckDto implements Serializable {

	public DeckDto() {}
	
	public DeckDto(Long id, String name, String description, boolean checked, Long totalFlashcards) {
		super();
		this.id = id;
		this.name = name;
		this.description = description;
		this.checked = checked;
		this.totalFlashcards = totalFlashcards;
	}
	private static final long serialVersionUID = -520674327200291336L;
	
	private Long id;
	private String name;
	private String description;
	private boolean checked;
	private Long totalFlashcards;

}
