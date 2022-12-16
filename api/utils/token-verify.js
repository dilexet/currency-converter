import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../constants/token.constants.js'

const tokenVerify = (req, res, next) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')
  if (token) {
    try {
      const decoded = jwt.verify(token, TOKEN_SECRET)
      req.userId = decoded._id
      next()
    } catch (err) {
      return res.status(403).json({
        error: 'No access',
      })
    }
  } else {
    return res.status(403).json({
      error: 'No access',
    })
  }
}

export default tokenVerify
