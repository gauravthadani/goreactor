#!/usr/bin/env bash

buildServiceImage() {
	servicename=$1
	if [ "$servicename" -eq "" ]; then
		echo "No service specified"
		exit
	fi

	if [ ! -f service/${serivicename}/${serivicename} ]; then
		echo "Compiling price app"
		cd service/${serivicename}
		go build
		cd ../..
		echo "Done"
	fi

	if [ -f service/${serivicename}/${serivicename} ]; then
		echo "Building docker image"
		docker build -t ${serivicename}_image .	
		echo "Done"
	fi
}

runService () {
	servicename=$1
	imageName=${servicename}_image

	if [ "$servicename" -eq "" ]; then
		echo "No service specified"
		exit
	fi

	cd service/${serivicename}

	if [ $1 = "run" ]; then

		echo "Killing any running container"
		docker rm -f $imageName

		container=${servicename}

		echo "Running ${servicename}"
		docker run -d -h ${container} --name ${container} $imageName

		echo "Updating dns"
		new_ip=$(docker inspect ${container} | grep IPAddress | cut -f4 -d'"')
		sudo container=$conatiner,new_ip=${new_ip}  echo "host-record=${container},${new_ip}" > /opt/docker/dnsmasq.d/0host_$container
		sudo service dnsmasq restart
		echo "Done"
	fi
}

buildServiceImage price 
buildServiceImage queryengine

runImage price 
runImage queryengine

if [ $1 = "run" ]; then
	
	echo "Killing any running contaainer"
	docker rm -f goreactor
	
	echo "Running goreactor"
	docker run -d -h goreactor --name goreactor goreactor_image

	echo "Updating dns"
	container='goreactor'
	new_ip=$(docker inspect $container | grep IPAddress | cut -f4 -d'"')
	sudo container=$conatiner,new_ip=$new_ip  echo "host-record=$container,$new_ip" > /opt/docker/dnsmasq.d/0host_$container
	sudo service dnsmasq restart
	echo "Done"
fi

