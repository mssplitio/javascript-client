/**
Copyright 2016 Split Software

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
**/
'use strict';

import logFactory from '../../utils/logger';
const log = logFactory('splitio-engine:matcher');
import thenable from '../../utils/promise/thenable';

function matcherSegmentContext(segmentName, storage) {

  function segmentMatcher(key) {
    const isInSegment = storage.segments.isInSegment(segmentName, key);

    if (thenable(isInSegment)) {
      isInSegment.then(result => {
        log.debug(`[asyncSegmentMatcher] evaluated ${segmentName} / ${key} => ${isInSegment}`);

        return result;
      });
    } else {
      log.debug(`[segmentMatcher] evaluated ${segmentName} / ${key} => ${isInSegment}`);
    }

    return isInSegment;
  }

  return segmentMatcher;
}

export default matcherSegmentContext;