import { z } from 'zod'

// Create password schema with translation function
export const createPasswordSchema = (t) => z
    .string()
    .min(8, t('validation.min_length', { min: 8 }))
    .regex(/[a-z]/, t('validation.password_requirements'))
    .regex(/[A-Z]/, t('validation.password_requirements'))
    .regex(/\d/, t('validation.password_requirements'))
    .regex(/[^a-zA-Z0-9]/, t('validation.password_requirements'))

// Default password schema (for backwards compatibility)
export const passwordSchema = z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/\d/, 'Password must contain at least one digit')
    .regex(/[^a-zA-Z0-9]/, 'Password must contain at least one special character')

export const validatePassword = (password, t) => {
    const schema = t ? createPasswordSchema(t) : passwordSchema
    const result = schema.safeParse(password)
    if (!result.success) {
        return result.error.errors.map((err) => err.message)
    }
    return []
}
