import express from "express"
import { prisma } from "./lib/prisma.js"

const app = express()

app.get("/", (req, res) => {
    res.send("Savora backend is running")
})

const PORT = 3000

async function smokeTest() {
    const count = await prisma.restaurant.count()
    console.log(`✅ DB connected — ${count} restaurants`)
}

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
    smokeTest().catch(err => {
        console.error("❌ DB connection failed:", err)
    })
})