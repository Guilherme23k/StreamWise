# Usa uma imagem oficial do OpenJDK como base
FROM openjdk:17-jdk-slim

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia o arquivo JAR da aplicação para o container
COPY build/libs/StreamWise-0.0.1-SNAPSHOT.jar app.jar

# Expor a porta da aplicação
EXPOSE 8080

# Definir o perfil ativo como dev por padrão
ENV SPRING_PROFILES_ACTIVE=dev

# Comando para rodar a aplicação
ENTRYPOINT ["java", "-jar", "app.jar"]