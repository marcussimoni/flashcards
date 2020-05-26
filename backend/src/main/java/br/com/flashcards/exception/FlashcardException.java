package br.com.flashcards.exception;

public class FlashcardException extends RuntimeException {

	private static final long serialVersionUID = 8183197570702826925L;
	
	public FlashcardException(String msg, Exception e) {
		super(msg, e);
	}

	public FlashcardException(String msg) {
		super(msg);
	}
	
}
