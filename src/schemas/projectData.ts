import * as yup from 'yup'
import { positiveNumberSchema, stringSchema } from './primitives'

export const projectDataSchema = new yup.ObjectSchema({
  id: stringSchema,
  name: stringSchema,
  modified: positiveNumberSchema
})

type ProjectData = yup.InferType<typeof projectDataSchema>

export function isProjectData(maybeProjectData: unknown): maybeProjectData is ProjectData {
  return projectDataSchema.isValidSync(maybeProjectData)
}
