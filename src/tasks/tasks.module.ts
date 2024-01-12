import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import {TypeOrmModule} from "@nestjs/typeorm"
import { Tasks } from './entities/task-entity';
import { TaskResolver } from './tasks.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Tasks])],
  providers: [TasksService, TaskResolver],
})
export class TasksModule {}
