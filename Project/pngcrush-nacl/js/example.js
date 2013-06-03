// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

function moduleDidLoad() {
  common.hideModule();
}

// Called by the common.js module.
function domContentLoaded(name, tc, config, width, height) {
  window.webkitStorageInfo.requestQuota(window.PERSISTENT, 1024*1024*10,
      function(bytes) {
        common.updateStatus(
            'Allocated '+bytes+' bytes of persistant storage.');
        common.createNaClModule(name, tc, config, width, height);
        common.attachDefaultListeners();
      },
      function(e) { alert('Failed to allocate space') });
}

function makeCall(func) {
  var message = func;
  for (var i = 1; i < arguments.length; ++i) {
    message += '\1' + arguments[i];
  }

  return message;
}

// Called by the common.js module.
function handleMessage(message_event) {
	var msg = message_event.data;
	if (msg == "done") {
		prepareDownload();
	} else if (msg == "increment") {
		incrementProgress();
	} else {
		document.getElementById("subtext").innerHTML = ("Enjoy your shiny new file. " + msg);
	}
}
