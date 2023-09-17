# TELEMEDI TASK

## Project setup

To start project simply run `bin/task start` command.
(You may need to run `chmod 777 bin/task` command before.)

## Backend setup ##
1. Enter backend container with command: ```bin/task enter-php```
2. Run ```composer install```
3. Run ```php bin/console doctrine:migrations:migrate```
4. Exit backend container with command: ```exit```

## Frontend setup ##
1. Enter frontend container with command: ```bin/task enter-front```
2. Run ```yarn install```
3. Run ```yarn encore production```

Now you can access the project at http://localhost:887