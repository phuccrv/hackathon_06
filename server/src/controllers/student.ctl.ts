import { Request, Response } from "express";
import studentMd, {GetMany} from "../models/student.md";
import {Student} from '../types/student';

export default {
    getMany: (req: Request, res: Response) => {
        try {
            let result:GetMany = studentMd.getMany();
            return res.status(200).json(
                result
            )
        }catch {
            return res.status(500).json(
                {
                    message: "Failed!"
                }
            )
        }
    },
    getById: (req: Request, res: Response) => {
        try {
            let result:GetMany = studentMd.getById(Number(req.params.studentId));
            return res.status(200).json(
                result
            )
        }catch {
            return res.status(500).json(
                {
                    message: "Failed!"
                }
            )
        }
    },
    create: (req: Request, res: Response) => {
        req.body.id = Date.now();
        req.body.avatar = "student-images/" + req.file?.filename;
        try {
            let result:GetMany = studentMd.create(req.body as Student);
            return res.status(200).redirect('/views')
        }catch {
            return res.status(500).json(
                {
                    message: "Failed!"
                }
            )
        }
    },
    delete: (req: Request, res: Response) => {
        try {
          const studentId = Number(req.params.studentId);
          const result = studentMd.delete(studentId);
    
          if (result) {
            return res.status(200).json(result);
          } else {
            return res.status(500).json({
              message: "Failed! Student not found or error while deleting.",
            });
          }
        } catch (error) {
          return res.status(500).json({
            message: "Failed! An error occurred while deleting student.",
          });
        }
      },
    update: (req: Request, res: Response) => {
        try {
            let result:GetMany = studentMd.update(Number(req.params.studentId), req.body);
            return res.status(200).redirect('/views')
        }catch {
            return res.status(500).json(
                {
                    message: "Failed!"
                }
            )
        }
    },

}
