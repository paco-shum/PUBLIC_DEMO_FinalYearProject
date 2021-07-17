module.exports = ({ env }) => ({
  host: env('HOST', '******'),
  port: env.int('PORT', 0000),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', '******'),
    },
  },
});
