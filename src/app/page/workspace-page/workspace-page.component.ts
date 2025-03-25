import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { TextCardComponent } from '../../component/text-card/text-card.component';
import { CardService } from '../../service/card.service';
import { CardData, TextCardData } from '../../model/card.model';
import { env } from '../../../../environment';
import { CardWrapperComponent } from '../../component/card-wrapper/card-wrapper.component';
import { WorkspaceService } from '../../service/workspace.service';
import { Workspace } from '../../model/workspace.model';

@Component({
    selector: 'app-workspace-page',
    imports: [CommonModule, DragDropModule, TextCardComponent, CardWrapperComponent],
    templateUrl: './workspace-page.component.html',
    styleUrl: './workspace-page.component.scss',
})
export class WorkspacePageComponent implements OnInit {
    workspace!: Workspace;
    leftColumn: CardData[] = [ ];
    centerColumn: CardData[] = [ ];
    rightColumn: CardData[] = [ ];

    constructor(private cardService: CardService, private workspaceService: WorkspaceService) { }

    async ngOnInit() {
        this.workspace = await this.workspaceService.details(env.testWorkspaceId)
        this.centerColumn = this.workspace.cards.sort((a,b) => a.createdAt-b.createdAt)
        console.log(this.centerColumn)
    }

    async createTextCard() {
        this.centerColumn.push(
            await this.cardService.create(
                new TextCardData('', env.testWorkspaceId, '', new Date().getTime(), '')
            )
        )
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
    }
}
