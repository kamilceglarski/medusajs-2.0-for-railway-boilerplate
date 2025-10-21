import type {
    MiddlewaresConfig
} from "@medusajs/framework/http"
import express from "express"
import path from "path"

export const config: MiddlewaresConfig = {
    routes: [
        {
            matcher: "/static/*",
            middlewares: [
                express.static(path.join(process.cwd(), "static"), {
                    maxAge: "1y",
                    etag: true,
                }),
            ],
        },
    ],
}

