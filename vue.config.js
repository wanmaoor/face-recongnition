module.exports = {
  devServer: {
    proxy: {
      "/biometricProxy": {
        target: "http://120.42.37.86:10001/biometricProxy",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/biometricProxy": "",
        },
      },
    },
  },
};
