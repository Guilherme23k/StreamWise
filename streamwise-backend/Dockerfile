# Usando uma imagem base com JDK 17
FROM openjdk:17-jdk-slim AS build

# Definindo o diretório de trabalho
WORKDIR /app

# Instalando wget e unzip
RUN apt-get update && \
    apt-get install -y wget unzip && \
    rm -rf /var/lib/apt/lists/*

# Copiando o arquivo build.gradle ou gradle-wrapper
COPY gradle /app/gradle
COPY build.gradle /app/
COPY settings.gradle /app/

# Copiando o código do projeto
COPY streamwise-backend/src /app/src

# Baixando e instalando o Gradle
RUN wget https://services.gradle.org/distributions/gradle-8.10.2-bin.zip && \
    unzip gradle-8.10.2-bin.zip -d /opt && \
    ln -s /opt/gradle-8.10.2/bin/gradle /usr/bin/gradle

# Comando para rodar o build
RUN gradle build -x test

# Usando uma imagem base para o ambiente de execução (JDK 17)
FROM openjdk:17-jdk-slim

# Copiando a aplicação compilada para o container final
COPY --from=build /app/build/libs /app

# Definindo o comando para rodar a aplicação (ajuste conforme necessário)
CMD ["java", "-jar", "/app/StreamWise-0.0.1-SNAPSHOT.jar"]
