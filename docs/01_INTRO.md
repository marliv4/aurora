## Tech stack
I used the Java programming language to implement the project, the Spring Boot Framework for the app itself and Vaadin for the user interface and graphical representation. For the database management system, I used PostgreSQL and the entire project can be compiled using Maven.

## Project structure
Aurora is made up of the following folders (`/aurora/src/main/java/com/livajusic/marko`):
* `/configuration`: This folder modifies Spring Security to allow requests and regulate the content uploaded by users as it should be served by the server.
* `/db_repos`: Interfaces from this folder extend JpaRepository and thus enable access to the respective repositories.
* `/services`: Classes from this folder interact with the repositories from (`/db_repos`) and update the values in the database tables.
* `/tables`: Classes from this folder use JPA to model the tables created by Spring.
* `/views`: Classes from this folder use Vaadin to display the app on the web.

## Difficulties / design decisions

Until now, displaying any images (be it displaying GIFs uploaded by users or profile pictures) caused me problems, as I initially saved them as static files in the Spring's /resource/ folder and only stored their paths in the database. Despite various configurations that tried to regulate the generation of static content, only HTML's "alt" elements were displayed, as the images were not available. Only after restarting the app could all images be displayed correctly. However, since I did not want this, I changed the database so that the images are saved as BLOBS, which may lead to a performance loss, but is much more pleasant in the user experience.