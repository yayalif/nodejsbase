
var start = function (req, res) {
  var conn = { res: res, req: req }
  var cookies = {}

  if (typeof conn.req.headers.cookie !== 'undefined') {
    conn.req.headers.cookie.split(';').forEach(function(cookie) {
      var parts = cookie.split('=')
      cookies[parts[0].trim()] = (parts[1] || '').trim()
    });
  } else {
    cookies.SESSID = 0
  }

  var SESSID = cookies.SESSID
  if (typeof sessions[SESSID] !== 'undefined') {
    session = sessions[SESSID]
    if (session.expires < Date()) {
      delete sessions[SESSID]
      return newSession(conn.res)
    } else {
      var dt = new Date()
      dt.setMinutes(dt.getMinutes() + 30)

      session.expires = dt
      return sessions[SESSID]
    }
  } else {
    return newSession(conn.res)
  }
}

function newSession(res) {
  var chars='012345678ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghigklmnopqrstuvwxyz'
  var SESSID = ''
  
  for(var i = 0; i < 40; i++) {
    var rnum = Math.floor(Math.random() * chars.length)
    SESSID += chars.substring(rnum, runm+1)
  }

  if (typeof sessions[SESSID] !== 'undefined') {
    return newSession(res)
  }

  var dt = new Date()
  dt.setMinutes(dt.getMinutes() + 30)

  var sessions = {
    SESSID: SESSID,
    expires: dt
  }
  sessions[SESSID] = session
  res.setHeader('Set-Cookie', 'SESSID=' + SESSID)
  return session
}
function cleanSessions() {
  for (sess in sessions) {
    if (sess.expires < Date()) {
      delete sessions[sess.SESSID]
    }
  }
}

exports.start = start