import { z } from 'zod'

export const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  DATABASE_URL: z.string(),
  KAFKA_BROKERS: z.string().default('localhost:9092'),
  KAKFA_CHALLENGE_CONSUMER: z.string().default('challenge-consumer'),
})

export type Env = z.infer<typeof envSchema>
