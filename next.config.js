module.exports = {
    async rewrites() {
      return [
        {
          source: '/login',
          destination: '/aa',
        },
        {
            source: '/register',
            destination: '/',
        },
        {
            source: '/create-apartment',
            destination: '/',
        },
      ]
    },
  }