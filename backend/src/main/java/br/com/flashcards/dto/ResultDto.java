package br.com.flashcards.dto;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import lombok.Data;

@Data
public class ResultDto implements Serializable {

	private static final long serialVersionUID = 486304844542348925L;
	private String description;
	private LocalDateTime timeStamp;
	
	List<TotalAnswer> answers = new ArrayList<TotalAnswer>();
	
}
