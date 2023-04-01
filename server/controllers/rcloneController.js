const rclone = require('rclone.js');
const { resolve } = require('path');

const rcloneCopy = rclone(
  'copy',
  'aws:test-bucket-osp-e',
  'cloudflare:osp-e-example-bucket',
  {
    env: {
      RCLONE_CONFIG: resolve(__dirname, '../../rclone.conf')
    },
    progress: true
  }
);

module.exports = rcloneCopy;

// rcloneCopy.stdout.on('data', (data) => {
//   console.log(data.toString());
// });

// rcloneCopy.stderr.on('data', (data) => {
//   console.error(data.toString());
// });
