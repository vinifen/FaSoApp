import { getPostFieldSchemas } from "shared/schemas/postFieldSchemas"
import { z } from "zod"
const { imageSchema } = getPostFieldSchemas()
export type NewImageType = z.infer<typeof imageSchema>