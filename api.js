var exec = require('child_process').exec;
var cmdOpen = 'curl -H "Content-Type: application/json" -X POST -d ' + "'" +
  '{"title":"prueba","body":"Prueba", "head": "bug/GO-304", "base":"develop"}' + "'" +
  ' https://dhz30:Pwjul15@pdihub.hi.inet/api/v3/repos/dhz30/mca-go/pulls -k',
  cmdClose = 'curl -H "Content-Type: application/json" -X POST -d ' + "'" +
    '{"state":"close"}' + "'" +
    ' https://dhz30:Pwjul15@pdihub.hi.inet/api/v3/repos/dhz30/mca-go/pulls/',
  addition = ' -k',
  idPull = 144,
  i = 0;

function openClose() {
  exec(cmdOpen, function(error, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    exec(cmdClose + idPull + addition, function(error, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      idPull++;
      i++;
      if (i <= 100) {
        openClose();
      } 
    });
  });
}
openClose();


