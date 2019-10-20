#!/bin/bash
if [ "$EUID" -ne 0 ]
  then echo "Please run as root"
  exit
fi


echo "Welcome to the VisCrime automatic installation script."
echo "If anything goes wrong, please email me at 101162341@student.swin.edu.au"

unamestr=`uname`
if [[ "$unamestr" == 'Darwin' ]]; then
    echo "Setting up VisCrime for macOS..."  
    echo "Getting dependencies..."
    /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
    brew update
    brew install mongodb
    brew install node
    tar -xvzf VisCrime.tar.gz
    mv VisCrime ~/VisCrime
    cd ~/VisCrime/backend
    npm install
    pip3 install -r requirements.txt
elif [[ "$unamestr" == 'Linux' ]]; then
    echo "Setting up VisCrime for Ubuntu..."
    echo "Getting dependencies..."
    apt-get update
    apt-get upgrade
    curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
    sudo apt-get install -y nodejs
    apt-get install mongodb
    tar -xvzf VisCrime.tar.gz
    mv VisCrime ~/VisCrime
    cd ~/VisCrime/backend
    npm install
    pip3 install -r requirements.txt

fi
echo "Installation Complete!"