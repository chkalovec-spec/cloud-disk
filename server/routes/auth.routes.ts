import Router from 'express'
import User from '../models/User'
import bcrypt from 'bcrypt'
import { check, validationResult } from 'express-validator'
const router = Router()

router.post(
  '/registration',
  [
    check('email', 'Uncorrect Email').isEmail(),
    check('password', 'More than 3 and shorter than 12').isLength({ min: 3, max: 12 }),
  ],
  async (req: any, res: any) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.json({ message: 'Uncorrect request', errors })
    }
    try {
      console.log(req.body)
      const { email, password } = req.body

      const candidate = await User.findOne({ email })
      if (candidate) {
        return res.status(400).json({ message: 'User with this e-mail is already exist' })
      }
      const hashPassword = await bcrypt.hash(password, 15)
      const user = new User({ email, password: hashPassword })
      await user.save()

      return res.json({ message: 'User was created' })
    } catch (error) {
      console.log(error)
      res.send({ message: 'Server error' })
    }
  }
)

export default router
