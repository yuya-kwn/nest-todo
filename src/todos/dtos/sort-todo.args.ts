import { ArgsType, Field, Int } from "@nestjs/graphql";

@ArgsType()
export class SortTodoArgs {
    @Field(() => [Int])
    ids: number[];
}