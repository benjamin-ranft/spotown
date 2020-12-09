FROM openjdk:15-oracle
MAINTAINER Benjamin Ranft <hello@benjaminranft.com>
ADD backend/target/spotown.jar app.jar
CMD ["sh" , "-c", "java -jar -Dserver.port=$PORT -Dspring.data.mongodb.uri=$MONGO_DB_URI -Djwt.secretkey=$JWT_SECRETKEY -Dreact.app.google.maps.api.key=$REACT_APP_GOOGLE_MAPS_API_KEY app.jar"]