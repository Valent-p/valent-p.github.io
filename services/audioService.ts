// src/services/audioService.ts

const soundCache: { [key: string]: HTMLAudioElement } = {};

const playSound = (soundFile: string, volume: number = 0.7): void => {
  try {
    let audio: HTMLAudioElement;
    if (soundCache[soundFile]) {
      audio = soundCache[soundFile];
    } else {
      // Changed path to load from root of public folder
      audio = new Audio(`/${soundFile}`);
      soundCache[soundFile] = audio;

      // Attach detailed error listeners only once when the Audio object is created
      audio.onerror = () => {
        console.error(`Error loading/playing sound ${soundFile}:`, audio.error);
        if (audio.error) {
          let errorMessage = `Error code: ${audio.error.code}. Message: ${audio.error.message || 'No specific message.'}`;
          switch (audio.error.code) {
            case MediaError.MEDIA_ERR_ABORTED:
              errorMessage += ' (The fetching process for the media resource was aborted by the user agent at the user\'s request.)';
              break;
            case MediaError.MEDIA_ERR_NETWORK:
              errorMessage += ' (A network error of some description caused the user agent to stop fetching the media resource, after the resource was established to be usable.)';
              break;
            case MediaError.MEDIA_ERR_DECODE:
              errorMessage += ' (An error of some description occurred while decoding the media resource, after the resource was established to be usable.)';
              break;
            case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
              errorMessage += ' (The media resource indicated by the src attribute or a script an HLS playlist was not suitable.)';
              break;
            default:
              errorMessage += ' (An unknown error occurred.)';
          }
          console.error(`Detailed error for ${soundFile}: ${errorMessage}`);
        }
      };

      audio.onstalled = () => {
        console.warn(`Sound playback stalled for ${soundFile}: The user agent is trying to fetch media data, but data is unexpectedly not forthcoming.`);
      };

      audio.onsuspend = () => {
        console.warn(`Sound loading suspended for ${soundFile}: Media data loading has been suspended.`);
      };
      
      audio.onemptied = () => {
        // This event is fired when the media resource is suddenly unavailable (e.g. a network error)
        // console.warn(`Media resource emptied for ${soundFile}. It may have become unavailable.`);
      };
    }

    audio.currentTime = 0; // Rewind to start if already playing or played previously
    audio.volume = volume;
    
    // Play returns a promise
    const playPromise = audio.play();

    if (playPromise !== undefined) {
      playPromise.catch(error => {
        // Autoplay restrictions might prevent playing without user interaction.
        // Or file might not be found / other errors caught by onerror.
        console.warn(`Could not play sound ${soundFile} (promise rejected):`, error);
      });
    }

  } catch (error) {
    console.error(`Generic error in playSound for ${soundFile}:`, error);
  }
};

// All sounds now point to 'win.mp3' for testing
export const playStartSound = () => playSound('win.mp3');
export const playClickSound = () => playSound('win.mp3');
export const playEmptyRevealSound = () => playSound('win.mp3', 0.5); // Softer for multiple reveals, but still 'win.mp3'
export const playFlagSound = () => playSound('win.mp3');
export const playExplosionSound = () => playSound('win.mp3');
export const playWinSound = () => playSound('win.mp3');