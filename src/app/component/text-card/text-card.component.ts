import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostBinding, Input, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import showdown from 'showdown';
import { CardService } from '../../service/card.service';
import { TextCardData } from '../../model/card.model';
import { ConfigService } from '../../service/config.service';
import { Member } from '../../model/workspace.model';

@Component({
    selector: 'app-text-card',
    imports: [CommonModule, FormsModule],
    templateUrl: './text-card.component.html',
    styleUrl: './text-card.component.scss',
})
export class TextCardComponent implements OnInit {
    @Input({ required: true }) data!: TextCardData;
    @Input({ required: true }) members!: Member[];
    @ViewChild('textarea') textareaRef!: ElementRef<HTMLElement>;
    @HostBinding("style.--owner-color") private ownerColor!: string;

    mode: 'view'|'edit' = 'view';
    viewValue = '';
    mdConverter: showdown.Converter;

    constructor(private cardService: CardService, config: ConfigService) {
        this.mdConverter = config.mdConverter;
    }

    ngOnInit(): void {
        this.viewValue = this.mdConverter.makeHtml(this.data.content)

        this.ownerColor = this.thisCardColor()
    }

    thisCardColor(): string {
        console.log(this.members,this.data);
        return this.members.find(m => m.id === this.data.owner)?.color ?? "#FFFFFF"
    }
    textareaKeydown() {
        this.textareaRef.nativeElement.style.height = 'auto';
        this.textareaRef.nativeElement.style.height = `${this.textareaRef.nativeElement.scrollHeight+20}px`
        this.data.content = (this.textareaRef.nativeElement as any).value;
    }

    stopPropagation(event: Event) { event.stopPropagation(); }

    focusText() { this.textareaRef.nativeElement.focus() }

    save() {
        this.data.content = (this.textareaRef.nativeElement as any).value
        this.viewValue = this.mdConverter.makeHtml(this.data.content);
        this.mode = 'view';
        this.cardService.update(this.data)
    }

    edit() { this.mode = 'edit'; }

}
