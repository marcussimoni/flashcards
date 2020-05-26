package br.com.flashcards.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import br.com.flashcards.exception.FlashcardException;
import br.com.flashcards.service.ContentLoadService;
import br.com.flashcards.service.TranslateService;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service("linguee")
public class LingueeServiceImpl implements TranslateService {

	private final ContentLoadService contentLoadService;
	
	public LingueeServiceImpl() {
		contentLoadService = new JsoupServiceImpl();
	}
	
	@Override
	public String translate(List<String> words) {
		return translate(getParams(words)); 
	}

	private String translate(String words) {
		try {
			return contentLoadService.loadContent(getServiceUrl() + words, "a.featured");
		} catch (Exception e) {
			String msg = "Error while trying to translate";
			log.error(msg, e);
			throw new FlashcardException(msg);
		}
	}

	@Override
	public String getServiceName() {
		return "Linguee";
	}

	@Override
	public String getServiceUrl() {
		return "https://www.linguee.com.br/portugues-ingles/search?source=auto&query=";
	}

	@Override
	public String getParams(List<String> words) {
		return String.join("+", words);
	}

}
