package br.com.flashcards.service.impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import br.com.flashcards.model.Difficulty;
import br.com.flashcards.repository.DifficultyRepository;
import br.com.flashcards.service.DifficultyService;

@Service
public class DifficultyServiceImpl implements DifficultyService {

	@Autowired
	private DifficultyRepository repository;
	
	@Override
	@Cacheable("difficulty")
	public Optional<Difficulty> findById(Long id) {
		return repository.findById(id);
	}

}
