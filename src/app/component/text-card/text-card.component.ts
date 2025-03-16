import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import showdown from 'showdown';
import { CardService } from '../../service/card.service';
import { TextCardData } from '../../model/card.model';
import { ConfigService } from '../../service/config.service';

@Component({
    selector: 'app-text-card',
    imports: [CommonModule, FormsModule],
    templateUrl: './text-card.component.html',
    styleUrl: './text-card.component.scss',
})
export class TextCardComponent implements OnInit {
    @Input({ required: true }) data!: TextCardData;
    @ViewChild('textarea') textareaRef!: ElementRef<HTMLElement>;

    textarea!: HTMLElement;
    mode: 'view'|'edit' = 'view';
    viewValue = '';
    mdConverter: showdown.Converter;

    constructor(private cardService: CardService, config: ConfigService) {
        this.mdConverter = config.mdConverter;
        this.textarea = this.textareaRef.nativeElement;
    }

    ngOnInit(): void {
        this.viewValue = this.mdConverter.makeHtml(this.data.content)
    }

    textareaKeydown() {
        this.textarea.style.height = 'auto';
        this.textarea.style.height = `${this.textarea.scrollHeight+20}px`
        this.data.content = (this.textarea as any).value;
    }

    stopPropagation(event: Event) { event.stopPropagation(); }

    focusText() { this.textarea.focus() }

    save() {
        this.data.content = (this.textarea as any).value
        this.viewValue = this.mdConverter.makeHtml(this.data.content);
        this.mode = 'view';
        this.cardService.update(this.data)
    }

    edit() { this.mode = 'edit'; }

}
