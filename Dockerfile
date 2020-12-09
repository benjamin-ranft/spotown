FROM openjdk:15-oracle
MAINTAINER Benjamin Ranft <hello@benjaminranft.com>
ADD backend/target/spotown.jar app.jar
CMD ["sh" , "-c", "java -jar -Dserver.port=$PORT -Dspring.data.mongodb.uri=$MONGO_DB_URI -Djwt.secretkey=$JWT_SECRETKEY app.jar"]