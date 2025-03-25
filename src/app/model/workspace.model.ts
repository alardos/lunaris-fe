import { CardData, cardFactory } from "./card.model";

export class Workspace {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly owner: string,
        public readonly members: string[],
        public readonly cards: CardData[],
    ) {}

    static from(arg: {
        id: string,
        name: string,
        owner: string,
        members: string[],
        cards: CardData[],
    }): Workspace {
        return new Workspace(arg.id,arg.name,arg.owner,arg.members,arg.cards?.map(cardFactory))
    }
}
