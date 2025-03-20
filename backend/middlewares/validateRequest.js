import { ZodError } from 'zod'

const validateRequest = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body)
    next()
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid request data',
        errors: error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }))
      })
    }
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error during validation'
    })
  }
}

export default validateRequest