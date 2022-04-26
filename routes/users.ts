import { Request, Response, Router } from "express";
import db from "../models";
import login from "../middleware/login";
const router = Router();

export type usersType = {
  id: String;
  name: String;
  email: String;
  password: String;
  createdAt: String;
  updatedAt: String;
  /*   Projects: {
        id:number;
        title:string;
        status:string;
        updatedAt:string;
        ProjectAssignments:{
            createdAt:String;
            updatedAt:String;
            ProjectId:Number;
            userId:String;
        }
    }; */
};

// admin get all user option

router.get("/admin/users",login,async (req: Request, res: Response) => {
  try {
    const userAll = await  db.user.findAll({
      include:{
          model:db.Project
      }
  });
    return userAll.length > 0
      ? res.status(200).json(userAll)
      : res.status(400).json({ error: "Users not found" });
  } catch (error) {
    console.log(error);
  }
});
//get all users 
router.get("/users",login, async (req: Request, res: Response) => {
  try {
    const userAll = await  db.user.findAll();
    return userAll.length > 0
      ? res.status(200).json(userAll)
      : res.status(400).json({ error: "Users not found" });
  } catch (error) {
    console.log(error);
  }
});
// get one user option
router.get("/admin/user/:id",login, async (req: Request, res: Response) => {
  const {id} = req.params;
  try {
    const user = await db.user.findOne({
      where: {
        id
      },
    });
    user && res.status(200).json(user);
    return 
} catch (error) {
    console.log(error);
    return res.status(500).json({ error: `User not found` })
  }
});

//created users

router.post("/admin/createUser",login, async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(500).json("input data is incomplete");
    }
    await db.user
      .create({
        name,
        email,
        password,
      })
      .then((result: usersType[]) => res.status(200).json(result));
  } catch (error) {
    console.log(error);
  }
});

//update user 

router.put('/admin/updateUser/:id',login,async(req:Request, res:Response) => {
    const {id} = req.params;
    try {
        const updateUser = await db.user.update(req.body,{where: { id }});

        updateUser && res.status(200).json({msg:'Updadet user info'})
       return
    } catch (error) {
        console.log(error);
        res.status(500).json({error:`No such user was found or the data was not entered correctly`})
        return
    }
})


//deleted one user
router.delete("/admin/deleteUser/:id",login, async(req: Request, res: Response) => {
  const {id} = req.params  
    try {
        const deleted = await db.user.destroy({where:{ id }})

        return deleted && res.status(200).json({msg:'Deleted User'})
  } catch (error) {
    console.log(error);
    return res.status(500).json({error:'User not deleted'})
  }
});

export default router;
