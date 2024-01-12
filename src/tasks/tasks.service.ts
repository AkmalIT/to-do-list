import { Injectable, HttpException, HttpStatus} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm"
import { Tasks } from './entities/task-entity';
import {Repository} from "typeorm"
import { CreateTaskInput } from './dto/create-task.dto';


@Injectable()
export class TasksService {
    constructor(@InjectRepository(Tasks) private taskModel: Repository<Tasks>){}

    async createTask(createTask: CreateTaskInput){
        return await this.taskModel.save(createTask)
    }

    async updateTask(id: number, updateTask: CreateTaskInput){
        const task =   await this.getTaskById(id)
        task.title = updateTask.title
        task.description = updateTask.description
        task.compleated = updateTask.compleated
        return await this.taskModel.save(task)
    }

    async deleteTask(id: number){
        const task = await this.getTaskById(id)
        return await this.taskModel.remove(task)
    }

    async getAllTasks(){
        return await this.taskModel.find()
    }

    async getTaskById(id: number){
        const task = await this.taskModel.findOne({where: {id: id}});
        if (!task) {
          throw new HttpException(`Task with ID ${id} not found`, HttpStatus.NOT_FOUND);
        }
        return task;
    }
}
