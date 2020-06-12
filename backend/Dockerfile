FROM maven:3.3-jdk-8

WORKDIR /app

COPY . .

RUN mvn package -DskipTests

ENTRYPOINT ["java", "-jar", "./target/flashcards-0.0.1-SNAPSHOT.jar"]