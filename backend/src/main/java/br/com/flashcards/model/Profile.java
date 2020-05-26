package br.com.flashcards.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.springframework.security.core.GrantedAuthority;

import lombok.Data;

@Data
@Entity
@Table(name = "PROFILE", schema = "FLASHCARDS")
@SequenceGenerator(name = "SQ_PROFILE", sequenceName = "SQ_PROFILE",schema = "FLASHCARDS", initialValue = 1)
public class Profile implements GrantedAuthority {

	private static final long serialVersionUID = -5626301714534510141L;

	@Id
	@GeneratedValue(generator = "profile_sq", strategy = GenerationType.SEQUENCE)
	private Long id;
	
	@Column
	private String profile;
	
	@Override
	public String getAuthority() {
		return profile;
	}

}
