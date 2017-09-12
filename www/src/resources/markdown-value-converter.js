import MarkdownIt from "markdown-it";
import {InlineViewStrategy} from 'aurelia-framework';

export class MarkdownValueConverter {

    constructor() {
        this.md = new MarkdownIt({
            html: true,
            linkify: true
        })
    }

    toView(value) {
        if (!value) return value

        value = value.replace('(//images.contentful.com','(https://images.contentful.com')
        value = value.replace('(//','(http://')

        var output = this.md.render(value)

        output = output.replace('href="http', 'class="au-target external" target="_system" href="http');
        output = output.replace('href="mailto', 'class="au-target external" target="_self" href="mailto');
        output = output.replace('href="tel', 'class="au-target external" target="_blank" href="tel');

        return output
    }
}
