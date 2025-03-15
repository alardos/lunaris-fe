import { Component, Input } from '@angular/core';

export class TextCardData {
    constructor(
        public title: string,
        public content: string,
    ) {}
}

@Component({
    selector: 'app-text-card',
    imports: [],
    templateUrl: './text-card.component.html',
    styleUrl: './text-card.component.scss',
})
export class TextCardComponent {
    @Input({ required: true }) data!: TextCardData;
}
