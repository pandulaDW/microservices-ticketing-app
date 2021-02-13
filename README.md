## Ticketing Application made with Microservices
This application was made using Node.JS, Next JS, Typescript and Kubernetes. MongoDB was used 
as the DB for all services and NATS was used as the message broker. 

### Services
- Auth Service <br>
JWT based authentication using cookies, which contains,
    - SignUp - Signing Up users
    - SignIn - Signing In users
    - SignOut - Signing Out users
    - CurrentUser - Checking the validity of JWT for a given user



