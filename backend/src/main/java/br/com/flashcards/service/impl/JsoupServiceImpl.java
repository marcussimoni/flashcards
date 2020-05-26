package br.com.flashcards.service.impl;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import br.com.flashcards.service.ContentLoadService;

public class JsoupServiceImpl implements ContentLoadService {


	public String loadContent(String url, String cssSelector) throws IOException {
		
		Connection connect = Jsoup.connect(url);
		
		Document document = connect.get();
		
		Elements elements = document.select(cssSelector);
		
		List<String> words = new ArrayList<String>();
		
		for (Element element : elements) {
			words.add(element.text());
		}
		
		return String.join(", ", words);
		
	}
	
}
