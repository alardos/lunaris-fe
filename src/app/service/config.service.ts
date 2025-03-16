import { Injectable } from '@angular/core';
import { Converter as MdConverter } from 'showdown';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {
    public readonly mdConverter = new MdConverter({
        tables:true,
        tasklists:true,
        simpleLineBreaks:true,
        simplifiedAutoLink:true,
        strikethrough:true,
        ghCodeBlocks:true,
        parseImgDimensions:true,
    })

}
