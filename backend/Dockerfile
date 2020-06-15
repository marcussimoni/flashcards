FROM openjdk:8-jdk-alpine as build

WORKDIR /app

COPY ./target/flashcards.jar .

RUN ls -la

EXPOSE 8081

ENTRYPOINT ["java","-jar","flashcards.jar"]