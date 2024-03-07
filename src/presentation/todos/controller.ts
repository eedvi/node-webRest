
import { Request, Response } from 'express';
import { prisma } from '../../data/postgres';
import { CreateTodoDto, UpdateTodoDto } from '../../domain/dtos/todos';




export class TodoController {

    //* Dependency Injection 
    constructor() { }



    public getTodods = async (req: Request, res: Response) => {
        const todos = await prisma.todo.findMany();
        return res.json(todos);
    }






    public getTodoById = async (req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(id)) return res.status(400).json({ error: 'Invalid id' });

        const todo = await prisma.todo.findFirst({
            where: { id: id }
        });


        (todo)
            ? res.json(todo)
            : res.status(404).json({ error: `Todo not found with id: ${id}` });
    }


    public createTodo = async (req: Request, res: Response) => {
        const [error, createTodoDto] = CreateTodoDto.create(req.body);

        if (error) return res.status(400).json({ error: 'Missing text' });

        const todo = await prisma.todo.create({
            data: createTodoDto!
        });

        res.json(todo);
    };






    public updateTodo = async (req: Request, res: Response) => {

        const id = +req.params.id;
        const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id });
        if (error) return res.status(400).json({ error });

        const todo = await prisma.todo.findFirst({
            where: { id: id },
        });

        if (!todo) return res.status(404).json({ error: `todo with id: ${id} not found` });



        const updatedTodo = await prisma.todo.update({
            where: { id: id },
            data: updateTodoDto!.values,
        });

        res.json(updatedTodo);
    }








    public deleteTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(id)) return res.status(400).json({ error: 'Invalid id' });

        const todo = await prisma.todo.findFirst({
            where: { id: id }
        })
        if (!todo) return res.status(404).json({ error: `todo with id: ${id} not found` });

        const deletedTodo = await prisma.todo.delete({
            where: { id: id }  //* where: { id: id }  ->  where: { id: +req.params.id }  ->  where: { id: Number(req.params.id) }  ->  where: { id: parseInt(req.params.id
        });

        (deletedTodo)
            ? res.json(deletedTodo)
            : res.status(404).json({ error: `Todo not found with id: ${id}` });



    }
}