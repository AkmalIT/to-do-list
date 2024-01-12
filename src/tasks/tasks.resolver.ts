import { Args, Int, Mutation, Resolver, Query } from '@nestjs/graphql';
import { Task } from './entities/task-entity.gql';
import { TasksService } from './tasks.service';
import { CreateTaskInput } from './dto/create-task.dto';

@Resolver(() => Task)
export class TaskResolver {
  constructor(private readonly tasksService: TasksService) {}

  @Mutation(() => Task)
  createTask(
    @Args('createTask') createTaskInput: CreateTaskInput,
  ){
    return this.tasksService.createTask(createTaskInput);
  }

  @Mutation(() => Task)
  updateTask(
    @Args('updateTask') updateTaskInput: CreateTaskInput,
    @Args('id', { type: () => Int }) id: number,
  ) {
    return  this.tasksService.updateTask(id, updateTaskInput);
  }

  @Mutation(() => Task)
  deleteTask(@Args('id', { type: () => Int }) id: number){
    return this.tasksService.deleteTask(id);
  }

  @Query(() => [Task])
  getAllTasks() {
    return this.tasksService.getAllTasks();
  }

  @Query(() => Task)
  getTaskById(@Args('id', { type: () => Int }) id: number) {
    return this.tasksService.getTaskById(id);
  }
}
