import { z } from 'zod'

export const genresArray = ['Male', 'Female', 'Other'] as const
export const genres = z.enum(genresArray)
export type Genre = z.infer<typeof genres>