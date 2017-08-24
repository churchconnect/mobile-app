/*
 * Copyright (c) 2017 by SharpTop Software, LLC
 * All rights reserved. No part of this software project may be used, reproduced, distributed, or transmitted in any
 * form or by any means, including photocopying, recording, or other electronic or mechanical methods, without the prior
 * written permission of SharpTop Software, LLC. For permission requests, write to the author at info@sharptop.co.
 */

export class Post {

    static domainClass = 'co.sharptop.church.Post'
    static endpoint = 'posts'

    isRssPost() {
        return this.id.length === 32
    }

}
