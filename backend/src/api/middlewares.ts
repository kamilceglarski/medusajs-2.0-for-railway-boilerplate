import type { MiddlewaresConfig } from "@medusajs/framework/http"
import express from "express"
import path from "path"
import fs from "fs"

// Upewnij się że folder static istnieje
const staticDir = path.join(process.cwd(), "static")
if (!fs.existsSync(staticDir)) {
    fs.mkdirSync(staticDir, { recursive: true })
}

export const config: MiddlewaresConfig = {
    routes: [
        {
            matcher: "/static/*",
            middlewares: [
                express.static(staticDir, {
                    maxAge: "1y",
                    etag: true,
                }),
            ],
        },
    ],
}

