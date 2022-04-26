import { usersType } from "./users";
import { Router, Response, Request } from "express";
import db from "../models";
import jwt from "jsonwebtoken";
import bcript from "bcryptjs";
import  JWT_SECRET  from "../config/key";
const router = Router();



router.post("/sign-up", async (req: Request, res: Response) => {
  const { name, email, password, avatar } = req.body;

  if (!name || !email || !password) {
    res.status(422).json({ error: "All entries must be completed" });
  }

  await db.user
    .findOne({
      where: { email },
    })
    .then((result: usersType) => {
      if (result) {
        res.status(422).json({ error: "Such an email address is registered" });
        return;
      }

      bcript.hash(password, 10).then(async (hashedPass) => {
        try {
          const saveUser = await db.user.create({
            name,
            email,
            password: hashedPass,
            avatar
          });
          
             saveUser && res.status(200).json({ msg: "You are registered" })
            return
          
        } catch (error) {
          console.log(error);
          res
            .status(500)
            .json({
              error: "You could not register and Please try again later",
            });
          return;
        }
      });
    });
});

router.post('/sign-in', async(req:Request, res:Response) => {
    const {email, password}= req.body;

    if(!email || !password){
        return res.status(422).json({error:"Enter your email and password"})
       }

       await db.user.findOne({where:{ email }})
       .then((userResult:usersType| any) => {
            if(!userResult){
                return res.status(422).json({error: "Your email address or password is incorrect"})
            }
            bcript.compare(password,(userResult.password))
            .then((resultHash) => {
                if(resultHash){
                    // res.json({msg:"saccesfully signed in"})

                    const token = jwt.sign({id:userResult.id},'SunnatulloxHayitov')
                    const {name,email, id} = userResult;

                    res.json({token, user:{id, name, email}})
                }else{
                    return res.status(422).json({error : "Your email address or password is incorrect"})
                  }
            })
       })
})


export default router;
