package br.com.flashcards.model;

import java.io.Serializable;
import java.time.LocalDateTime;

import javax.persistence.Column;
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
@Table(name = "FLASHCARD", schema = "FLASHCARDS")
@SequenceGenerator(name = "SQ_FLASHCARD", sequenceName = "SQ_FLASHCARD",
				   allocationSize = 1, initialValue = 1, schema = "FLASHCARDS")	
public class Flashcard implements Serializable {

	public Flashcard() {
		timeStamp = LocalDateTime.now();
		this.active = true;
	}
	
	private static final long serialVersionUID = 6919087746469243934L;
	
	@Id
	@GeneratedValue(generator = "SQ_FLASHCARD", strategy = GenerationType.SEQUENCE)
	private Long id;

	@Column(name = "QUESTION", length = 100, nullable = false)
	private String question;
	
	@Column(name = "ANSWER", length = 4000, nullable = false)
	private String answer;
	
	@Column(nullable = false)
	private LocalDateTime timeStamp;
	
	@ManyToOne
	@JoinColumn(name = "COD_DECK", nullable = false)
	private Deck deck;
	
	@Column(name = "ACTIVE")
	private Boolean active;
	
}
