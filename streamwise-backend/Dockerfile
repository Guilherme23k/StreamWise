# Usando uma imagem base com JDK 17
FROM openjdk:17-jdk-slim AS build

# Definindo o diretório de trabalho
WORKDIR /app

# Instalando wget e unzip
RUN apt-get update && \
    apt-get install -y wget unzip && \
    rm -rf /var/lib/apt/lists/*

# Copiando os arquivos necessários do Gradle
COPY gradle /app/gradle
COPY build.gradle /app/
COPY settings.gradle /app/

# Copiando o código do projeto
COPY src /app/src

# Copiando o Gradle Wrapper (gradlew e gradle-wrapper.properties)
COPY gradlew /app/
COPY gradle-wrapper.properties /app/gradle/wrapper/

# Garantindo que o gradlew tenha permissão de execução
RUN chmod +x gradlew

# Baixando e instalando o Gradle (se preferir usar uma versão global)
RUN wget https://services.gradle.org/distributions/gradle-8.10.2-bin.zip && \
    unzip gradle-8.10.2-bin.zip -d /opt && \
    ln -s /opt/gradle-8.10.2/bin/gradle /usr/bin/gradle

# Comando para rodar o build
RUN ./gradlew build -x test

# Usando uma imagem base para o ambiente de execução (JDK 17)
FROM openjdk:17-jdk-slim

# Copiando a aplicação compilada para o container final
COPY --from=build /app/build/libs /app

# Definindo o comando para rodar a aplicação (ajuste conforme necessário)
CMD ["java", "-Dspring.profiles.active=dev", "-jar", "/app/StreamWise-0.0.1-SNAPSHOT.jar"]
