import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tasks } from './tasks/entities/task-entity';

const formatGraphQLError = (error: any) => {
  return {
    message:
      error.extensions?.originalError?.message ||
      error.message ||
      'Internal server error',
    code: error.extensions?.originalError?.statusCode || 500,
    error: error.extensions?.originalError?.error,
  };
};


@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
      formatError: formatGraphQLError
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "akmal02032009",
      database: "graphql",
      entities: [Tasks],
      synchronize: true
    }),
    TasksModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
