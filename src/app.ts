import { appRoutes } from '@/../src/http/routes'
import fastify from 'fastify'

export const app = fastify()

app.register(appRoutes)
