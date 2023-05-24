import * as yup from 'yup'
import { positiveNumberSchema, stringSchema } from './primitives'

const COLOR_HEX_PATTERN = new RegExp('^#[0-9a-fA-F]{6}$')
const ITEM_TYPE = ['rectangle', 'ellipse'] as const

export const projectItemSchema = new yup.ObjectSchema({
  id: stringSchema,
  type: stringSchema.oneOf(ITEM_TYPE),
  color: stringSchema.matches(COLOR_HEX_PATTERN),
  rotation: yup.number().required().min(0).max(360),
  x: positiveNumberSchema,
  y: positiveNumberSchema,
  width: positiveNumberSchema,
  height: positiveNumberSchema
})

export type ProjectItem = yup.InferType<typeof projectItemSchema>
