/*
 * Copyright (c) 2016 by SharpTop Software, LLC
 * All rights reserved. No part of this software project may be used, reproduced, distributed, or transmitted in any
 * form or by any means, including photocopying, recording, or other electronic or mechanical methods, without the prior
 * written permission of SharpTop Software, LLC. For permission requests, write to the author at info@sharptop.co.
 */

import MarkdownIt from "markdown-it";

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
