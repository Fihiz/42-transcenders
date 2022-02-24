Our [final common core project](https://cdn.intra.42.fr/pdf/pdf/31816/en.subject.pdf) for 42.

*__Purpose__*  
We'll need to build a website for "a mighty pong contest", to help users play pong against each other. There will be an admin view, a chat with moderators, real-time multiplayer online games...

*__Directions__*  
Backend should be written in NestJS. Databases must use PostgreSQL. Frontend must be written with any typescript framework.

*__Rendering__*  
The website should be a single page app, but the user should be able to use the back button on the browser https://en.wikipedia.org/wiki/Singlepage_application. The website must be usable on the latest version to date on Google Chrome, Firefox, Safari. There must be no unhandled errors or warnings when browsing through the website. Everything should run with a single call to docker-compose up –build.

*__Usage__*

To launch the app  
`docker compose up --build`  

To shut down  
`sh clean.sh`


*__Authors__*

Joel Benassac, Romain Lepart, Agathe Géraud, Pierre-louis Goudet, Salomé d'Audeteau
