const fs = require('fs').promises;
const minify = require('minify');

minify(
  './dist/css/react-bootstrap-form.css'
).then((data) => {
  fs.writeFile(
    './dist/css/react-bootstrap-form.min.css', data
  ).catch((error) => {
    console.error(error);
    process.exit(1);
  });

}).catch((error) => {
  console.error(error);
  process.exit(1);
});
