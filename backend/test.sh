#!/bin/bash

for i in $(find . -path ./node_modules -prune -o -name "*.js" -print); 
	do node --check $i;
	if [ "$?" -gt 0 ]
	then
		exit 1; 
	fi
done