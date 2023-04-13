import express, { Express, Request, Response } from 'express';
import { getAutoTeam } from './controllers/autoteam';
import { getPlayers, getPlayersByName } from './controllers/players';

const port: number = 3200
const app: Express = express()
var cors = require('cors')
app.use(cors())

app.get('/', (req: Request, res: Response) => {
  res.send('🚀 express/typescript is up and running')
})

app.get('/players/:page', async (req: Request, res: Response) => {
  const page = Number(req.params.page)
  try {
    const players: IPlayer[] = await getPlayers(page)
    if (!players.length) {
      res.status(404).send('We don\'t have any cool player around this time')
    }
    res.json(players)
  } catch(err) {
    console.error(err)
  }
})

app.get('/players/:searchterm/:page', async (req: Request, res: Response) => {
  const searchTerm = String(req.params.searchterm)
  const page = Number(req.params.page)
  try {
    const players: IPlayer[] = await getPlayersByName(searchTerm, page)
    res.json(players)
  } catch(err) {
    console.error(err)
  }
})

app.get('/team-builder/:points/:exact', async (req: Request, res: Response) => {
  const points = Number(req.params.points)
  const exact: boolean = (req.params.exact === 'exact') ? true : false
  try {
    const team: IPlayerStats[] = await getAutoTeam(points, exact)
    if (!team) {
      res.status(404).send('Not enough data to build the perfect team at this moment')
    }
    res.json(team)
  } catch(err) {
    console.error(err)
  }  
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})