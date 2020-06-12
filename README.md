# Flashcards Application

## requirements 

To run Flashcards app you'll need the following tools installed in your workspace:

* Node 12 
* Java 8
* maven 3

## Instalation

Execute the following commands on your terminal:

1. Clone project from github `git clone https://github.com/marcussimoni/flashcards.git`

2. Type `cd flashcards`  to enter into flashcards app folder. There're two folder inside project directory: frontend a backend. The frontend is the interface application created using react and the backend is the rest api server create using spring boot.

3. Next step is to package and initialize the rest api server. For this you'll need to enter `cd backend` and execute `mvn clean package -DskipTests spring-boot:repackage` and after build is completed you'll need to initialize the application executing `java -jar ./target/flashcards-0.0.1-SNAPSHOT.jar --spring.profiles.active=demo`

4. After backend has started go to frontend folder and run: `npm install` to download all dependencies necessary to run the application and then `npm start` to initialize and open the application in your web browser.

5. To access flashcards app type ***test@test.com*** in username field and ***test123*** in password field and click login

