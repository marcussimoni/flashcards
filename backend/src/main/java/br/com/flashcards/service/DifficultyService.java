package br.com.flashcards.service;

import java.util.Optional;

import br.com.flashcards.model.Difficulty;

public interface DifficultyService {

	Optional<Difficulty> findById(Long id);
	
}
