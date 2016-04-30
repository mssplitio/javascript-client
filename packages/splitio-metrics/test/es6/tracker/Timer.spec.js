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

let tape = require('tape');
let TimerFactory = require('../../../lib/tracker/Timer');
let CollectorFactory = require('../../../lib/collector/Sequential');

tape('TRACKER / calling start() and stop() should store and entry inside the collector', assert => {
  let collector = CollectorFactory();
  let start = TimerFactory(collector);
  let stop = start();

  setTimeout(function () {
    let et = stop();

    assert.true(collector.state().indexOf(et) !== -1, 'ET should be present in the collector sequence');
    assert.end();
  }, 5);
});
