module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:8000',
        changeOrigin: true
      },
      '^/uploads': {
        target: 'http://localhost:8000',
        changeOrigin: true
      },
      '^/ws': {
        target: 'ws://localhost:8000',
        ws: true,
      },
    }
  }
};
