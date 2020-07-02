# Flashcards Application

## requirements 

To run Flashcards app you'll need the following tools installed in your workspace:

* Node 12.16.1
* Npm 6.13.4
* Java 8
* maven 3

## Instalation

Execute the following commands on your terminal:

Clone the repository from github with the following command: 
 
```sh
git clone https://github.com/marcussimoni/flashcards.git
```

Enter into flashcards app folder. There're two folder inside project directory: frontend a backend. The frontend is the interface application created using react and the backend is the rest api server create using spring boot. Next step is to package and initialize the application. For this you'll need to enter backend folder and execute: 

```sh
mvn clean package -DskipTests
```

This command will create a build of the backend (Spring boot) and the frontend (React). After build has completed you'll need to initialize the application executing 

```sh
java -jar ./target/flashcards.jar --spring.profiles.active=demo
```

To access flashcards app type ***test@test.com*** in email adress field and ***test123*** in password field and click login or create your own account clicking in the 'Create account' link.

