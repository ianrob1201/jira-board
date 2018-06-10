#!/usr/bin/env bash

# more bash-friendly output for jq
JQ="jq --raw-output --exit-status"

configure_aws_cli(){
	aws --version
	aws configure set default.region eu-west-1
	aws configure set default.output json
}

deploy_cluster() {

    family="jira-board-task"

    echo 'Here'
    make_task_def
    echo 'Here'
    register_definition
    echo 'Here'
    echo $revision
    if [[ $(aws ecs update-service --cluster jira --service jira-service --task-definition $revision | \
                   $JQ '.service.taskDefinition') != $revision ]]; then
        echo "Error updating service."
        return 1
    fi

    # wait for older revisions to disappear
    # not really necessary, but nice for demos
    for attempt in {1..30}; do
        if stale=$(aws ecs describe-services --cluster jira --services jira-service | \
                       $JQ ".services[0].deployments | .[] | select(.taskDefinition != \"$revision\") | .taskDefinition"); then
            echo "Waiting for stale deployments:"
            echo "$stale"
            sleep 5
        else
            echo "Deployed!"
            return 0
        fi
    done
    echo "Service update took too long."
    return 1
}

make_task_def(){
	task_template='[
		{
			"name": "jira-board-container",
			"image": "192167080104.dkr.ecr.eu-west-1.amazonaws.com/jira-board:%s",
			"essential": true,
			"memory": 512,
			"cpu": 512,
			"portMappings": [
				{
					"containerPort": 3000,
                    "protocol": "tcp",
					"hostPort": 80
				}
			]
		}
	]'
	
	task_def=$(printf "$task_template" $CIRCLE_SHA1)
}

build_docker_image() {
    docker build -t jira-board .
}

push_ecr_image(){
	eval $(aws ecr get-login --region eu-west-1 --no-include-email)
    docker tag jira-board:latest 192167080104.dkr.ecr.eu-west-1.amazonaws.com/jira-board:$CIRCLE_SHA1
	docker push 192167080104.dkr.ecr.eu-west-1.amazonaws.com/jira-board:$CIRCLE_SHA1
}

register_definition() {

    if revision=$(aws ecs register-task-definition --container-definitions "$task_def" --family $family --memory 512 --cpu 512 | $JQ '.taskDefinition.taskDefinitionArn'); then
        echo "Revision: $revision"
    else
        echo "Failed to register task definition"
        return 1
    fi

}

configure_aws_cli
build_docker_image
push_ecr_image
deploy_cluster