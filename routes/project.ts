import { Router, Request, Response } from "express";
import db from "../models";
import login from "../middleware/login";
const router = Router();

interface Project {
  id: number;
  title: String;
  status: String;
  url: string;
  updatedAt: String;
  createdAt: String;
}

router.get("/projects", login, async (req: Request, res: Response) => {
  try {
    const project = await db.Project.findAll();

    project.length > 0
      ? res.status(200).json(project)
      : res.status(422).json({ msg: "Projects not found" });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Project not found" });
    return;
  }
});


router.get("/", async (req: Request, res: Response) => {
  try {
    const project = await db.Project.findAll();

    project.length > 0
      ? res.status(200).json(project)
      : res.status(422).json({ msg: "Projects not found" });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Project not found" });
    return;
  }
});

router.get("/project/:id", login, async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const project = await db.Project.findOne({ where: { id } });

    if(project){
      res.status(200).json(project)
      return
    }else{
      res.status(404).json({ msg: "not found project" });
      return
    }
  } catch (error) {
    console.log(error);
    res.status(422).json({ error: "Project not found" });
    return;
  }
});



router.post("/project", login, async (req: Request, res: Response) => {
  const { title, status, url, userId } = req.body;
  try {
    if (!userId) {
      res
        .status(400)
        .json({
          error: "userId ni ham body da qo'shib yuboring! userId topilmadi",
        });
      return;
    }

    if (!title || !status) {
      res.status(422).json({ error: "Please fill in all of the inputs" });
      return;
    }
    await db.Project.create({ title: title, status: status, url: url })
      .then(async (result: Project) => {
        try {
            const id = req.user?.id
          const Assignment = await db.ProjectAssignment.create({
            ProjectId: result.id,
            userId: userId || id,
          });
          return res.status(200).json({ Assignment, result });
        } catch (error) {
          console.log(error);
          res
            .status(500)
            .json({
              error:
                "The project assignment is not written, please note that it is being sent to the userId backend",
            });
            return
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Project has not changed" });
    return;
  }
});

router.put("/project/:id", login, async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, status } = req.body;
  try {
    if (!title || !status) {
      res.status(422).json({ error: "Please fill in all of the inputs" });
      return;
    }
    const upProject = await db.Project.update(req.body, { where: { id } });
    return res.status(200).json(upProject);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Project has not changed" });
    return;
  }
});

router.delete("/project/:id", login, async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const delProject = await db.Project.destroy({ where: { id } });
    return res.status(200).json(delProject);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Project not deleted" });
  }
});

export default router;
