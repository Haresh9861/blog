import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono';
import { verify } from 'hono/jwt'
import { Blogschema, UpdateBlogschema } from '../zod';



export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string,
    }
    Variables: {
        userId: any
    }
}>();

//middleware
blogRouter.use('/*', async (c, next) => {

    const header = c.req.header("Authorization") || "";
    const reponse = await verify(header, c.env.JWT_SECRET);
    if (reponse) {
        c.set("userId", reponse.id);
        await next();
    } else {
        c.status(403)
        return c.json({
            error: "unauthorized"
        })
    }
})


blogRouter.post('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    const body = await c.req.json();
    const { success } = Blogschema.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            message: "Inputs are not correct"
        })
    }
    const userId = c.get("userId")

    const blog = await prisma.blog.create({

        data: {
            title: body.title,
            content: body.content,
            authorId: userId
        }
    })
    console.log(c)
    return c.json({
        id: blog.id
    })
})



blogRouter.put('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    const body = await c.req.json();
    const { success } = UpdateBlogschema.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            message: "Inputs are not correct"
        })
    }
    const userId = c.get("userId")
    const blog = await prisma.blog.update({
        where: {
            id: body.id
        },
        data: {
            title: body.title,
            content: body.content,

        }
    })

    return c.json({
        id: blog.id
    })
})

blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    const blogs = await prisma.blog.findMany({
        select:{
            content:true,
            title:true,
            id:true,
            author:{
                select:{
                    name:true
                }
            }
        }
    });
    return c.json({
        blogs
    })
})

blogRouter.get('/:id', async (c) => {
    const id = c.req.param("id")
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    
    try {
        const blog = await prisma.blog.findFirst({
            where: {
                id: id
            },
        select :{
            id:true,
            title:true,
            content:true,
            author:{
                select:{
                    name:true
                }
            }
        }
        })

        return c.json({
            blog
        })
    }
    catch (e) {
        c.status(411);
        return c.json({
            message: "Error while fetching the blog post"
        })
    }
})


