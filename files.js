var glob = require("glob")
var fs = require('fs')
var fil;
var finalobjs
// options is optional
glob("**/*.md", function (er, files) {
  // files is an array of filenames.
  // If the `nonull` option is set, and nothing
  // was found, then files is ["**/*.js"]
  // er is an error object or null.

 //console.log(files);
  for(var i=0;i<files.length;i++)
  {
      worker(i);
      console.log(i);
  }
  function worker(i)
  {

      fs.readFile(files[i],'utf8', function (err,data) {
       if (err)
       {
         return console.log(err);
       }
       var pref='### `';
       //var mname=files[i].substr(0,(files[i].length)-3);
       var ac_name=data.match(/^.*$/m)[0]; // to match the first line of the file opened.
       ac_name=ac_name.substr(2,ac_name.length);
       console.log(ac_name);
       pref=pref+ac_name;
       var reg=new RegExp(pref+"[^`;]*`","ig") // to ignore the case and also allow matching more than one character.
       var res=data.match(reg);
       if(res!= null)
       {
          //console.log(res);
          for(var j=0;j<res.length;j++)
          {
            res[j]=trimdown(res[j])
          }
          function trimdown(result)
          {
            return (result.substr(5,result.length-1));
          }
          console.log(res);
       }

       return res;

    });
}
})
