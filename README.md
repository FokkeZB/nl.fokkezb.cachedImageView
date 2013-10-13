# CachedImageView Widget

**NOTE:** Titanium seems to have built-in remote image caching in iOS since about 2.x and in Android since 3.x. This is not documented, but I've created a [ticket ](https://jira.appcelerator.org/browse/TC-2676)for this to be done.

## Overview
The *CachedImageView* widget implements the [best practice of caching remote images](http://docs.appcelerator.com/titanium/latest/#!/guide/Image_Best_Practices-section-30082525_ImageBestPractices-Cachingremoteimages) for [Titanium](http://www.appcelerator.com/platform) [Alloy](http://projects.appcelerator.com/alloy/docs/Alloy-bootstrap/index.html) by [Appcelerator](http://www.appcelerator.com).

## Features
* Initialize the widget directly through the requiring view.
* Provide a seperate URL for the image to use on IOS retina devices.
* Provide a local filename to be used instead of the MD5 hash of the URL.
* Provide an extension for the local file if the remote doesn't have one.
* Eventing.

## Future work
* Provide a subdirectory to save the image under.
* Provide a choice to which system directory (cache, data) to save under.
* Provide a maximum age for the cached image before re-downloading it.

## Quick Start
* [Download the latest version](https://github.com/FokkeZB/nl.fokkezb.cachedImageView/tags) of the widget as a ZIP file.
* Move the file to your project's root folder.
* Unzip the file and you'll find the widget under `app/widgets/nl.fokkezb.cachedImageView`.
* Add the widget as a dependency to your `app/config.json` file like so:

```javascript
	…
	"dependencies": {
		"nl.fokkezb.cachedImageView":"1.4"
	}
```

* Use the widget in a view just like you'd use an `ImageView`. Only use `Widget` instead of `ImageView` and add the `src` attribute to point to the widget.

```xml
<Widget src="nl.fokkezb.cachedImageView"
id="civ" image="http://url.to/image.png" onClick="handleClick" />
```

* Optionally add any of the additional parameters as attributes.

## Additonal parameters
The only required parameter is the `image` parameter. All parameters are passed on to the resulting *Ti.UI.ImageView*. You can add the following additional parameters to change the widget's behaviour. They can be used both as attributes in `<Widget>` and when initializing the widget in your controller.

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| cacheHires | *string* | URL of the image to use for iOS retina devices. |
| cacheName | *string*  | Basename for the local file instead of the MD5 hash of the URL. Use it when the URL contains some time-dependant key. |
| cacheExt | *string* | Extension for the local file if the URL doesn't have one, like with generated images. |
| cacheNot | *string* | Disable caching |

## Methods

| Method | Params | Description |
| ------ | ------ | ----------- |
| init   | *object* | Any ImageView parameters plus the additional above |
| applyProperties | *object* | Alias for `init` |
| setImage | *string* | Alias for calling `init` with only an `image` parameter |
| getImage | *bool* returnPath | Return the (path to the) local image. Calling this method before it has been cached will return `undefined` |
| on / addEventListener | *string* name, *function* callback | Add an eventlistener |
| off / removeEventListener | *string* name, *function* callback | Remove an eventlistener |
| trigger / fireEvent | *string* name, *object* args | Fire an event |

## Properties

| Property | Description |
| ---------|-------------|
| image    | Alias to setImage and getImage methods |

## Initialization in the Controller
If you don't include the `image` parameter as an attribute in `<Widget/>`, the resulting *Ti.UI.ImageView* will not be automatically initialized for you. This allows you to do this yourself in your controller. This can be usefull if you want to add some advanced decission logic to determine which image to use. If this would only depend on the *formFactor* and *platform* however, I would recommend using [conditional code](http://docs.appcelerator.com/titanium/3.0/#!/guide/Alloy_Views-section-34636249_AlloyViews-ConditionalCode) in `<Widget/>` instead.

**NOTE:** The `$.cid` in the example below corresponds to the `id` attribute in the `<Widget/>` example. You can change it to whatever value. From 1.2 on you can also call the more common `applyProperties`.

```javascript
$.cid.init({
    image: OS_IOS ? 'http://url.to/image.png' : 'http://url.to/android-image.png'
});
```

## Styling the ImageView
You can style the resulting *Ti.UI.ImageView* by applying the styles to the `<Widget/>` instead. Add the style declaration to the TTS file that belongs to the view where you've added the `<Widget/>`. The styling will be passed on to the resuling *Ti.UI.ImageView*. Be aware that any attributes you add directly to `<Widget/>` will override the TTS style.

**NOTE:** The `$.cid` in the example below corresponds to the `id` attribute in the `<Widget/>` example.

```javascript
"#cid": {
	width: 57,
	height: 57,
	preventDefaultImage: true
}
```

## Changelog
* 1.4: Added events
* 1.3: Fixed bug when using blob/file, added `image` property and `cacheNot` param
* 1.2: Added `getImage`, `setImage`, `applyProperties` and deleted `__parentSybmol`
* 1.1: Support for styling via TSS before setting image via init() 
* 1.0: Initial version

## License

<pre>
Copyright 2013 Fokke Zandbergen

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
</pre>

