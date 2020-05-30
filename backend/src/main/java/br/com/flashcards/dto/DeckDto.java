package br.com.flashcards.dto;

import java.io.Serializable;

import lombok.Data;

@Data
public class DeckDto implements Serializable {

	private static final long serialVersionUID = -520674327200291336L;
	
	private Long id;
	private String name;
	private String description;
	private boolean checked;

}
