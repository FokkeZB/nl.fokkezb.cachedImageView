var args = arguments[0] || {};

function init(args) {
	
	if (OS_IOS && args.cacheHires && Ti.Platform.displayCaps.density === 'high') {
		args.image = args.cacheHires;
		args.hires = true;
	}

	if (!args.image || !Ti.Platform.canOpenURL(args.image)) {
		delete args.image;
		saveFile = false;

	} else {
	
		if (!args.cacheName) {
			args.cacheName = Ti.Utils.md5HexDigest(args.image);
		}
		
		if (args.hires) {
			args.cacheName = args.cacheName + '@2x';
		}

		if (!args.cacheExtension) {
			
			// from http://stackoverflow.com/a/680982/292947
			var re = /(?:\.([^.]+))?$/;
			var ext = re.exec(args.image)[1];
			
			args.cacheExtension = ext ? ext : '';
		}

		var savedFile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, args.cacheName + '.' + args.cacheExtension);
		var saveFile = true;
		
		if (savedFile.exists()) {
			args.image = savedFile;		
			saveFile = false;
		}
	}
	
	delete args.id;
	delete args.cacheName;
	delete args.cacheExtension;
	delete args.cacheHires;
	delete args.$model;

	$.imageView.applyProperties(args);
	
	if (saveFile === true) {
		
		function saveImage(e) {
			$.imageView.removeEventListener('load', saveImage);
						
			savedFile.write(
				Ti.UI.createImageView({
					image: $.imageView.image,
					width: Ti.UI.SIZE,
					height: Ti.UI.SIZE
				}).toImage()
			);
		}
		
		$.imageView.addEventListener('load', saveImage);
	}
}

if (_.size(args) > 0) {
	init(args);
}

exports.init = init;
