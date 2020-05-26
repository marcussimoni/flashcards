package br.com.flashcards.service.impl;

import java.util.Optional;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import br.com.flashcards.model.Difficulty;
import br.com.flashcards.repository.DifficultyRepository;
import br.com.flashcards.service.DifficultyService;

@Service
public class DifficultyServiceImpl implements DifficultyService {

	private DifficultyRepository repository;

	public DifficultyServiceImpl(DifficultyRepository repository) {
		this.repository = repository;
	}
	
	@Override
	@Cacheable("difficulty")
	public Optional<Difficulty> findById(Long id) {
		return repository.findById(id);
	}

}
