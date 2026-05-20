<script lang="ts">
	import SectionHeader from "$lib/components/SectionHeader.svelte";
	import Carousel from "$lib/components/Carousel.svelte";
	import HowToUseCard from "$lib/components/HowToUseCard.svelte";

	const extensionSteps = [
		{
			step: "1",
			stepTitle: "Create new post on Instagram",
			stepDesc: "Start by creating a new post on Instagram and selecting the photo or video you want to upload",
			stepIcon: "/how-to-use/extension/1.svg",
		},
		{
			step: "2",
			stepTitle: "Go to the final part",
			stepDesc: "Proceed through the editing steps until you reach the final screen where you write your caption",
			stepIcon: "/how-to-use/extension/2.svg",
		},
		{
			step: "3",
			stepTitle: "Open the extension",
			stepDesc: "Click on the InstaTags browser extension icon to activate the hashtag generator.",
			stepIcon: "/how-to-use/extension/3.svg",
		},
		{
			step: "4",
			stepTitle: 'Click the "Generate Tags" button',
			stepDesc: 'Once your image is uploaded, click the "Generate Tags" button to start the hashtag generation process.',
			stepIcon: "/how-to-use/extension/4.svg",
		},
		{
			step: "5",
			stepTitle: "Wait for processing",
			stepDesc: "Please allow a few moments while our system analyzes your image and generates relevant hashtags.",
			stepIcon: "/how-to-use/extension/5.svg",
		},
		{
			step: "6",
			stepTitle: "Copy the generated tags",
			stepDesc: "Review the suggested hashtags and copy them instantly to use in your social media posts.",
			stepIcon: "/how-to-use/extension/6.svg",
		},
	];

	const webSteps = [
		{
			step: "1",
			stepTitle: "Go to the upload page",
			stepDesc: "Navigate to the upload page from the main menu to begin generating hashtags for your content.",
			stepIcon: "/how-to-use/web/1.svg",
		},
		{
			step: "2",
			stepTitle: "Drag or Upload an image",
			stepDesc: "Simply drag and drop your image into the upload area or click to select a file from your device.",
			stepIcon: "/how-to-use/web/2.svg",
		},
		{
			step: "3",
			stepTitle: 'Click the "Generate Tags" button',
			stepDesc: 'Once your image is uploaded, click the "Generate Tags" button to start the hashtag generation process.',
			stepIcon: "/how-to-use/web/3.svg",
		},
		{
			step: "4",
			stepTitle: "Wait for processing",
			stepDesc: "Please allow a few moments while our system analyzes your image and generates relevant hashtags.",
			stepIcon: "/how-to-use/web/4.svg",
		},
		{
			step: "4",
			stepTitle: "Copy the generated tags",
			stepDesc: "Review the suggested hashtags and copy them instantly to use in your social media posts.",
			stepIcon: "/how-to-use/web/5.svg",
		},
	];

	let extension = $state(true);
</script>

<section class="how-to-use">
	<SectionHeader text="How To Use"/>

	<div class="how-to-use-inner-container">
		<div class="how-to-use-switcher-container">
			<div class="how-to-use-switcher-button" style="transform: translateX({extension ? '0' : '135px'}); transition: transform 0.3s ease;"></div>
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
			<p onclick={() => extension = true} style="color: {extension ? '#f7f7f7' : '#c2c2c2'};">Extension</p>
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
			<p onclick={() => extension = false} style="color: {!extension ? '#f7f7f7' : '#c2c2c2'};">Web</p>
		</div>

		<div class="carousel-container">
			{#key extension}
			<Carousel perPage={1} visibleCards={5} cardWidth="350px" loop={true} autoplay={0} dots={true} controls={true} duration={300} startIndex={1} draggable={false}>
				{#each extension ? extensionSteps : webSteps as step}
					<HowToUseCard
						step={step.step} 
						stepTitle={step.stepTitle}
						stepDesc={step.stepDesc}
						stepIcon={step.stepIcon}
					/>
				{/each}

				{#snippet leftControl()}
					<img src="/icons/left-arrow.svg" alt="<">
				{/snippet}

				{#snippet rightControl()}
					<img src="/icons/right-arrow.svg" alt=">">
				{/snippet}
			</Carousel>
			{/key}
		</div>
	</div>
</section>

<style>
	.how-to-use {
		height: 110vh;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		gap: 1rem;
		padding-top: 112px;
	}
	
	.how-to-use-inner-container {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2rem;
	}

	.carousel-container {
		width: 100%;
		max-width: 100vw;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.how-to-use-switcher-container {
		display: flex;
		position: relative;
		justify-content: center;
		align-items: center;
		background-color: #36363680;
		border-radius: 1.5rem;
	}

	.how-to-use-switcher-container p {
		width: 135px;
		text-align: center;
		padding: 0.75rem;
		z-index: 1;
		font-size: 1.15rem;
		font-weight: 500;
		transition: all 0.3s ease;
		border-radius: 1.5rem;
	}

	.how-to-use-switcher-container p:hover {
		cursor: pointer;
		background-color: #36363680;
	}

	.how-to-use-switcher-button {
		position: absolute;
		top: 0;
		left: 0;
		width: 135px;
		height: 100%;
		background:
			radial-gradient(circle at 17.5% 0%, #c2c2c226, transparent 35%),
			linear-gradient(#44444480, #44444480)
		;
		border-radius: 1.5rem;
	}
</style>
