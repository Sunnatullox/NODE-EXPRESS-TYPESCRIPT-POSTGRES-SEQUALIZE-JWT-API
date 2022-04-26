import { usersType } from '../routes/users';
import { NextFunction, Request, Response } from 'express';
import  jwt  from 'jsonwebtoken';
import db from '../models';
interface String {
    replace(input: string, output : string): any;
}

 export default (req:Request, res:Response, next:NextFunction) => {
    const{ authorization } = req.headers
        if(!authorization){
            res.status(401).json('please register first')
            res.send('/sign-up')
            return
        }

        const token = authorization.replace("Sunnatullox ", "")
        jwt.verify(token, "SunnatulloxHayitov", async(err,payload:any) =>{
            if(err){
                return res.status(401).json({error:"please register first"})
            }

            const {id} = payload;
            await db.user.findOne({ where:{ id } }).then((result:usersType) => {
                req.user = result
                return next();
            })
            
        })
}