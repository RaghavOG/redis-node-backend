```bash
docker run --name redis-container -d -p 6379:6379 redis
```

docker start redis-container
```bash
docker start redis-container
```

to execute in command line
```bash
docker exec -it redis-container redis-cli
```


to stop the container 
```bash
docker stop redis-container
```


```bash
docker rm redis-container
```
