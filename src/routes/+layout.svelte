<script lang="ts">
	import './layout.css';
	
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import CTA from '$lib/components/CTA.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<title>InstaTags</title>
</svelte:head>

<main>
	<Navbar />
	{@render children()}
	<CTA />
	<Footer />
</main>

<style>
	main {
		overflow-x: hidden;
	}
</style>
