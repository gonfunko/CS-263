// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Called by the common.js module.
function moduleDidLoad() {
  // The module is not hidden by default so we can easily see if the plugin
  // failed to load.
  common.hideModule();
}

// Called by the common.js module.
function attachListeners() {
  document.getElementById('fortyTwo').addEventListener('click', fortyTwo);
  document.getElementById('reverseText').addEventListener('click', reverseText);
  document.getElementById('mainFunc').addEventListener('click', mainFunc);
}

function fortyTwo() {
  common.naclModule.postMessage('fortyTwo');
}

function mainFunc() {
  common.naclModule.postMessage('mainFunc');
}

function reverseText() {
  // Grab the text from the text box, pass it into reverseText()
  var inputBox = document.getElementById('inputBox');
  common.naclModule.postMessage('reverseText:' + inputBox.value);
}

// Called by the common.js module.
function handleMessage(message_event) {
    document.getElementById('inputBox').innerHTML = message_event.data;
}
