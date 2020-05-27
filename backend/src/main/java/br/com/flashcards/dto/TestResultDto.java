package br.com.flashcards.dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class TestResultDto {

	private Long id;
	private LocalDateTime timeStamp;
	private DeckDto deck;
	
}
