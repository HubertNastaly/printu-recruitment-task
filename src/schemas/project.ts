import * as yup from 'yup'
import { positiveNumberSchema, stringSchema } from './primitives'
import { shapeSchema } from './shape'

export const projectSchema = new yup.ObjectSchema({
  id: stringSchema,
  name: stringSchema,
  width: positiveNumberSchema,
  height: positiveNumberSchema,
  items: yup.array(shapeSchema).required()
})

export type Project = yup.InferType<typeof projectSchema>
