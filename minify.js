const fs = require('fs');
const minify = require('minify');

minify(
  './dist/css/react-bootstrap-form.css'

).then((data) => {
  fs.writeFileSync('./dist/css/react-bootstrap-form.min.css', data);

}).catch((error) => {
  console.error(error);
  process.exit(1);

});
