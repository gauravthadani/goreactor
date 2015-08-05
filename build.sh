#!/usr/bin/env bash

buildServiceImage() {
	servicename=$1		

	echo "Building Service image"

	if [ "${servicename}" = "" ]; then
		echo "No service specified"
		exit
	fi

	#if [ ! -f service/${servicename}/${servicename} ]; then
		echo "Compiling price app" 
		echo "Present directory :${PWD}"
		cd service/${servicename}
		go build		
		echo "Done"
		echo "Present directory :${PWD}"
	#fi

	#if [ -f service/${serivicename}/${serivicename} ]; then
		echo "Building docker image"
		imageName=${servicename}_image
		echo ${imageName}
		docker build --force-rm=true -t ${imageName} .	
		echo "Done"
	#fi	
	cd ../..
}

runService () {
	servicename=$1
	imageName=${servicename}_image

	echo $imageName

	if [ "$servicename" = "" ]; then
		echo "No service specified"
		exit
	fi
	
		
	container=${servicename}

	echo "Killing any running container"
	docker rm -f ${container}

	

	echo "Running ${servicename}"
	docker run -d -h ${container} --name ${container} $imageName

	echo "Updating dns"
	new_ip=$(docker inspect ${container} | grep IPAddress | cut -f4 -d'"')
	echo "IP of ${container} is ${new_ip}"
	sudo container=$conatiner,new_ip=${new_ip}  echo "host-record=${container},${new_ip}" > /opt/docker/dnsmasq.d/0host_$container
	sudo service dnsmasq restart
	echo "Done"
	

	
}

buildServiceImage "price" 
buildServiceImage "queryengine" 



if [ "$1" = "run" ]; then
runService "price" 
runService "queryengine" 

fi

