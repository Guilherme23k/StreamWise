# Usando uma imagem base com JDK 17 para a construção
FROM eclipse-temurin:17-jdk-alpine AS build

WORKDIR /app

# Corrigido para Alpine
RUN apk update && apk add --no-cache wget unzip

COPY gradle /app/gradle
COPY gradlew /app/
COPY build.gradle /app/
COPY settings.gradle /app/
COPY src /app/src

RUN chmod +x gradlew

RUN ./gradlew build -x test

# Runtime
FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

COPY --from=build /app/build/libs/*.jar app.jar

ENV SPRING_PROFILES_ACTIVE=dev

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]
