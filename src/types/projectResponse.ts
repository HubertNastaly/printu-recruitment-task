import * as yup from 'yup'
import { stringSchema } from './primitives'
import { projectSchema } from './project'

export const projectResponseSchema = new yup.ObjectSchema({
  id: stringSchema,
  project: projectSchema
})

type ProjectResponse = yup.InferType<typeof projectResponseSchema>

export function isProjectResponse(maybeProjectResponse: unknown): maybeProjectResponse is ProjectResponse {
  return projectResponseSchema.isValidSync(maybeProjectResponse)
}
