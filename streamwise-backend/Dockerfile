# Usando uma imagem base com JDK 17 para a construção
FROM openjdk:17-jdk-slim AS build

# Definindo o diretório de trabalho
WORKDIR /app

# Instalando wget e unzip, caso precise mais tarde
RUN apt-get update && \
    apt-get install -y wget unzip && \
    rm -rf /var/lib/apt/lists/*

# Copiando o Gradle Wrapper, arquivos de configuração e código-fonte
COPY gradle /app/gradle
COPY gradlew /app/
COPY build.gradle /app/
COPY settings.gradle /app/
COPY src /app/src

# Garantindo que o Gradle Wrapper tenha permissão de execução
RUN chmod +x gradlew

# Comando para rodar o build com Gradle Wrapper (não precisa baixar Gradle manualmente)
RUN ./gradlew build -x test

# Usando uma imagem base para o ambiente de execução (JDK 17)
FROM openjdk:17-jdk-slim

# Definindo o diretório de trabalho
WORKDIR /app

# Copiando a aplicação compilada do estágio de build para o container final
COPY --from=build /app/build/libs /app

# Definindo o comando para rodar a aplicação
CMD ["java", "-Dspring.profiles.active=dev", "-jar", "/app/StreamWise-0.0.1-SNAPSHOT.jar"]
