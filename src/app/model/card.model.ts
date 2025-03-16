export class CardData {
    constructor(
        public readonly type: string,
        public readonly id: string,
        public readonly workspace: string,
        public readonly owner: string,
    ) { }
}

export class TextCardData extends CardData {

    constructor(
        id: string,
        workspace: string,
        owner: string,
        public content: string,
    ) {
        super("type",id,workspace,owner);
    }
}

export function cardFactory(arg:any): CardData {
    switch (arg.type) {
        case 'text': return new TextCardData(arg.id, arg.workspace, arg.owner, arg.content);
        default: throw Error("wrong card type: "+arg.type);
    }
}
