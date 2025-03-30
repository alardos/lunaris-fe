import { CardData, cardFactory } from "./card.model";

export class Workspace {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly owner: string,
        public readonly members: string[],
        public cards: CardData[],
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

export class Distribution {
    constructor (
        public items: {card:string,place:number,ordinal:number}[],
        public hash: string
    ) {}

    static from(arg: {
        items: {card:string,place:number,ordinal:number}[],
        hash: string
    }): Distribution {
        return new Distribution(arg.items,arg.hash)
    }

}
