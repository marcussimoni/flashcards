insert into flashcards.tb_user (id, first_name, last_name, email, username, password, timestamp) 
values (FLASHCARDS.SQ_USER.nextval, 'first name', 'last name', 'test@flashcards.com', 'test', 'password123456', CURRENT_TIMESTAMP());

insert into flashcards.difficulty values (1, 'Easy');
insert into flashcards.difficulty values (2, 'Medium');
insert into flashcards.difficulty values (3, 'Hard');