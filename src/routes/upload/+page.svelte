<script lang="ts">
	import SectionHeader from "$lib/components/SectionHeader.svelte";
    import ImageUploader from "$lib/components/ImageUploader.svelte";

    let uploadSuccess = false;
</script>

<section class="upload">
	<SectionHeader text={uploadSuccess ? "Upload Result" : "Upload Image"}/>
    <ImageUploader bind:uploadSuccess />
</section>

<style>
	.upload {
        width: 100%;
		min-height: 100vh;
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
