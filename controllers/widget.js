var args = arguments[0] || {},
    hires = (Ti.Platform.displayCaps.density === 'high'),
    savedFile;
  
function setImage(image) {
    init({
        image: image 
    });
    
    return;
}

function getImage(path) {
    var img = savedFile ? savedFile : $.imageView.image;
    
    if (path && typeof img !== 'string') {
        
        if (img.resolve) {
            return img.resolve();
        } else if (img.nativePath) {
            return img.nativePath;
        } else {
            return undefined;
        }
    }
    
    return img;
}

function init(args) {
	
	if (OS_IOS && args.cacheHires && hires) {
		args.image = args.cacheHires;
		args.hires = true;
	}

	if (!args.image || (OS_IOS && _.isString(args.image) && !Ti.Platform.canOpenURL(args.image))) {
		delete args.image;
		saveFile = false;

	} else if (!args.cacheNot) {
	
		if (!args.cacheName) {
			
			if (_.isString(args.image)) {
				args.cacheName = args.image;
			
			} else if (args.image.nativePath) {
				args.cacheName = args.image.nativePath;
			
			} else {
				throw new Error('For non-file blobs you need to set a cacheName manually.');
			}
		}
		
		args.cacheName = Ti.Utils.md5HexDigest(args.cacheName);
		
		if (args.hires) {
			args.cacheName = args.cacheName + '@2x';
		}

		if (!args.cacheExtension) {
			
			// from http://stackoverflow.com/a/680982/292947
			var re = /(?:\.([^.]+))?$/;
			var ext = re.exec(args.image)[1];
			
			args.cacheExtension = ext ? ext : '';
		}

		savedFile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, args.cacheName + '.' + args.cacheExtension);
		
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
	delete args.__parentSymbol;

	$.imageView.applyProperties(args);
	
	if (saveFile === true) {
		
		function saveImage(e) {
			$.imageView.removeEventListener('load', saveImage);
			
            savedFile.write(Ti.UI.createImageView({
                image: $.imageView.image,
                width: Ti.UI.SIZE,
                height: Ti.UI.SIZE,
                preventDefaultImage: true
            }).toImage());
		}
		
		$.imageView.addEventListener('load', saveImage);
	}
}

init(args);

Object.defineProperty($, "image", {
	get: getImage,
	set: setImage
});

exports.setImage = setImage;
exports.getImage = getImage;

exports.init = init;
exports.applyProperties = init;

exports.on = exports.addEventListener = function(name, callback) {
	return $.imageView.addEventListener(name, callback);
};

exports.off = exports.removeEventListener = function(name, callback) {
	return $.imageView.removeEventListener(name, callback);
};

exports.trigger = exports.fireEvent = function(name, e) {
	return $.imageView.fireEvent(name, e);
};
