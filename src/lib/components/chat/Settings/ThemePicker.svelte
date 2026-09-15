<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import { theme } from '$lib/stores';
	import { THEMES, applyTheme } from '$lib/themes';

	const i18n = getContext('i18n');

	export let selected: string = 'system';

	type BaseOption = { id: string; label: string; icon: string };

	const baseOptions: BaseOption[] = [
		{ id: 'system', label: 'System', icon: '⚙️' },
		{ id: 'dark', label: 'Dark', icon: '🌑' },
		{ id: 'light', label: 'Light', icon: '☀️' }
	];

	const select = (id: string) => {
		selected = id;
		theme.set(id);
		applyTheme(id);
	};

	const onKeydown = (event: KeyboardEvent, id: string) => {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			select(id);
		}
	};

	onMount(() => {
		selected = localStorage.theme ?? 'system';
	});
</script>

<div class="flex flex-col gap-3">
	<div class="flex flex-wrap gap-1.5" role="radiogroup" aria-label={$i18n.t('Theme')}>
		{#each baseOptions as option (option.id)}
			<button
				type="button"
				role="radio"
				aria-checked={selected === option.id}
				class="px-3 py-1.5 text-xs rounded-lg transition border {selected === option.id
					? 'border-gray-400 dark:border-gray-500 bg-gray-100 dark:bg-gray-850 font-medium'
					: 'border-transparent hover:bg-gray-50 dark:hover:bg-gray-850/60 text-gray-600 dark:text-gray-400'}"
				on:click={() => select(option.id)}
			>
				<span aria-hidden="true">{option.icon}</span>
				{$i18n.t(option.label)}
			</button>
		{/each}
	</div>

	<div
		class="grid grid-cols-2 sm:grid-cols-3 gap-2"
		role="radiogroup"
		aria-label={$i18n.t('Custom themes')}
	>
		{#each THEMES as entry (entry.id)}
			{@const active = selected === entry.id}
			<div
				role="radio"
				tabindex="0"
				aria-checked={active}
				aria-label="{entry.name} — {entry.description}"
				title={entry.description}
				class="group relative cursor-pointer rounded-xl overflow-hidden text-left transition duration-200 outline-none focus-visible:ring-2 focus-visible:ring-gray-400 {active
					? 'ring-2 ring-gray-900 dark:ring-white shadow-lg'
					: 'ring-1 ring-gray-200 dark:ring-gray-800 hover:ring-gray-400 dark:hover:ring-gray-600 hover:-translate-y-0.5'}"
				on:click={() => select(entry.id)}
				on:keydown={(event) => onKeydown(event, entry.id)}
			>
				<div class="h-14 w-full" style="background: {entry.preview};" aria-hidden="true"></div>

				<div class="flex items-center gap-1.5 px-2 py-1.5 bg-white dark:bg-gray-900">
					<div class="flex -space-x-1" aria-hidden="true">
						{#each entry.swatch as color}
							<span
								class="w-2.5 h-2.5 rounded-full ring-1 ring-white dark:ring-gray-900"
								style="background: {color};"
							></span>
						{/each}
					</div>

					<span
						class="text-xs truncate {active ? 'font-semibold' : 'font-medium'}"
						style="font-family: {entry.previewFont};">{entry.name}</span
					>

					{#if active}
						<svg
							class="ml-auto w-3.5 h-3.5 flex-shrink-0"
							viewBox="0 0 20 20"
							fill="currentColor"
							aria-hidden="true"
						>
							<path
								fill-rule="evenodd"
								d="M16.704 5.29a.75.75 0 0 1 .006 1.06l-7.5 7.6a.75.75 0 0 1-1.07.004l-3.75-3.75a.75.75 0 1 1 1.06-1.06l3.214 3.213 6.98-7.073a.75.75 0 0 1 1.06-.006Z"
								clip-rule="evenodd"
							/>
						</svg>
					{/if}
				</div>
			</div>
		{/each}
	</div>

	<div class="text-[0.7rem] text-gray-500 dark:text-gray-500 leading-relaxed">
		{$i18n.t('Themes change colour, typography, spacing and effects across the whole interface.')}
	</div>
</div>
