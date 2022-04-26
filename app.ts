
import express, { Request, Response, Application } from 'express'
import cors from 'cors'
const app: Application = express()
import db from './models';
import users  from './routes/users'
import author from './routes/author'
import project from './routes/project'
import projectassignment from './routes/projectassignment'


app.use(cors())
app.use(express.json())
app.use(users)
app.use(author)
app.use(project)
app.use(projectassignment)


const PORT = process.env.PORT || 5000


db.sequelize.sync().then(() => {    
   app.listen(PORT, () => {
       console.log("SERVER  LISTEN PORT " + PORT);
   })
});
