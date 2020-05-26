package br.com.flashcards.model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name = "ANSWER", schema = "FLASHCARDS")
@SequenceGenerator(sequenceName = "SQ_ANSWER", name = "SQ_ANSWER", schema = "FLASHCARDS", allocationSize = 1, initialValue = 1)
public class Answer implements Serializable {

	private static final long serialVersionUID = -7634209430775692520L;

	@Id
	@GeneratedValue(generator = "SQ_ANSWER", strategy = GenerationType.SEQUENCE)
	private Long id;
	
	@ManyToOne
	@JoinColumn(name = "QUESTION_ID")
	private Flashcard question;
	
	@ManyToOne
	@JoinColumn(name = "DIFFICULTY_ID")
	private Difficulty difficulty;
	
	@ManyToOne
	@JoinColumn(name = "TEST_RESULT_ID")
	private DeckTestResult testResult;

	public Answer(Flashcard question, Difficulty difficulty, DeckTestResult testResult) {
		this.question = question;
		this.difficulty = difficulty;
		this.testResult = testResult;
	}
	
	public Answer() {}
	
}
