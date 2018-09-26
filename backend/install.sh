if [ "$EUID" -ne 0 ]
  then echo "Please run as root"
  exit
fi


echo "Welcome to the VisCrime automatic installation script."
echo "If anything goes wrong, please email me at 101162341@student.swin.edu.au"

if [ "$(uname)" == "Darwin" ]; then
    echo "Setting up VisCrime for macOS..."  
    echo "Getting dependencies..."
    /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
    brew update
    brew install mongodb
    brew install node
    tar -xvzf VisCrime.tar.gz
    mv VisCrime ~/VisCrime
    cd ~/VisCrime
    npm install
elif [ "$(expr substr $(uname -s) 1 5)" == "Linux" ]; then
    echo "Setting up VisCrime for Ubuntu..."
    echo "Getting dependencies..."
    apt-get update
    apt-get upgrade
    apt-get install mongodb
    apt-get install npm
    apt-get install nodejs
    tar -xvzf VisCrime.tar.gz
    mv VisCrime ~/VisCrime
    cd ~/VisCrime
    npm install

fi
echo "Installation Complete!"