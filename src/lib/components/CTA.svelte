<script lang="ts">

</script>

<div class="cta">
	<h2 class="cta-header gray-gradient-text">
		Tags Instantly With InstaTags
	</h2>

	<div class="cta-btn-container">
		<a href="/upload" class="primary-btn">Try Now</a>
		<a href="/upload" class="outline-btn">Install Extension</a>
	</div>
</div>

<style>
	.cta {
		background: 
			linear-gradient(#1C1C1C00 18%, #1C1C1C),
			url("/cta/cta-bg.png")
		;
		height: 480px;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 2rem;
	}

	.cta-header {
		font-family: LaurentianStd-It;
		font-size: 3rem;
	}

	.cta-btn-container {
		display: flex;
		gap: 1rem;
		z-index: 1;
	}

	@media (max-width: 768px) {
		.cta {
			height: 360px;
			gap: 1.5rem;
			padding: 0 1.5rem;
		}

		.cta-header {
			font-size: 2.25rem;
			text-align: center;
		}

		.cta-btn-container {
			flex-wrap: wrap;
			justify-content: center;
		}
	}

	@media (max-width: 378px) {
		.cta-header {
			font-size: 1.85rem;
		}

		.cta-btn-container {
			flex-direction: column;
			align-items: center;
		}
	}
</style>
