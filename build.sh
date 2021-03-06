#!/usr/bin/env bash

buildServiceImage() {
	servicename=$1		

	echo "Building Service image"

	if [ "${servicename}" = "" ]; then
		echo "No service specified"
		exit
	fi

	#if [ ! -f service/${servicename}/${servicename} ]; then
		echo "Compiling ${servicename}"

		cd service/${servicename}
		go build
		if [ $? -ne 0 ]; then
			echo "Build of ${servicename} failed"
			exit
		fi	
		echo "Done"
	#fi

	#if [ -f service/${serivicename}/${serivicename} ]; then
		echo "Building docker image"
		imageName=${servicename}_image

		echo "Killing any running container"
		docker rm -f ${servicename}
		rm -f /opt/docker/dnsmasq.d/0host_${servicename}
	
		echo "Remove existing image"
		docker rmi -f ${imageName}

		docker build --force-rm=true -t ${imageName} .	
		echo "Done"
	#fi	
	cd ../..
}

runService () {
	servicename=$1
	options=$2
	daemonize=$3
	imageName=${servicename}_image
	
	runOpts="-d"
	if [ "${daemonize}" = "0" ]; then
		runOpts="-i"
	fi
	
	echo $imageName

	if [ "$servicename" = "" ]; then
		echo "No service specified"
		exit
	fi
	
	container=${servicename}

	echo "Running ${servicename}"
	docker run ${runOpts} -h ${container} --dns=172.17.42.1 ${options} --dns-search="docker.docker" --name ${container} $imageName

	echo "Updating dns"
	new_ip=$(docker inspect --format='{{.NetworkSettings.IPAddress}}' $servicename)
	echo "IP of ${container} is ${new_ip}"
	echo "host-record=${container}.docker.docker,${new_ip}" > /opt/docker/dnsmasq.d/0host_$container
	echo "Done"
}


buildAndRun() {
	servicename=$1
	if [ -a "$servicename" ]; then
		echo "No Service specified. Exiting"
		exit
	fi
	buildServiceImage ${servicename}
	runService ${servicename}
}

declare -a services=('queryengine' 'price')

if [ $# -eq 0 ]; then
	for SERVICE in ${services[@]}
	do
		echo "Build and Run ${SERVICE}"
		buildAndRun $SERVICE
	done
else
	buildAndRun $1
fi

sudo service dnsmasq restart