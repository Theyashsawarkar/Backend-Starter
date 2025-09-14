import redis from "redis"
import { config } from "dotenv"
import { toBool } from "../utils/commonFunctions.js"
import { REDIS } from "./constants.js"

config() // load environment variables

let client = null // singleton Redis client
let ready = false // tracks if Redis is ready

// initialize Redis client if enabled
if (toBool(process.env.REDIS_ENABLED)) {
  client = redis.createClient({
    socket: {
      host: REDIS.HOST,
      port: REDIS.PORT,
      reconnectStrategy: (retries) => {
        if (retries > REDIS.RETRIES) {
          console.error("❌ Redis reconnect failed after max retries")
          return new Error("Redis reconnect failed")
        }
        const delay = Math.min(retries * 100, Number(REDIS.RETRY_DELAY))
        console.warn(`⚠️ Redis reconnect attempt #${retries}, waiting ${delay}ms`)
        return delay
      },
    },
    password: REDIS.PASSWORD,
  })

  // log connecting
  client.on("connect", () => console.log("🔌 Redis connecting..."))

  // log ready state
  client.on("ready", () => {
    ready = true
    console.log("✅ Redis ready to use")
  })

  // log errors and mark not ready
  client.on("error", (err) => {
    ready = false
    console.error("❌ Redis error:", err)
  })

  // log disconnect
  client.on("end", () => {
    ready = false
    console.warn("⚠️ Redis connection closed")
  })

  // graceful shutdown handler
  const shutdown = async () => {
    if (ready) {
      await client.quit()
      console.log("👋 Redis client disconnected")
    }
    process.exit(0)
  }

  process.on("SIGINT", shutdown)
  process.on("SIGTERM", shutdown)
}

// get singleton Redis client
export async function getRedisClient() {
  if (!toBool(process.env.REDIS_ENABLED)) {
    console.warn("⚠️ Redis is disabled via environment variable")
    return null
  }

  if (!ready) {
    try {
      await client.connect()
      ready = true
      console.log("🚀 Connected to Redis")
    } catch (err) {
      console.error("❌ Failed to connect to Redis:", err)
      ready = false
      return null
    }
  }

  return client
}

// check if Redis is ready for use
export function isRedisReady() {
  return ready && client && client.isOpen
}
