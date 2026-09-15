/**
 * Reference-counted body scroll lock.
 *
 * Modals and drawers can stack (Settings -> Manage Memories -> Add Memory).
 * Toggling `document.body.style.overflow` directly means the innermost layer
 * to close restores scrolling while outer layers are still open. Counting
 * locks keeps the body locked until the last layer releases it.
 */

let lockCount = 0;
let previousOverflow: string | null = null;

export const lockBodyScroll = () => {
	if (typeof document === 'undefined') return;

	if (lockCount === 0) {
		previousOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
	}
	lockCount += 1;
};

export const unlockBodyScroll = () => {
	if (typeof document === 'undefined') return;
	if (lockCount === 0) return;

	lockCount -= 1;
	if (lockCount === 0) {
		document.body.style.overflow = previousOverflow ?? '';
		previousOverflow = null;
	}
};
