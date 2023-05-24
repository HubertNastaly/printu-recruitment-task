import * as yup from 'yup'
import { positiveNumberSchema, stringSchema } from './primitives'
import { ProjectItem, projectItemSchema } from './projectItem'

export const projectSchema = new yup.ObjectSchema({
  id: stringSchema,
  name: stringSchema,
  width: positiveNumberSchema,
  height: positiveNumberSchema,
  items: yup.array(projectItemSchema).required().test('unique-ids', 'Items do not have unique IDs', hasUniqueIds)
})

function hasUniqueIds(items: ProjectItem[]) {
  const ids = items.map(({ id }) => id)
  const uniqueIds = ids.filter((id, index) => ids.indexOf(id) === index)
  return ids.length === uniqueIds.length
}

export type Project = yup.InferType<typeof projectSchema>
