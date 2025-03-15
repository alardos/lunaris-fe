import { Component } from '@angular/core';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { TextCardComponent } from '../../component/text-card/text-card.component';

@Component({
  selector: 'app-workspace-page',
  imports: [CommonModule, DragDropModule, TextCardComponent],
  templateUrl: './workspace-page.component.html',
  styleUrl: './workspace-page.component.scss',
})
export class WorkspacePageComponent {
  cards = [
    { title: 'Card 1', content: 'Content 1' },
    { title: 'Card 2', content: 'Content 2' },
    // more cards
  ];

  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.cards, event.previousIndex, event.currentIndex);
  }
}
