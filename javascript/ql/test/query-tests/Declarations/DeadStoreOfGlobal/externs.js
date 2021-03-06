// Adapted from the Google Closure externs; original copyright header included below.
/*
 * Copyright 2008 The Closure Compiler Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

function Window() {}

Window.prototype.onload;

var global;

var window;

window.prop;

/**
 * @see http://dev.w3.org/html5/workers/
 * @constructor
 * @implements {EventTarget}
 */
function Worker(opt_arg0) {}

/**
 * Sent when the worker thread posts a message to its creator.
 * @type {?function(!MessageEvent)}
 */
Worker.prototype.onmessage = function() {};

//semmle-extractor-options: --externs
