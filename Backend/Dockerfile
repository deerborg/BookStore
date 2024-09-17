FROM maven AS build

WORKDIR /app

COPY ./pom.xml /app
COPY ./src /app/src

RUN mvn clean package -Dmaven.test.skip=true

FROM openjdk

WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]