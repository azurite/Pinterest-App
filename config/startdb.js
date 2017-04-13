const exec = require("child_process").exec;
exec(
  "C:/\"Program Files\"/MongoDB/Server/3.2/bin/mongod.exe --dbpath=C:/Users/Marko/Documents/GitHub/\"Pinterest App\"/DB/data",
  (err, stdout, stderr) => {
    if(err) {
      console.log(err);
    }
    else if(stdout !== "") {
      console.log(stdout);
    }
    else {
      console.log(stderr);
    }
  }
);
