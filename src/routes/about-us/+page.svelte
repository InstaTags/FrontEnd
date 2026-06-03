<script lang="ts">
	import SectionHeader from "$lib/components/SectionHeader.svelte";
</script>

<section id="about-us">
	<div class="about-us-header-desc-container">
		<SectionHeader text="About Us" />
		<p class="about-us-desc">
			We are a group of passionate developers who strive for simplicity and efficiency in our daily tasks. With InstaTags, our goal is to make hashtagging effortless and instant.
		</p>
	</div>

	<div class="about-us-stats-container">
		<div class="about-us-stat">
			<p class="about-us-stat-number">
				10k+
			</p>
			<p class="about-us-stat-desc">
				Tags Generated
			</p>
		</div>
		<div class="about-us-stat">
			<p class="about-us-stat-number">
				1
			</p>
			<p class="about-us-stat-desc">
				Goal
			</p>
		</div>
		<div class="about-us-stat">
			<p class="about-us-stat-number">
				1k+
			</p>
			<p class="about-us-stat-desc">
				Posts Tagged
			</p>
		</div>
	</div>
</section>

<section id="ourvision">
	<SectionHeader text="Our Vision" />
	<p class="about-us-desc">
		Our vision is to redefine the way people create and share content by making hashtag generation seamless, intelligent, and instant. We aim to empower creators, brands, and businesses with tools that simplify their workflow, maximize their reach, and unlock their full digital potential.
	</p>
</section>

<section id="ourmission">
	<SectionHeader text="Our Mission" />
	<p class="about-us-desc">
		Our mission is to simplify the content creation process by providing fast, intelligent, and reliable hashtag generation tools. We strive to help creators, brands, and businesses save time, increase visibility, and focus on what truly matters: creating impactful content.
	</p>
</section>

<style>
	#about-us {
		background:
			linear-gradient(#2A2E4F80, #15181D00),
			linear-gradient(#1F283500 83%, #1F2835),
			linear-gradient(#0E1012CC, #0E1012CC),
			url("/about-us/about-us-hero-bg.png")
		;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		height: 100vh;
		padding-top: 192px;
		padding-bottom: 80px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
	}

	.about-us-header-desc-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.about-us-desc {
		width: 45%;
		text-align: center;
		font-weight: 300;
		font-size: 1.2rem;
	}

	.about-us-stats-container {
		display: flex;
		gap: 3rem;
	}

	.about-us-stat {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.about-us-stat-number {
		font-weight: 600;
		font-size: 1.65rem;
	}

	.about-us-stat-desc {
		font-weight: 300;
		font-size: 1.1rem;
	}

	#ourvision, #ourmission {
		height: 80vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	#ourvision {
		background: 
			linear-gradient(rgba(31, 40, 53, 0.65), rgba(31, 40, 53, 0.65))
		;
	}

	#ourmission {
		background: linear-gradient(#1F2835, #1F283500 17%);
	}

	@media (max-width: 768px) {
		#about-us {
			height: auto;
			min-height: 100vh;
			padding: 8rem 1.5rem 4rem;
			gap: 3rem;
		}

		.about-us-header-desc-container {
			width: 100%;
			align-items: center;
		}

		.about-us-desc {
			width: 90%;
			max-width: 36rem;
			font-size: 1.05rem;
		}

		.about-us-stats-container {
			width: 100%;
			justify-content: space-evenly;
			gap: 0;
		}

		#ourvision,
		#ourmission {
			height: auto;
			min-height: 70vh;
			padding: 4rem 1.5rem;
		}
	}

	@media (max-width: 378px) {
		#about-us {
			padding-top: 7rem;
		}

		.about-us-stat-number {
			font-size: 1.2rem;
		}

		.about-us-stat-desc {
			font-size: 0.8rem;
		}
	}
</style>
