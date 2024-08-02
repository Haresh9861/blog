import { z } from 'zod'

export const Signupschema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string().optional()
})

export const Signinschema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string().optional()
})

export const Blogschema = z.object({
    title: z.string(),
    content: z.string()
})

export const UpdateBlogschema = z.object({
    title: z.string(),
    content: z.string(),
    id: z.string()
})

export type Signupschema = z.infer<typeof Signupschema>
export type Signinschema = z.infer<typeof Signinschema>
export type Blogschema = z.infer<typeof Blogschema>
export type UpdateBlogschema = z.infer<typeof UpdateBlogschema>