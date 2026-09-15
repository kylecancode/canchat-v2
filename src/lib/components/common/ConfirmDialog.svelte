<script lang="ts">
	import { onMount, getContext, createEventDispatcher } from 'svelte';
	const i18n = getContext('i18n');
	const dispatch = createEventDispatcher();

	import { fade } from 'svelte/transition';
	import { flyAndScale } from '$lib/utils/transitions';
	import * as focusTrap from 'focus-trap';
	import { ariaMessage } from '$lib/stores';
	import { lockBodyScroll, unlockBodyScroll } from '$lib/utils/scroll-lock';

	export let title = '';
	export let message = '';

	export let cancelLabel = $i18n.t('Cancel');
	export let confirmLabel = $i18n.t('Confirm');

	export let onConfirm = () => {};

	export let input = false;
	export let inputPlaceholder = '';
	export let inputValue = '';

	export let show = false;

	export let initialFocusSelector = '';
	export let returnFocusSelector = '';

	let modalElement: HTMLElement;
	let mounted = false;
	let trap: any = null;
	let scrollLocked = false;

	// Confirm dialogs are usually opened on top of a modal. Without this check a
	// single Escape closed both layers at once.
	const isTopModal = () => {
		const modals = document.getElementsByClassName('modal');
		return modals.length && modals[modals.length - 1] === modalElement;
	};

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Escape' && isTopModal()) {
			show = false;
		}
	};

	const confirmHandler = async () => {
		show = false;
		await onConfirm();
		dispatch('confirm', inputValue);
	};

	onMount(() => {
		mounted = true;
	});

	$: cancelLabel = $i18n.t('Cancel');
	$: confirmLabel = $i18n.t('Confirm');

	$: if (mounted) {
		if (show && modalElement) {
			document.body.appendChild(modalElement);

			window.addEventListener('keydown', handleKeyDown);
			if (!scrollLocked) {
				lockBodyScroll();
				scrollLocked = true;
			}
			ariaMessage.set($i18n.t('dialogOpened', { title: title }));
		} else if (modalElement) {
			window.removeEventListener('keydown', handleKeyDown);
			if (document.body.contains(modalElement)) {
				document.body.removeChild(modalElement);
			}

			if (scrollLocked) {
				unlockBodyScroll();
				scrollLocked = false;
			}
			ariaMessage.set($i18n.t('dialogClosed', { title: title }));
		}
	}
	$: if (show && modalElement && !trap) {
		const config: any = {
			clickOutsideDeactivates: true,
			// This makes the trap record the active element automatically
			returnFocusOnDeactivate: true,
			// Use the provided initial focus selector if available
			initialFocus: initialFocusSelector
				? () => modalElement.querySelector(initialFocusSelector)
				: undefined,
			// Override onDeactivate if a custom return focus selector is provided:
			onDeactivate: () => {
				if (returnFocusSelector) {
					const returnEl = document.querySelector(returnFocusSelector);
					if (returnEl) {
						returnEl.focus();
						return;
					}
				}
			}
		};
		trap = focusTrap.createFocusTrap(modalElement, config);
		trap.activate();
	} else if (!show && trap) {
		trap.deactivate();
		trap = null;
	}
</script>

{#if show}
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		bind:this={modalElement}
		class="modal fixed top-0 right-0 left-0 bottom-0 bg-black/60 w-full h-screen max-h-[100dvh] p-3 flex justify-center z-[99999999] overflow-y-auto overscroll-contain"
		in:fade={{ duration: 10 }}
		on:mousedown={() => {
			show = false;
		}}
	>
		<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
		<div
			id="confirm-dialog-container-wrapper"
			role="dialog"
			aria-modal="true"
			aria-label={title || $i18n.t('Confirm your action')}
			class=" m-auto rounded-2xl w-[32rem] mx-2 max-w-[calc(100%-1rem)] bg-gray-50 dark:bg-gray-950 shadow-3xl"
			in:flyAndScale
			on:mousedown={(e) => {
				e.stopPropagation();
			}}
		>
			<div class="px-[1.75rem] py-6 flex flex-col">
				<div class=" text-lg font-semibold dark:text-gray-200 mb-2.5">
					{#if title !== ''}
						<h2>{title}</h2>
					{:else}
						<h2>{$i18n.t('Confirm your action')}</h2>
					{/if}
				</div>

				<slot>
					<div class=" text-sm text-gray-600 dark:text-gray-400 flex-1">
						{#if message !== ''}
							{message}
						{:else}
							{$i18n.t('This action cannot be undone. Do you wish to continue?')}
						{/if}

						{#if input}
							<textarea
								bind:value={inputValue}
								placeholder={inputPlaceholder ? inputPlaceholder : $i18n.t('Enter your message')}
								class="w-full mt-2 rounded-lg px-4 py-2 text-sm dark:text-gray-300 dark:bg-gray-900 outline-none resize-none"
								rows="3"
								required
							/>
						{/if}
					</div>
				</slot>

				<div class="mt-6 flex justify-between gap-1.5">
					<button
						class="bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-850 dark:hover:bg-gray-800 dark:text-white font-medium w-full py-2.5 rounded-lg transition"
						on:click={() => {
							show = false;
							dispatch('cancel');
						}}
						type="button"
					>
						{cancelLabel}
					</button>
					<button
						class="bg-gray-900 hover:bg-gray-850 text-gray-100 dark:bg-gray-100 dark:hover:bg-white dark:text-gray-800 font-medium w-full py-2.5 rounded-lg transition"
						on:click={() => {
							confirmHandler();
						}}
						type="button"
					>
						{confirmLabel}
					</button>
				</div>
			</div>
		</div>
	</div>
{/if}
