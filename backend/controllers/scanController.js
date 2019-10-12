const pty = require("node-pty");

exports.scanGet = function(req, res) {
  res.render("scan");
};

exports.scanPost = async (req, res) => {
  //save image and get image path here
  image_path = "./fake_image.png";

  const pyProcess = pty.spawn("/usr/bin/python3", [
    process.cwd() + "/ml_model/model.py",
    image_path //the path gets passed to the python script as an argument
  ]);

  dataToSend = "";
  pyProcess.on("data", data => {
    // data is the output of the print command in the python script
    dataToSend += data;
  });

  pyProcess.on("exit", exitCode => {
    res.send({ prediction: dataToSend });
    console.log("model.py exiting with code " + exitCode);
  });
};
