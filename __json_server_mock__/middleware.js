module.exports = (req, res, next) => {
  if (req.method === 'POST' && res.path === '/login') {
    if (req.body.name === 'leon' && req.body.password === '123456') {
      res.status(200).json({
        user: {
          token: '123',
        },
      });
    }
  } else {
    return res.status(400).json({ massage: 'Wrong username or password' });
  }
  next();
};
