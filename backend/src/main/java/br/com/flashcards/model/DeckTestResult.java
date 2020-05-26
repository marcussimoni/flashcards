package br.com.flashcards.model;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name = "DECK_TEST_RESULT", schema = "FLASHCARDS")
@SequenceGenerator(sequenceName = "SQ_DECK_TEST_RESULT", name = "SQ_DECK_TEST_RESULT", schema = "FLASHCARDS", allocationSize = 1, initialValue = 1)
public class DeckTestResult implements Serializable {
	
	private static final long serialVersionUID = 6687855163746357558L;

	@Id
	@GeneratedValue(generator = "SQ_DECK_TEST_RESULT", strategy = GenerationType.SEQUENCE)
	private Long id;	
	
	@ManyToOne
	@JoinColumn(name = "DECK_ID")
	private Deck deck;
	
	@ManyToOne
	@JoinColumn(name = "USER_ID")
	private User user;
	
	@Column(name = "TIMESTAMP")
	private LocalDateTime timeStamp;
	
	@OneToMany(mappedBy = "testResult", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
	private List<Answer> answers = new ArrayList<Answer>();

	public DeckTestResult(){
		this.timeStamp = LocalDateTime.now();
	}
	
}
