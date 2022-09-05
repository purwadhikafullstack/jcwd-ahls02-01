module.exports = {
  apps: [
    {
      name: "JCWD-AHLS02-01", // Format JCWD-{batchcode}-{groupnumber}
      script: "./projects/server/src/index.js",
      env: {
        NODE_ENV: "production",
        PORT: 8201,
      },
      time: true,
    },
  ],
};
