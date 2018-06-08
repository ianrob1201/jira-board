#!/bin/sh

docker build -t jira-board .
docker tag jira-board:latest 192167080104.dkr.ecr.eu-west-1.amazonaws.com/jira-board:latest
docker push 192167080104.dkr.ecr.eu-west-1.amazonaws.com/jira-board:latest
