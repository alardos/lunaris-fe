import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { CardService } from '../../service/card.service';
import { CardData, TextCardData } from '../../model/card.model';
import { CardWrapperComponent } from '../../component/card-wrapper/card-wrapper.component';
import { WorkspaceService } from '../../service/workspace.service';
import { Distribution, Workspace } from '../../model/workspace.model';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-workspace-page',
    imports: [CommonModule, DragDropModule, CardWrapperComponent],
    templateUrl: './workspace-page.component.html',
    styleUrl: './workspace-page.component.scss',
})
export class WorkspacePageComponent implements OnInit {
    id!: string;
    distribution!: Distribution;
    workspace!: Workspace;

    leftCol: CardData[] = [];
    centerCol: CardData[] = [];
    rightCol: CardData[] = [];

    constructor(
      private cardService: CardService,
      private workspaceService: WorkspaceService,
      private route: ActivatedRoute
    ) { }

    async ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id')!
        await Promise.all([
            this.workspaceService.details(this.id)
                .then(data => this.workspace=data),
            this.workspaceService.distribution(this.id)
                .then(data => {console.log(data);this.distribution=data;return data})
        ]).then(() => {
            this.distribute()
        })
    }

    sortByOrdinal(cards: CardData[]) {
        return cards.sort((a,b)=>this.getDistribution(a.id)!.ordinal!-this.getDistribution(b.id)!.ordinal!)
    }
    sortByCreation(cards: CardData[]) {
        return cards.sort((a,b)=>b.createdAt-a.createdAt)
    }

    async distribute() {
        this.leftCol = this.leftItems();
        this.centerCol = this.centerItems();
        this.rightCol = this.rightItems();
    }

    async createTextCard() {
        await this.cardService.create(new TextCardData('', this.workspace.id, '', 0, ''))
        this.ngOnInit()
    }

    centerItems() {
        return this.sortByCreation(this.workspace.cards.filter((x:CardData) => this.isCenter(x)))
    }
    leftItems() {
        return this.sortByOrdinal(this.workspace.cards.filter((x:CardData) => this.isLeft(x)))
    }
    rightItems() {
        return this.sortByOrdinal(this.workspace.cards.filter((x:CardData) => this.isRight(x)))
    }

    isLeft(card:CardData) {
        return this.distribution.items.some(d => d.card === card.id && d.place === 1)
    }

    isCenter(card:CardData) {
        return this?.distribution?.items.some(d => d.card === card.id && d.place === null)
    }

    isRight(card:CardData) {
        return this?.distribution?.items.some(d => d.card === card.id && d.place === 2)
    }

    dropToLeft(event: CdkDragDrop<CardData[]>) {
        this.drop(event)
    }
    dropToCenter(event: CdkDragDrop<CardData[]>) {
        this.drop(event)
        this.centerCol = this.centerItems() // for sorting
    }
    dropToRight(event: CdkDragDrop<CardData[]>) {
        this.drop(event)
    }

    drop(event: CdkDragDrop<CardData[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex
            );

        }
        this.updateDistribution()
    }

    getDistribution(card:string): {card:string,place:number|null,ordinal:number|null}|undefined  {
        return this.distribution!.items.find(d => d.card === card);
    }

    updateDistribution() {
        this.leftCol.forEach((c,i) => {
            const distribution = this.getDistribution(c.id) ?? {} as any;
            distribution.place = 1;
            distribution.ordinal = i
        })
        this.centerCol.forEach((c) => {
            const distribution = this.getDistribution(c.id) ?? {} as any;
            distribution.place = null;
            distribution.ordinal = null
        })
        this.rightCol.forEach((c,i) => {
            const distribution = this.getDistribution(c.id) ?? {} as any;
            distribution.place = 2;
            distribution.ordinal = i
        })
        this.workspaceService.updateDistribution(this.workspace.id,this.distribution)
            .then(distribution => this.distribution.hash = distribution.hash)
            .catch(() => this.ngOnInit())
    }

}
