/*
 * Copyright (c) 2017 by SharpTop Software, LLC
 * All rights reserved. No part of this software project may be used, reproduced, distributed, or transmitted in any
 * form or by any means, including photocopying, recording, or other electronic or mechanical methods, without the prior
 * written permission of SharpTop Software, LLC. For permission requests, write to the author at info@sharptop.co.
 */

export class SortValueConverter {
    toView(array = [], propertyName, direction) {
        var factor = direction === 'ascending' ? 1 : -1;

        return array
            .slice(0)
            .sort((a, b) => {
                if (a[propertyName] == b[propertyName]) return 0;
                if (a[propertyName] < b[propertyName]) return -1 * factor;
                if (a[propertyName] > b[propertyName]) return factor;
            });
    }
}
