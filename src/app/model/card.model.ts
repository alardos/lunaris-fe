export class CardData {
    constructor(
        public readonly type: string,
        public readonly id: string,
        public readonly workspace: string,
        public readonly owner: string,
        public readonly createdAt: number,
    ) { }
}

export class TextCardData extends CardData {

    constructor(
        id: string,
        workspace: string,
        owner: string,
        createdAt: number,
        public content: string,
    ) {
        super("text",id,workspace,owner,createdAt);
    }
}

export function cardFactory(arg:any): CardData {
    switch (arg.type) {
        case 'text': return new TextCardData(arg.id, arg.workspace, arg.owner, arg.createdAt, arg.content);
        default: throw Error("wrong card type: "+arg.type);
    }
}
