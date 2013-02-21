function cachedImageViewInit(args) {
	
	if (args.cacheHires && OS_IOS && Ti.Platform.displayCaps.density === 'high') {
		args.image = args.cacheHires;
		args.hires = true;
	}
	
	// validate image url
	if(!args.image || !Ti.Platform.canOpenURL(args.image)) {
	    args.image = "";
	}
	
	if (args.cacheName === undefined) {
		args.cacheName = Ti.Utils.md5HexDigest(args.image);
	}
	
	if (args.hires) {
		args.cacheName = args.cacheName + '@2x';
	}

	if (args.cacheExtension === undefined) {
		
		// from http://stackoverflow.com/a/680982/292947
		var re = /(?:\.([^.]+))?$/;
		var ext = re.exec(args.image)[1];
		
		args.cacheExtension = ext ? ext : '';
	}

	var savedFile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, args.cacheName + '.' + args.cacheExtension)
	var saveFile = true;
	
	if (savedFile.exists()) {
		args.image = savedFile;		
		saveFile = false;
	}
	
	delete args.id;
	delete args.cacheName;
	delete args.cacheExtension;
	delete args.cacheHires;

	for (var k in args) {
		$.imageView[k] = args[k];	
	}
	
	
	if (saveFile === true) {
		
		function saveImage(e) {
			$.imageView.removeEventlistener('load', saveImage);
						
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

var args = arguments[0] || {};

if (args.image) {
	cachedImageViewInit(args);
} else {
	//parse tss params - otherwise load eventlistener will not work.
	for (var k in args) {
		//Ti.API.info(k + " -> " + args[k]);
		$.imageView[k] = args[k];	
	}
}

exports.init = cachedImageViewInit;