import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../constants/token.constants.js'

const tokenGeneration = (user) => {
  if (user && user._id) {
    const token = jwt.sign(
      {
        _id: user._id,
      },
      TOKEN_SECRET,
      {
        expiresIn: '30d',
      },
    )
    return token ?? null
  }
  return null
}

export default tokenGeneration
