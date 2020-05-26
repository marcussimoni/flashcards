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
@Table(name = "DECK", schema = "FLASHCARDS")
@SequenceGenerator(sequenceName = "SQ_DECK", name = "SQ_DECK", schema = "FLASHCARDS", allocationSize = 1, initialValue = 1)
public class Deck implements Serializable {

	public Deck() {
		timeStamp = LocalDateTime.now();
	}
	
	private static final long serialVersionUID = 2152186386594099269L;
	
	@Id
	@Column
	@GeneratedValue(generator = "SQ_DECK", strategy = GenerationType.SEQUENCE)
	private Long id;

	@Column(name = "NAME", length = 100, nullable = false)
	private String name;
	
	@Column(name = "DESCRIPTION", length = 200, nullable = false)
	private String description;
	
	@Column(name = "TIMESTAMP", nullable = false)
	private LocalDateTime timeStamp;
	
	@ManyToOne
	@JoinColumn(name = "COD_USER", nullable = false)
	private User user;
	
}
