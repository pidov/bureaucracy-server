const passport = require('passport')
const LdapStrategy = require('passport-ldapauth')
const router = require('express').Router()
const { User } = require('./auth/User')
const { ldap, bearer } = require('./auth')

module.exports = config => {
  passport.use(new LdapStrategy(config.ldap, User.upsertLdapUser.bind(User)))

  router.use(passport.initialize())
  router.use('/authorize', ldap(passport))
  router.use(/^\/(?!authorize).*/, bearer(passport))

  return router
}
