import { execSync } from 'child_process'
import path from 'path'
import dotenv from 'dotenv'
import fs from 'fs'

dotenv.config()

const DIST_DIR = path.resolve('dist')
const REMOTE_USER = process.env.REMOTE_USER
const REMOTE_HOST = process.env.REMOTE_HOST
const REMOTE_PORT = process.env.REMOTE_PORT
const REMOTE_PATH = process.env.REMOTE_PATH
const SSH_KEY_PATH = process.env.SSH_DEPLOY_KEY

function run(command, message) {
  console.log(`\x1b[36m› ${message}...\x1b[0m`)
  execSync(command, { stdio: 'inherit' })
}

function createHtaccess() {
  console.log('\x1b[36m› Creating .htaccess file...\x1b[0m')
  const htaccessContent = `<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>`

  fs.writeFileSync(path.join(DIST_DIR, '.htaccess'), htaccessContent)
}

try {
  run('pnpm build', 'Building Vue app')
  createHtaccess()

  run(
    `ssh -i ${SSH_KEY_PATH} -p ${REMOTE_PORT} ${REMOTE_USER}@${REMOTE_HOST} "rm -rf ${REMOTE_PATH}/*"`,
    'Cleaning old files on server',
  )

  run(
    `scp -i ${SSH_KEY_PATH} -P ${REMOTE_PORT} -r ${DIST_DIR}/* ${DIST_DIR}/.htaccess ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_PATH}`,
    'Deploying to Hostinger',
  )

  console.log('\x1b[32m✔ Deployment successful!\x1b[0m')
} catch (err) {
  console.error('\x1b[31m✖ Deployment failed:\x1b[0m', err.message)
  process.exit(1)
}
