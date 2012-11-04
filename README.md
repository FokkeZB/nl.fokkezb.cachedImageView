Cached Image Views
=====

This is a widget that implements the [best practice of caching remote images](http://docs.appcelerator.com/titanium/latest/#!/guide/Image_Best_Practices-section-30082525_ImageBestPractices-Cachingremoteimages) for [Titanium](http://www.appcelerator.com/platform) [Alloy](http://projects.appcelerator.com/alloy/docs/Alloy-bootstrap/index.html) by [Appcelerator](http://www.appcelerator.com).

Features
--------

* Initialize the widget directly through the requiring view.
* Provide a local filename to be used instead of a MD5 hash of the URL.
* Provide the extension for the local filename if the remote doesn't have one.

Roadmap
-------

* Provide a subdirectory to save the image in.
* Provide a maximum age for the cached image.

Quick Start
-----------

1. Download the repository of the widget as a ZIP to your project root folder.
2. Unzip the widget and you'll find it under `app/widgets/nl.fokkezb.cachedImageView`.
3. Add the widget as a dependency to your `app/config.json` file like so:

```javascript
	...
	"dependencies": {
		"nl.fokkezb.cachedImageView":"1.0"
	}
````

4. Use the widget in a view just like you'd use an `ImageView`. Only use `Widget` instead of `ImageView` and add the `src` attribute to point to the widget.

		```xml
		<Widget src="nl.fokkezb.cachedImageView"
		id="civ" image="http://widgets.fokkezb.nl/cachedImageView/appicon.png" />
		```

5. Optionally add any of the following special attributes:

	* `cacheHires`: URL of the image to use for iOS retina devices.
	* `cacheName`: Basename for the local file instead of a MD5 hash of the URL.
	* `cacheExt`: Extension for the local file if the URL doesn't have one (like with generated images)