# Usa uma imagem oficial do OpenJDK como base
FROM openjdk:17-jdk-slim AS build

# Define o diretório de trabalho para a construção do projeto
WORKDIR /app

# Copia os arquivos do projeto para dentro do container
COPY . .

# Baixa dependências e gera o .jar
RUN ./gradlew build -x test

# Usa uma nova imagem apenas para rodar a aplicação
FROM openjdk:17-jdk-slim

WORKDIR /app

# Copia o .jar gerado na fase anterior
COPY --from=build /app/build/libs/StreamWise-0.0.1-SNAPSHOT.jar app.jar

# Expor a porta da aplicação
EXPOSE 8080

# Definir o perfil ativo como dev por padrão
ENV SPRING_PROFILES_ACTIVE=dev

# Comando para rodar a aplicação
ENTRYPOINT ["java", "-jar", "app.jar"]
