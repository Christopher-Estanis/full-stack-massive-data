import { appEnv } from './infra/environments/appEnv'
import app from './app'

app.listen(Number(appEnv.port), appEnv.ip, () => console.log(`Server running at http://${appEnv.ip}:${appEnv.port}`))