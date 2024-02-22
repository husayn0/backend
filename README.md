## Summary 
A full-stack web application with both frontend and backend components. The application includes user authentication and utilizes a Docker container for deployment on a Linux machine hosted on DigitalOcean.
The application uses JWT for user authentication, and applying SSL connections all over the interactions.
Developed using Angular 17 framework on the frontend, Node for the backend, MySQL for the database created on DigitalOcean.


![Untitled Diagram](https://github.com/husayn0/backend/assets/160388694/24fdfb62-74ea-45f6-8515-503f5472502f)


## Frontend
[Frontend](https://github.com/husayn0/frontend)
Angular user-friendly frontend with a sign-up/login screen. Upon successful login, personalize the user experience by greeting them with their name.

1. Check if there is a saved token and valid.
2. Check if the username exists on signup.
3. Login and save the token.
4. Greeting and logout.

## Backend
[Backend](https://github.com/husayn0/backend)
Node backend server (SSL implemented) that includes user authentication using JWT (JSON Web Token), and bcrypt to hash passwords.

## Dockerization and Deployment
- docker-compose.yml and dockerfile are written for both node and angular(uploaded to each repository).
- Node docker image is pushed to docker hub repository in order to pull to the digitalocean droplet, then run it. while the angular image isn't created, it made errors in pulling the node, maybe because of using the latest version, node-21.
- To run the angular project, Node21, NPM, and Nginx are downloaded on the droplet, and the nginx is configured (configuration file uploaded to the backend repository).
- Serving angular project by listening to port:443 SSL, and acts as a proxy server for node docker container( to avoid CORS errors).
- on DigitalOcean:
    1. add droplet.
    2. add mysql database.
    3. no domain added (ip is used in all process), free domain provider given not working. so the DNS part (mapping and DNS fields are not set).
- SSL certificates are genearted through openssl library, since an authorized certificate needs domain name.

## Why Node?
- With Node.js, you can use JavaScript both on the client and server side, which enables full stack development with a single language.
- It is scalable and has a rich ecosystem of packages and libraries.
- High efficiency for handling concurrent requests.
- High performance and decent community support.
  
## Why Angular?
- It is built with Typescript, which offers many advantages like code maintainability, tooling support, and scalability. It is also the same language that the node is built on.
- Not the type of project to prove my choice, since it is a lightweight frontend then any framework can be a good choice, but angular is a comprehensive framework that provides a clear structure, offers built-in solutions, and is a robust and scalable framework.

## Why mysql?
- The simplicity of the database model makes it difficult to determine which type, whether relational or non-relational, is more appropriate.
- MySQL is an open source relational database, being stable and reliable for many years, has a high performance.

## Testing

* Link to the web application homepage: [TestFrontend](https://128.199.63.11/login)
* link to the docker hub node backend image: [DockerHub](https://hub.docker.com/r/husayn0/husayn0repo)
* Api tested using insomnia:

![2](https://github.com/husayn0/backend/assets/160388694/54e1d940-4e83-4b91-8ee9-cb27bf25b91a)


