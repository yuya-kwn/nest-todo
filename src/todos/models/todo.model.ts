import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Todo {
    @Field(() => ID)
    id: number;
    content: string;
    dueDate: string;
}