<script lang="ts">
	import SectionHeader from "$lib/components/SectionHeader.svelte";
    import ImageUploader from "$lib/components/ImageUploader.svelte";
</script>

<section class="upload">
	<SectionHeader text="Upload Image"/>
    <ImageUploader />
</section>

<style>
	.upload {
        width: 100%;
		height: 100vh;
		display: flex;
        flex-direction: column;
		align-items: center;
		justify-content: flex-start;
        padding: 5rem 0rem;
		padding-top: 112px;
        gap: 1.5rem;
        text-align: center;
	}
</style>
