const pty = require("node-pty");
var fs = require("fs");
var mime = require("mime-types");

exports.scanGet = function(req, res) {
  res.render("scan");
};

exports.scanPost = async (req, res) => {
  //save image and get image path here
  var file = req.files.file;
  var image_path = "storage/" + file.md5 + "." + mime.extension(file.mimetype);
  if (!(file.mimetype == "image/jpeg" || file.mimetype == "image/png")) {
    res.send({ error: "Error: incorrect file type" });
  }
  file.mv(image_path, function(err) {
    if (err) return res.status(500).send(err);
    console.log("Image moved to " + image_path);
  });

  const pyProcess = pty.spawn("python3", [
    process.cwd() + "/ml_model/model.py",
    "../" + image_path //the path gets passed to the python script as an argument
  ]);

  dataToSend = {};
  pyProcess.on("data", data => {
    // data is the output of the print command in the python script
    console.log(JSON.parse(data));
    dataToSend = JSON.parse(data);
  });

  pyProcess.on("exit", exitCode => {
    res.send({ result: dataToSend });
    console.log("model.py exiting with code " + exitCode);
  });
};
