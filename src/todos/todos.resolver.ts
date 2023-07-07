import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Todo } from "./models/todo.model";
import { PrismaService } from "src/prisma.service";

@Resolver(() => Todo)
export class TodoResolver {
    constructor(private prisma: PrismaService) {}

    // 一覧を取得
    @Query(() => [Todo])
    async getTodoList() {
        return this.prisma.todo.findMany();
    }

    // 特定のレコードの取得
    @Query(() => Todo)
    async getTodo(
        @Args('id') id: number,
    ) {
        return this.prisma.todo.findUnique({ where: { id } });
    }

    // 部分一致するレコードの取得
    @Query(() => [Todo])
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
    @Query(() => [Todo])
    async sortTodo(
        @Args('ids', { type: () => [Number]}) ids: number[]) {
       const todos = await this.prisma.todo.findMany({
        where: { id: { in: ids } },
        orderBy: { id: 'asc' },
       });

       const sortedTodos = ids.map(id =>
        todos.find(todo => todo.id === id)
       );

       return sortedTodos;
    }

    // レコード作成
    @Mutation(() => Todo)
    async createTodo(
        @Args('content') content: string,
        @Args('dueDate') dueDate: string,
    ) {
        return this.prisma.todo.create({ data: { content, dueDate } });
    }

    // レコードの更新
    @Mutation(() => Todo)
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
    @Mutation(() => Todo)
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

