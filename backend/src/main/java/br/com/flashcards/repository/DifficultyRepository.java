package br.com.flashcards.repository;

import org.springframework.data.repository.CrudRepository;

import br.com.flashcards.model.Difficulty;

public interface DifficultyRepository extends CrudRepository<Difficulty, Long>{

}
