package br.com.flashcards.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name = "DIFFICULTY", schema = "FLASHCARDS")
public class Difficulty implements Serializable {


	private static final long serialVersionUID = 5114546552841432229L;
	
	@Id
	@Column(name = "ID")
	private Long id;
	
	@Column(name = "description", length = 100, unique = true)
	private String description;

}
