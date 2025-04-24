import { execSync } from 'child_process'
import path from 'path'
import dotenv from 'dotenv'

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

try {
  run('pnpm build', 'Building Vue app')
  run(
    `scp -i ${SSH_KEY_PATH} -P ${REMOTE_PORT} -r ${DIST_DIR}/* ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_PATH}`,
    'Deploying to Hostinger',
  )
  console.log('\x1b[32m✔ Deployment successful!\x1b[0m')
} catch (err) {
  console.error('\x1b[31m✖ Deployment failed:\x1b[0m', err.message)
  process.exit(1)
}
