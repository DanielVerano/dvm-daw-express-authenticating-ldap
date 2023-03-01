var express = require('express');
var LdapAuth = require('ldapauth-fork');
const { use } = require('.');
var router = express.Router();

var ldap = new LdapAuth({
  url: 'ldap://localhost:389',
  bindDN: 'cn=admin,dc=iesalixar,dc=org',
  bindCredentials: 'passiesalixar',
  searchBase: 'ou=alumnos,dc=iesalixar,dc=org',
  searchFilter: '(uid={{username}})',
  reconnect: true,
});

router.post('/auth', (req, res, next) => {
  const { username, password } = req.body;

  ldap.authenticate(username, password, function (err, user) {
    if (err) {
      return res.redirect('/login');
    }
    // console.log(user);
    res.send(`Username: ${user.uid} DN: ${user.dn}`);
  });
});

/* GET login page. */
router.get('/', function (req, res, next) {
  res.render('login', { title: 'Express' });
});

module.exports = router;
