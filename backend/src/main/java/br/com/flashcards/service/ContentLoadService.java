package br.com.flashcards.service;

import java.io.IOException;

public interface ContentLoadService {
	
	String loadContent(String params, String cssSelector) throws IOException;
	
}
