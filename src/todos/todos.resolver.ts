import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { TodoModel } from "./models/todo.model";
import { PrismaService } from "src/prisma.service";
import { SortTodoArgs } from "./dtos/sort-todo.args";

@Resolver(() => TodoModel)
export class TodoResolver {
    constructor(private prisma: PrismaService) {}

    // 一覧を取得
    @Query(() => [TodoModel])
    async getTodoList() {
        return this.prisma.todo.findMany({
            orderBy: {
                order: 'asc'
            }
        });
    }

    // 特定のレコードの取得
    @Query(() => TodoModel)
    async getTodo(
        @Args('id') id: number,
    ) {
        return this.prisma.todo.findUnique({ where: { id } });
    }

    // 部分一致するレコードの取得
    @Mutation(() => [TodoModel])
    async getFilteredTodo(
        @Args('content') content: string,
    ) {
        return this.prisma.todo.findMany({
            where: {
                content: {
                    contains: content,
                },
            },
        });
    }

    // 指定した並びでレコードの取得
    @Query(() => [TodoModel])
    async sortTodo(
         @Args() args: SortTodoArgs) {
       const queries = args.ids.map((id, index) => {
        return this.prisma.todo.update({
            where: {
                id,
            },
            data: {
                order: index,
            }
          })
       })

       await Promise.all(queries);

       return this.prisma.todo.findMany({
        orderBy: {
            order: 'asc'
        }
       })
    }

    // レコード作成
    @Mutation(() => TodoModel)
    async createTodo(
        @Args('content') content: string,
        @Args('dueDate') dueDate: string,
    ) {
        return this.prisma.todo.create({ data: { content, dueDate } });
    }

    // レコードの更新
    @Mutation(() => TodoModel)
    async updateTodo(
        @Args('id') id: number,
        @Args('content') content: string,
        @Args('dueDate') dueDate: string,
    ) {
        return this.prisma.todo.update({
            where: { id: Number(id) },
            data: { id, content, dueDate },
        });
    }

    // レコードの削除
    @Mutation(() => TodoModel)
    async deleteTodo(
        @Args('id') id: number,
    ) {
        return this.prisma.todo.delete({
            where: {
                id: Number(id)
            }
        });
    }
  
}

