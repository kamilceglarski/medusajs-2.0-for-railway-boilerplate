/**
 * PM2 ecosystem file for running backend and storefront as persistent daemons.
 *
 * Usage:
 *   # start processes defined here
 *   pm2 start ecosystem.config.js
 *
 *   # save current process list so it is resurrected on reboot
 *   pm2 save
 *
 *   # generate and configure startup script for your platform (run the printed command)
 *   pm2 startup
 */

module.exports = {
    apps: [
        {
            name: "medusa-backend",
            // Run via npm to ensure init-backend helper and build artifacts are respected
            cwd: "./backend",
            script: "npm",
            args: "run start",
            env: {
                NODE_ENV: "production",
            },
            // restart on crash
            restart_delay: 2000,
            autorestart: true,
            max_restarts: 10,
            // logs
            out_file: "./backend/.pm2/out.log",
            error_file: "./backend/.pm2/err.log",
        },
        {
            name: "next-frontend",
            cwd: "./storefront",
            script: "npm",
            args: "run start",
            env: {
                NODE_ENV: "production",
            },
            restart_delay: 2000,
            autorestart: true,
            max_restarts: 10,
            out_file: "./storefront/.pm2/out.log",
            error_file: "./storefront/.pm2/err.log",
        },
        {
            name: "reindex-products",
            cwd: "./backend",
            // Run npx medusa exec once; do not autorestart so this behaves like a one-shot job
            script: "npx",
            args: "medusa exec ./src/scripts/reindex-products.ts",
            env: {
                NODE_ENV: "production",
            },
            autorestart: false,
            watch: false,
            max_restarts: 0,
            out_file: "./backend/.pm2/reindex-out.log",
            error_file: "./backend/.pm2/reindex-err.log",
        },
    ],
}
