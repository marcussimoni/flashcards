package br.com.flashcards.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.flashcards.dto.DeckTestResultDto;
import br.com.flashcards.dto.ResultDto;
import br.com.flashcards.dto.TestResultDto;
import br.com.flashcards.service.DeckTestResultService;

@RestController
@RequestMapping("test-result")
public class TestResultController {

	@Autowired
	private DeckTestResultService testResultService;
	
	@GetMapping
	public List<TestResultDto> findAll(Pageable page){
		return testResultService.findAll(page);
	}
	
	@PostMapping
	public Long save(@RequestBody List<DeckTestResultDto> result) {
		return testResultService.save(result);
	}
	
	@GetMapping(path = "/deck/{id}")
	public List<DeckTestResultDto> listTestResults(@PathVariable Long id){
		return testResultService.listTestResults(id);
	}
	
	@GetMapping(path = "/{id}")
	public ResultDto findById(@PathVariable Long id){
		return testResultService.findById(id);
	}
	
}
