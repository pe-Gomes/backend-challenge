import { envSchema } from '@/infra/env'
import { PrismaClient } from '@prisma/client'
import { execSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'

const env = envSchema.parse(process.env)
const db = new PrismaClient()

const schemaId = randomUUID()

function generateUniqueDatabaseURL(schemaId: string) {
  if (!env.DATABASE_URL) {
    console.error('Failed to load environment variables')
    process.exit(1)
  }

  const url = new URL(env.DATABASE_URL)

  url.searchParams.set('schema', schemaId)

  return url.toString()
}

beforeAll(async () => {
  const dbURL = generateUniqueDatabaseURL(schemaId)

  process.env.DATABASE_URL = dbURL

  execSync('pnpm prisma migrate deploy')
})

afterAll(async () => {
  await db.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`)
  await db.$disconnect()
})
