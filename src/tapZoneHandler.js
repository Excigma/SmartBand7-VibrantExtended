function _call(url) {
	if(typeof url == "function") return url();	
	if(url == "") return;

  hmApp.startApp({
    url, native: true
  })
}

function _changeBrightness(delta) {
    const val = Math.min(Math.max(0, hmSetting.getBrightness() + delta), 100);
    hmSetting.setBrightness(val);
}

function initTapZones(widgetURLs, barURLs) {
	let mustHandle = false;

	const zone = hmUI.createWidget(hmUI.widget.IMG, {
		x: 0,
		y: 0,
		w: 192,
		h: 490,
		src: ""
	});

	zone.addEventListener(hmUI.event.CLICK_DOWN, () => mustHandle = true);
	zone.addEventListener(hmUI.event.MOVE, () => mustHandle = false);
	zone.addEventListener(hmUI.event.CLICK_UP, (info) => {
		if(!mustHandle) return;
		mustHandle = false;

		const {x, y} = info

		// widgets
		if(48 < x && x < 120) {
			if(36 < y && y < 114) {
				return _call(widgetURLs[0]);
			} else if(376 < y && y < 454) {
				return _call(widgetURLs[1]);
			}
		}

		// Bars
		if(x < 96) {
			// Left
			if(y < 160) {
				return _call(barURLs[0]); // Top
			} else if (y > 375) {
				return _call(barURLs[2]); // Bottom
			} else if (y > 290) {
				return _call("ScheduleListScreen"); // Day of week / DND
			} else {
				// Center
				if (x < 64) {
					_changeBrightness(-10);
				} else {
					_call("WorldClockScreen");
				}
			}
		} else {
			// Right
			if(y < 160) {
				return _call(barURLs[1]); // Top 
			} else if (y > 375) {
				return _call(barURLs[3]); // Bottom
			} else if (y > 290) {
				return _call("Settings_dndModelScreen"); // Day of week / DND
			} else {
				// center
				if (x > 128) {
					_changeBrightness(10);
				} else {
					_call("WorldClockScreen");
				}
			}
		}
	});
}