package br.com.flashcards;

import java.time.LocalDate;
import java.util.Optional;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

import br.com.flashcards.dto.UserDto;
import br.com.flashcards.model.User;
import br.com.flashcards.service.UserService;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@SpringBootApplication
public class FlashcardsApplication {

	public static void main(String[] args) {
		
		System.setProperty("webdriver.chrome.driver","C:\\Users\\marcus\\Downloads\\chromedriver_win32\\chromedriver.exe");
		
		ConfigurableApplicationContext context = SpringApplication.run(FlashcardsApplication.class, args);
		
		createTestUser(context);
		
		log.info("************************************");
		log.info("** Flashcards server is running  ***");
		log.info("************************************");
		
	}

	@Transactional
	private static void createTestUser(ConfigurableApplicationContext context) {
		BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
		
		String password = bcrypt.encode("123456");
		System.out.println("PASSWORD: " + password);
		
		UserService service = context.getBean(UserService.class);
		
		Optional<User> optional = service.findByUsername("marcus");
		
		if(!optional.isPresent()) {
			UserDto dto = new UserDto();
			dto.setUsername("marcus");
			dto.setEmail("teste@teste.com");
			dto.setFirstName("first name");
			dto.setLastName("last name");
			dto.setPassword(password);
			dto.setBirthDate(LocalDate.now());
			service.createAcount(dto);
		}
	}

}
