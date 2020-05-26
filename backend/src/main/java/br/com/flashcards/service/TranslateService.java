package br.com.flashcards.service;

import java.util.List;

public interface TranslateService extends ContentService{

	String translate(List<String> words);
	String getParams(List<String> words);
	
}
