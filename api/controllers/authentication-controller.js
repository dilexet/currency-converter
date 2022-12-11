import bcrypt from 'bcrypt'
import { validationResult } from 'express-validator'
import UserModel from '../models/user.js'
import tokenGeneration from '../utils/token-generation.js'

export const register = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array())
    }

    if (await UserModel.findOne({ email: req.body.email })) {
      return res.status(400).json({
        error: 'User with this email already exist',
      })
    }

    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(req.body.password, salt)

    const userDoc = new UserModel({
      name: req.body.name,
      email: req.body.email,
      passwordHash,
    })

    await userDoc.save()

    const token = tokenGeneration(userDoc)
    if (token === null) {
      return res.status(500).json({
        message: 'Json error',
      })
    }
    return res.json({
      token,
    })
  } catch (err) {
    console.error(err)
    return res.status(500).json({
      message: 'Registration error',
    })
  }
}

export const login = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array())
    }
    const user = await UserModel.findOne({ email: req.body.email })
    if (!user) {
      return res.status(400).json({
        error: 'User is not found',
      })
    }
    const isValidPassword = await bcrypt.compare(req.body.password, user._doc.passwordHash)
    if (!isValidPassword) {
      return res.status(400).json({
        error: 'Login or Password is incorrect',
      })
    }
    const token = tokenGeneration(user)
    if (token === null) {
      return res.status(500).json({
        message: 'Json error',
      })
    }
    return res.json({
      token,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({
      message: 'Login error',
    })
  }
}

export const profile = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId)
    if (!user) {
      return res.status(400).json({
        error: 'User is not found',
      })
    }

    const { passwordHash, ...userData } = user._doc
    return res.json({
      user: userData,
    })
  } catch (err) {
    console.error(err)
    return res.status(500).json({
      message: 'Get profile info error',
    })
  }
}
