import { useEffect, useState } from "react";
import { FiVolume2, FiVolumeX } from "react-icons/fi";
import { isMuted, playSound, subscribeMuted, toggleMuted } from "../../lib/sound";

/**
 * Floating mute/unmute control for the UI sound layer. Fixed to the bottom-right
 * so it never collides with the navbar (top) or the scroll progress bar. The
 * preference is persisted by the engine (localStorage). Styled to match the
 * site's other round controls (theme toggle / social chips).
 */
const SoundToggle = () => {
  const [muted, setMuted] = useState(isMuted);

  // Reflect changes coming from anywhere (e.g. the engine muting on a system
  // change) so the icon never drifts out of sync.
  useEffect(() => subscribeMuted(setMuted), []);

  const onClick = () => {
    const nowMuted = toggleMuted();
    // Confirm re-enabling with a soft chime (this click is a real gesture, so
    // it unlocks + plays even on the very first interaction).
    if (!nowMuted) playSound("chime", true);
  };

  return (
    <button
      type="button"
      onClick={onClick}
      data-no-sound
      data-cursor="hover"
      aria-label={muted ? "Unmute interface sounds" : "Mute interface sounds"}
      title={muted ? "Unmute sounds" : "Mute sounds"}
      className="fixed bottom-5 right-5 z-40 grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white/70 text-blue-500 shadow-sm backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-blue-400/60 hover:text-blue-600 hover:shadow-md hover:shadow-blue-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 dark:border-slate-800 dark:bg-slate-900/70 dark:text-blue-400 dark:hover:text-blue-300"
    >
      {muted ? <FiVolumeX size={18} /> : <FiVolume2 size={18} />}
    </button>
  );
};

export default SoundToggle;
