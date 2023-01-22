


# budget-manager-backend
(Core Code upskilling) Luis Serrano's Budget Manager, backend project.


# How to run it
Use: $> npm start

# docker compile backend image 
```$> docker build -t budgetman-backend:1.0.0 .```
### Running 
```$>  docker run -p 8500:8500 budgetman-backend:1.0.0```

### Register image in docker hub
```
1) docker tag budgetman-backend:1.0.0 luserrano/budgetman-backend:1.0.0
2) docker push luserrano/budgetman-backend:1.0.0

```