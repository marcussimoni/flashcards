package br.com.flashcards;

import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit4.SpringRunner;


@SpringBootTest
@ActiveProfiles("test")
@RunWith(SpringRunner.class)
public class JUnitTestConfig {}