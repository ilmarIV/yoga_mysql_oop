function isAdmin(req, res, next) {
  if (!req.session.user) {
    return res.redirect('/login');
  }

  if (req.session.user.role !== 'admin') {
    return res.render('index', {
      articles: [],
      msg: 'Access denied. Admins only.'
    });
  }

  next();
}

module.exports = isAdmin;