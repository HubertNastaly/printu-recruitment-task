import * as yup from 'yup'

export const stringSchema = yup.string().required()
export const positiveNumberSchema = yup.number().required().positive()
