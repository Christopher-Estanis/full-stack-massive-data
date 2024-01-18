import app from './app'
import { appEnv } from './infra/environments/appEnv'

app.listen(Number(appEnv.port), appEnv.ip, () => { console.log(`Server running at http://${appEnv.ip}:${appEnv.port}`) })
