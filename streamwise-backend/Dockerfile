# Usando uma imagem base com JDK 17 para a construção
FROM openjdk:17-jdk-slim AS build

# Definindo o diretório de trabalho
WORKDIR /app

# Instalando wget, unzip e dependências do Gradle
RUN apt-get update && \
    apt-get install -y wget unzip && \
    rm -rf /var/lib/apt/lists/*

# Copiando o Gradle Wrapper, arquivos de configuração e código-fonte
COPY gradle /app/gradle
COPY gradlew /app/
COPY build.gradle /app/
COPY settings.gradle /app/
COPY src /app/src

# Baixando e instalando o Gradle (caso precise, mas com o gradlew, não é necessário)
RUN chmod +x gradlew

# Comando para rodar o build
RUN ./gradlew build -x test

# Usando uma imagem base para o ambiente de execução (JDK 17)
FROM openjdk:17-jdk-slim

# Definindo o diretório de trabalho
WORKDIR /app

# Copiando a aplicação compilada do estágio de build para o container final
COPY --from=build /app/build/libs /app

# Definindo o comando para rodar a aplicação (ajuste conforme necessário)
CMD ["java", "-Dspring.profiles.active=dev", "-jar", "/app/StreamWise-0.0.1-SNAPSHOT.jar"]
