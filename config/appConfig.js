let appConfig = {
  allowedCorsOrigin: "*",
  development: {
    "url": "mongodb://localhost:27017/syook",
    "port": "5000",
    "socket_port": "8080"
  }
};

module.exports = {
  allowedCorsOrigin: appConfig.allowedCorsOrigin,
  development: appConfig.development
};