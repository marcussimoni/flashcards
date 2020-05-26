package br.com.flashcards.dto;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TotalAnswer implements Serializable {

	private static final long serialVersionUID = -1849295386799566774L;
	private String description;
	private Integer total;
	
}
