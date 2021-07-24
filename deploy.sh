docker build -t lorenzocampanella/multi-client:latest -t lorenzocampanella/multi-client:$SHA ./client/Dockerfile ./client
docker build -t lorenzocampanella/multi-server:latest -t lorenzocampanella/multi-server:$SHA ./server/Dockerfile ./server
docker build -t lorenzocampanella/multi-worker:latest -t lorenzocampanella/multi-worker:$SHA ./worker/Dockerfile ./worker

docker push lorenzocampanella/multi-client
docker push lorenzocampanella/multi-server
docker push lorenzocampanella/multi-worker

kubectl apply -f k8s

kubectl set image deployments/client-deployment client=lorenzocampanella/multi-client:$SHA
kubectl set image deployments/server-deployment server=lorenzocampanella/multi-server:$SHA
kubectl set image deployments/worker-deployment worker=lorenzocampanella/multi-worker:$SHA
