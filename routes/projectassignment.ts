import db  from '../models';
import { Request, Response, Router } from 'express';
import login from '../middleware/login';
const router= Router();


router.get('/admin/assignment', login, async(req:Request, res:Response) => {
    try {
        const assign = await db.ProjectAssignment.findAll();
    
        res.status(200).json(assign)
        return
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Error"})
    }
})

router.put('/admin/assignment/:id', login, async(req:Request, res:Response) => {
   try {
       const{ id }= req.params;
       const { userId, ProjectId }= req.body;
       const result=  await db.ProjectAssignment.update({userId, ProjectId}, {where:{ ProjectId:id }})
    
       return res.status(200).json(result);
   } catch (error) {
    console.log(error);
    res.status(500).json({error:"Project Assignt not update"})
    return
   }
})

router.delete('/admin/assignment/:id', login, async(req:Request, res:Response) =>{
        try {
            const { id }= req.params;
            const result = await db.ProjectAssignment.destroy({ where:{ ProjectId:id }})

            return res.status(200).json(result);
        } catch (error) {
            console.log(error);
            res.status(500).json({error:"Project not deleted"});
            return
        }

})

export default router