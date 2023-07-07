import { Field, ID, Int, ObjectType } from "@nestjs/graphql";
import { Todo } from "@prisma/client";

@ObjectType()
export class TodoModel implements Todo {
    @Field(() => ID)
    id: number;
    @Field(() => Int, { nullable: true})
    order: number | null;
    content: string;
    dueDate: string;
}