# Orida

## Prerequisites
Docker and docker-compose must be installed and running.

## Install
Simply run the following script to initiate bootstrapping
```
./script/bootstrap
```

## Run
Launch your containers by using :
```
./script/server
```

## Provision a new environment
Check under `/environments` folder for Terraform information about provisionning

## Deploy
Deploy is automatically performed by Circle CI on each push on target branches (develop and main)
