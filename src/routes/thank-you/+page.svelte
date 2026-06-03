<script lang="ts">
	
</script>

<section class="thank-you">
    <h1 class="hero-header gray-gradient-text">
        Thank You <br/>
        For Joining Us
    </h1>
    <div class="hero-btn-container">
        <a href="/how-to-use" class="primary-btn">Learn How to Use</a>
        <a href="https://github.com/BryanWidjaja" class="outline-btn">Support Us</a>
    </div>
</section>

<style>
	.thank-you {
        width: 100%;
		height: 100vh;
		display: flex;
        flex-direction: column;
		align-items: center;
		justify-content: center;
        padding: 5rem 0rem;
		padding-top: 112px;
        gap: 1rem;
        text-align: center;
	}

	.hero-header {
		font-family: LaurentianStd-It;
		font-size: 3.5rem;
	}

	.hero-btn-container {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	@media (max-width: 768px) {
		.thank-you {
			padding: 7rem 1.5rem 4rem;
		}

		.hero-header {
			font-size: 2.25rem;
		}

		.hero-btn-container {
			flex-wrap: wrap;
			justify-content: center;
		}
	}

	@media (max-width: 378px) {
		.hero-header {
			font-size: 2rem;
		}

		.hero-btn-container {
			flex-direction: column;
			width: 100%;
		}

		.hero-btn-container a {
			width: 100%;
			justify-content: center;
		}
	}
</style>
