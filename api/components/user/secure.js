const auth = require('../../../auth');

module.exports = function chechOwner(action){

  function middleaware(req, res, next){

    switch(action){
      case 'update':
        let owner = req.body.id;
        auth.check.own(req, owner)
        next()
        break

      case 'follow':
        auth.check.logged(req)
        next()
        break
  
      default:
        return next()
    }

  }

  return middleaware

}