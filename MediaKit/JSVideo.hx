//
//  Javascript VideoPlayer
//
//  Created by Baluta Cristian on 2012-01-21.
//  Copyright (c) 2012 http://ralcr.com. 
//	This software is released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
//

import js.Lib;
import massive.display.IVideo;

/*
Useful links:

 - W3C http://www.w3.org/TR/html5/video.html
 - Mozilla https://developer.mozilla.org/En/Using_audio_and_video_in_Firefox
 - Safari http://developer.apple.com/library/safari/#documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Introduction/Introduction.html
 - Opera http://dev.opera.com/articles/view/everything-you-need-to-know-about-html5-video-and-audio/
*/
class Video extends RCView, implements RCVideoInterface {

    var video:Dynamic;

    public function new() {
        super();

        view = Lib.document.createElement("video");
        //element.appendChild(video);

        video.setAttribute("preload", "auto");

        video.width = 800;
        video.height = 600;

        #if ios
        video.setAttribute("controls", "");
        #end

        // http://www.w3.org/TR/html5/video.html#mediaevents

        video.addEventListener("error", onError, false);
        video.addEventListener("loadedmetadata", onMetadata, false);
        video.addEventListener("ended", playbackComplete, false);
        video.addEventListener("stalled", onBufferEmpty, false);
        video.addEventListener("canplay", onBufferFull, false);
        video.addEventListener("canplaythrough", onBufferFull, false);

        // "waiting" event only implemented in Firefox at time of writing. ms 22.9.11
        // see http://dev.opera.com/forums/topic/1051492
        video.addEventListener("waiting", onBufferEmpty, false);
    }

    override public function destroy()
    {
        super.destroy();

        video.removeEventListener("error", onError, false);
        video.removeEventListener("loadedmetadata", onMetadata, false);
        video.removeEventListener("ended", playbackComplete, false);
        video.removeEventListener("stalled", onBufferEmpty, false);
        video.removeEventListener("canplay", onBufferFull, false);
        video.removeEventListener("canplaythrough", onBufferFull, false);
        video.removeEventListener("waiting", onBufferEmpty, false);
    }

    override function startVideo()
    {
        // cover the case when user selects play() directly after setting source
        if (playbackState == PLAYING)
            video.autoplay = "";

        video.src = source;

        #if ios
        // bug: http://clubajax.org/ipad-bug-fix-for-dynamically-created-html5-video/
        video.load();
        #end
    }

    override function playVideo()
    {
        video.play();
    }

    override function pauseVideo()
    {
        video.pause();
    }

    override function stopVideo()
    {
        video.src = "";
    }

    override function seekVideo(time:Float)
    {
        video.currentTime = time;
    }

    override function updateVolume(level:Float)
    {
        video.volume = Std.string(Math.round(level * 10) / 10);
    }

    override function change(flag:Dynamic)
    {
        super.change(flag);

        if (flag.width || flag.height || flag.videoWidth || flag.videoHeight)
        {
            var vw = width;
            var vh = height;

            if (videoWidth > 0 && videoHeight > 0)
            {
                vw = videoWidth;
                vh = videoHeight;
            }

            var sw = width / vw;
            var sh = height / vh;
            var s = (sw < sh ? sw : sh);

            vw *= s;
            vh *= s;

            video.style.left = Std.int((width - vw) * 0.5) + "px";
            video.style.top = Std.int((height - vh) * 0.5) + "px";

            video.width = vw;
            video.height = vh;
        }

        if (flag.autoPlay)
        {
            if (autoPlay) video.autoplay = "";
            else video.removeAttribute("autoplay");
        }

        if (flag.seeking)
        {
            // bug: https://jira.massiveinteractive.com/browse/MUI-567
            if (!seeking && bufferState == EMPTY && video.buffered.length > 0 && (video.buffered.end(0) - video.currentTime) > 3)
            {
                bufferState = changeValue("bufferState", FULL);
            }
        }
    }

    function onMetadata():Void
    {
        duration = changeValue("duration", Std.parseInt(Std.string(video.duration)));
        videoWidth = changeValue("videoWidth", Std.parseInt(Std.string(video.videoWidth)));
        videoHeight = changeValue("videoHeight", Std.parseInt(Std.string(video.videoHeight)));
        metadataLoaded = changeValue("metadataLoaded", true);
    }

    function onBufferEmpty()
    {
        // If still buffering and have less than 3 secs of buffer ahead then broadcast EMPTY
        // bug: https://jira.massiveinteractive.com/browse/MUI-566
        if (video.buffered.length == 0 || (video.networkState == 2 && (video.buffered.end(0) - video.currentTime) < 3))
            bufferState = changeValue("bufferState", EMPTY);
    }

    function onBufferFull()
    {
        bufferState = changeValue("bufferState", FULL);
    }

    // In flash we look at bytesloaded vs bytestotal. This isn't very accurate however
    // and can't be done with latest html5 video. Instead we monitor buffer windows which
    // are the blocks of loaded video content.
    //
    // See: http://code.google.com/p/chromium/issues/detail?id=41603#c2
    // See: http://www.whatwg.org/specs/web-apps/current-work/multipage/video.html#dom-media-buffered
    // See: http://hacks.mozilla.org/2010/08/html5-video-buffered-property-available-in-firefox-4/
    //
    // Note: There seems to be a bug under Chrome where the buffer windows expends to full
    //       playback duration if user pauses or interacts with stream, even though
    //       the stream is not buffered to that position. ms 16/02/11
    //
    // TODO: currently we have one window, look at supporting multiple. ms 16/02/11
    override function updateState()
    {
        super.updateState();

        currentTime = changeValue("currentTime", video.currentTime);
    }

    override function updateBufferProgress()
    {
        if (video.buffered != null)
        {
            if (video.buffered.length > 0)
            {
                bufferProgress = changeValue("bufferProgress", video.buffered.end(0) / duration);
            }
        }
        else
        {
            bufferProgress = changeValue("bufferProgress", 0);
        }
    }

    function onError(e:Dynamic)
    {
        var code = e.target.error.code;
        var id = "" + code;
        var error = switch (code) {
            case e.target.error.MEDIA_ERR_ABORTED:
                PLAYBACK_ABORTED(id); //trace('You aborted the video playback.');
            case e.target.error.MEDIA_ERR_NETWORK:
                NETWORK_ERROR(id); //trace('A network error caused the video download to fail part-way.');
            case e.target.error.MEDIA_ERR_DECODE:
                DECODE_ERROR(id); //trace('The video playback was aborted due to a corruption problem or because the video used features your browser did not support.');
            case e.target.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
                UNSUPPORTED_FORMAT(id); //trace('The video could not be loaded, either because the server or network failed or because the format is not supported.');
            default:
                UNKNOWN_ERROR(id); //trace('An unknown error occurred.');
        }

        failure(error);
    }

    // TODO: other things to consider at some point
    // return (stream != null && stream.webkitSupportsFullscreen);
    // value ? stream.webkitEnterFullscreen() : stream.webkitExitFullscreen();
}
