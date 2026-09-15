<script lang="ts">
	import { onDestroy, createEventDispatcher, tick } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import * as focusTrap from 'focus-trap';
	import { isApp } from '$lib/stores';
	import { lockBodyScroll, unlockBodyScroll } from '$lib/utils/scroll-lock';

	const dispatch = createEventDispatcher();

	export let show = false;
	export let className = '';
	export let title = '';

	let modalElement: HTMLElement | null = null;
	let contentElement: HTMLElement | null = null;
	let trap: any = null;
	let scrollLocked = false;

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Escape' && isTopModal()) {
			show = false;
		}
	};

	const isTopModal = () => {
		const modals = document.getElementsByClassName('modal');
		return modals.length && modals[modals.length - 1] === modalElement;
	};

	const activateTrap = async () => {
		await tick();
		if (!contentElement || trap) return;
		try {
			trap = focusTrap.createFocusTrap(contentElement, {
				clickOutsideDeactivates: true,
				returnFocusOnDeactivate: true,
				// The drawer can open before any of its content is focusable
				// (e.g. a call overlay that is still connecting).
				allowOutsideClick: true,
				fallbackFocus: contentElement
			});
			trap.activate();
		} catch (e) {
			trap = null;
		}
	};

	const deactivateTrap = () => {
		if (trap) {
			trap.deactivate();
			trap = null;
		}
	};

	$: if (show && modalElement) {
		document.body.appendChild(modalElement);
		window.addEventListener('keydown', handleKeyDown);
		if (!scrollLocked) {
			lockBodyScroll();
			scrollLocked = true;
		}
		activateTrap();
	} else if (modalElement) {
		dispatch('close');
		window.removeEventListener('keydown', handleKeyDown);
		deactivateTrap();

		if (document.body.contains(modalElement)) {
			document.body.removeChild(modalElement);
		}
		if (scrollLocked) {
			unlockBodyScroll();
			scrollLocked = false;
		}
	}

	onDestroy(() => {
		show = false;
		deactivateTrap();
		window.removeEventListener('keydown', handleKeyDown);
		if (modalElement && document.body.contains(modalElement)) {
			document.body.removeChild(modalElement);
		}
		if (scrollLocked) {
			unlockBodyScroll();
			scrollLocked = false;
		}
	});
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	bind:this={modalElement}
	class="modal fixed right-0 {$isApp
		? ' ml-[4.5rem] max-w-[calc(100%-4.5rem)]'
		: ''} left-0 bottom-0 bg-black/60 w-full h-screen max-h-[100dvh] flex justify-center z-[999] overflow-hidden overscroll-contain"
	in:fade={{ duration: 100 }}
	on:mousedown={() => {
		show = false;
	}}
>
	<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
	<div
		bind:this={contentElement}
		role="dialog"
		aria-modal="true"
		aria-label={title || undefined}
		tabindex="-1"
		class="drawer-sheet mt-auto w-full bg-gray-50 dark:bg-gray-900 dark:text-gray-100 {className} max-h-[100dvh] overflow-y-auto overscroll-contain scrollbar-hidden outline-none"
		in:fly={{ y: 100, duration: 150, opacity: 1 }}
		on:mousedown={(e) => {
			e.stopPropagation();
		}}
	>
		<slot />
	</div>
</div>

<style>
	/* Bottom sheet: round the leading edge and keep content clear of the
	   home indicator / gesture bar on mobile. */
	.drawer-sheet {
		border-top-left-radius: 1rem;
		border-top-right-radius: 1rem;
		padding-bottom: env(safe-area-inset-bottom, 0px);
	}

	@media (prefers-reduced-motion: reduce) {
		.drawer-sheet {
			animation: none !important;
		}
	}
</style>
