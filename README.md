# Flashcards Application

## requirements 

To run Flashcards app you'll need the following tools installed in your workspace:

* Node 12 
* Java 8
* maven 3

## Instalation

Execute the following commands on your terminal:

Clone the repository from github with the following command: 
 
```sh
git clone https://github.com/marcussimoni/flashcards.git
```

Enter into flashcards app folder. There're two folder inside project directory: frontend a backend. The frontend is the interface application created using react and the backend is the rest api server create using spring boot. Next step is to package and initialize the rest api server. For this you'll need to enter backend folder and execute: 

```sh
mvn clean package -DskipTests spring-boot:repackage
```

and after build has completed you'll need to initialize the application executing 

```sh
java -jar ./target/flashcards-0.0.1-SNAPSHOT.jar --spring.profiles.active=demo
```

After backend has started go to frontend folder and run the following command to download all dependencies necessary to run the application

```sh
npm install
``` 

to initialize and open the application in your web browser execute the next command

```sh
npm start
```

the frontend run on 

```sh
localhost:3000/flashcards
```

To access flashcards app type ***test@test.com*** in email adress field and ***test123*** in password field and click login

