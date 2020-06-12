# Flashcards Application

## requirements 

To run Flashcards app you'll need the following tools installed in your workspace:

* Node 12
* Java 8
* maven 3

## Instalation

Execute the following commands on your terminal:

1. clone project from github `git clone https://github.com/marcussimoni/flashcards.git`

2. type `cd flashcards`  to enter into flashcards app folder. There're two folder inside project directory: frontend a backend. The frontend is the interface application created using react and the backend is the rest api server create using spring boot.

3. Next step is to package and initialize the rest api server. For this you'll need to enter `cd backend` and execute `mvn clean package -DskipTests spring-boot:repackage` and after package is completed you'll need to initialize the application executing `java -jar target/spring-boot-ops.war`

3. after cloned project into your workspace enter in frontend folder and run: `npm install` to download all dependencies necessary to run the application.

4. After `npm install` completed you need to run `npm start` to initialize application

