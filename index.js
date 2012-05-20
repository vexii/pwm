var tty = require("tty")
  , crypto = require("crypto")

var pwm = function(){
  var that = this
  this.isAuthed = false
  this.auth = function(cb){
    readPws(function(pws){
      console.log("pws:", pws)
    })
  }
  var readPws = function(cb) {
    var pws = ""
    process.stdin.resume()
    process.stdout.write("Enter Passprase")
    process.stdin.setEncoding = "utf-8"
    tty.setRawMode(true)
    process.stdin.on("keypress",function(char,key){
      char += ""
      if(key) {
	if((key.ctrl && key.name == "c") || key.name == "escape") {
	  process.stdout.write("Passprase aborted")
	  process.kill()
	} 
	else if (key.name == "enter") {
	  process.stdin.pause()
	  cb(pws)
	}
	else {
	  pws += char
	}
      }
    })
  }
  return this
}
var p = new pwm()
p.auth()
