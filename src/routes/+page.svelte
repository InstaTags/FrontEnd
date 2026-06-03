<script lang="ts">
	import FeatureCard from './../lib/components/FeatureCard.svelte';
	import SectionHeader from "$lib/components/SectionHeader.svelte";
	import TestimonialCard from "$lib/components/TestimonialCard.svelte";
	import Carousel from "$lib/components/Carousel.svelte";
	import FaqContainer from "$lib/components/FaqContainer.svelte";

	const features = [
		{
			img : "/features/1.png",
			title: "Instant Generation",
			desc: "Upload your image and generate relevant hashtags in seconds. No research, no guesswork, just fast and optimized results.",
		},
		{
			img : "/features/2.png",
			title: "Smart & Relevant",
			desc: "Our system analyzes your content to provide hashtags tailored to your niche, helping improve visibility and engagement.",
		},
		{
			img : "/features/3.png",
			title: "Focus on Creativity",
			desc: "Spend less time thinking about tags and more time creating content that connects with your audience. We handle the optimization so you can stay in your creative flow.",
		},
	]

	const testimonials = [
		{
			quote: "InstaTags completely changed how I handle my posts. What used to take minutes now takes seconds. It's simple, fast, and incredibly reliable.",
			name: "Elon Musk",
			title: "CEO of Tesla and SpaceX",
		},
		{
			quote: "I was surprised at how intuitive it is. No learning curve, no confusion — just instant results. Highly recommended!",
			name: "Jensen Huang",
			title: "Co-founder and CEO of NVIDIA",
		},
		{
			quote: "This tool is a game-changer. It's fast, smart, and makes hashtagging feel seamless. I can't imagine going back to doing it manually.",
			name: "Mary Barra",
			title: "Chair and CEO of General Motors",
		},
		{
			quote: "As someone who values efficiency, InstaTags delivers exactly that. It saves me time and keeps my content optimized without any hassle.",
			name: "Sundar Pichai",
			title: "CEO of Google and Alphabet Inc.",
		},
		{
			quote: "I love how effortless everything feels. The interface is clean, and generating hashtags is instant. It's become part of my daily workflow.",
			name: "Satya Nadella",
			title: "Chairman and CEO of Microsoft",
		},
	];
</script>

<section class="hero">
	<div class="hero-inner-container">
		<h1 class="hero-header gray-gradient-text">
			Save time on tags. <br/>
			Spend it on content.
		</h1>
		<p class="hero-desc">
			InstaTags instantly generates relevant hashtags from your image, so you can stop researching and focus on creating.
		</p>
		<div class="hero-btn-container">
			<a href="/upload" class="primary-btn">Try Now</a>
			<a href="/thank-you" class="outline-btn">Install for Chrome</a>
		</div>
	</div>

	<img src="/hero/hero-hashtag.png" alt="#">
</section>

<section class="features">
	<SectionHeader text="Everything You Need to Tag Smarter" />

	<div class="features-card-container">
		{#each features as feature, i}
			<FeatureCard
				img={feature.img}
				title={feature.title}
				desc={feature.desc}
				imgRight={i % 2 === 1}
			/>
		{/each}
	</div>

</section>

<section class="testimonials">
	<SectionHeader text="Trusted by Industry Leaders" />
	<div class="carousel-container">
		<Carousel 
			perPage={1} 
			loop={true} 
			autoplay={5000} 
			dots={true} 
			controls={true} 
			duration={300}
			cardWidth="550px"
		>
			{#each testimonials as testimonial}
				<TestimonialCard
					quote={testimonial.quote}
					name={testimonial.name}
					title={testimonial.title}
				/>
			{/each}

			{#snippet leftControl()}
				<img src="/icons/left-arrow.svg" alt="<">
			{/snippet}

			{#snippet rightControl()}
				<img src="/icons/right-arrow.svg" alt=">">
			{/snippet}
		</Carousel>
	</div>
</section>

<section class="faq">
	<SectionHeader text="Frequently Asked Questions" />
	<div class="faq-containers-container">
		<FaqContainer 
			question="Is Instatags really free?"
			answer='
				Yes! We are an open-source project built by a community of creators. There are no subscriptions, no hidden fees, and no "premium" tiers. Just free tools for everyone.
			'
		/>
		<FaqContainer 
			question="How do I generate tags?"
			answer="
				It's easy: either upload an image directly to our web app or use our browser extension to right-click and analyze any image you see while surfing the web.
			"
		/>
		<FaqContainer 
			question="Do I need to create an account?"
			answer="
				Nope. You can start generating hashtags immediately without giving us your email or creating a password. We value your time as much as your creativity.
			"
		/>
		<FaqContainer 
			question="How does the AI choose the hashtags?"
			answer="
				Our AI analyzes the objects, mood, and context of your photo to suggest a mix of trending and niche tags designed to boost your reach and engagement on Instagram.
			"
		/>
		<FaqContainer 
			question="Is my data safe?"
			answer="
				Absolutely. Because we are open-source, our code is transparent. We don't store your images or sell your data. We're here to help you grow, not to track you.
			"
		/>
	</div>
</section>

<style>
	section {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		gap: 2rem;
		padding: 5rem 0rem;
	}

	.hero {
		position: relative;
		height: 100vh;
		padding-top: 112px;
		background:
			linear-gradient(#67E5F300 83%, #68e5f31a),
			radial-gradient(ellipse 75% 130% at 50% 100%, hsla(186, 85%, 68%, 0.2), transparent 60%),
			radial-gradient(ellipse 60% 75% at 50% 100%, hsla(42, 100%, 85%, 0.15), transparent 50%),
			radial-gradient(ellipse 20% 30% at 50% 100%, hsla(57, 100%, 71%, 0.05), transparent 70%)
		;
	}

	.hero img {
		position: absolute;
		top: 50%;
		left: 50%;
		translate: -50% -50%;
		z-index: -1;
		opacity: 0.075;
		scale: 1.45;
	}

	.hero-inner-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1.5rem;
		text-align: center;
	}

	.hero-header {
		font-family: LaurentianStd-It;
		font-size: 3.5rem;
		line-height: 1.06;
		letter-spacing: -0.01em;
	}

	.hero-desc {
		font-size: 1.25rem;
		font-weight: 400;
		width: 45%;
		line-height: 1.6;
		color: var(--gray-200);
	}

	.hero-btn-container {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.features {
		padding: 7rem 0;
		gap: 3rem;
		background:
			linear-gradient(#67E5F31a, #67E5F300 17%),
			radial-gradient(ellipse 75% 60% at 50% 0%, hsla(186, 85%, 68%, 0.2), transparent 60%),
			radial-gradient(ellipse 60% 35% at 50% 0%, hsla(42, 100%, 85%, 0.15), transparent 50%),
			radial-gradient(ellipse 20% 10% at 50% 0%, hsla(57, 100%, 71%, 0.05), transparent 70%),
			linear-gradient(#3A4E7200 83%, #3A4E7226)
		;
	}

	.features-card-container {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 3rem;
	}

	.hero-header,
	.hero-desc,
	.hero-btn-container {
		animation: rise 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
	}

	.hero-header { 
		animation-delay: 0.08s; 
	}

	.hero-desc { 
		animation-delay: 0.16s; 
	}

	.hero-btn-container { 
		animation-delay: 0.24s; 
	}

	.testimonials {
		padding: 7rem 0;
		background-color: #3A4E7226;
	}

	.faq {
		padding: 7rem 0;
		justify-content: flex-start;
		background: linear-gradient(#3A4E7226, #3A4E7200 17%);
	}

	.faq-containers-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		gap: 1.5rem;
	}

	.carousel-container {
		width: 100%;
		max-width: 100vw;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	@media (max-width: 768px) {
		section {
			padding: 4rem 0;
			gap: 1.5rem;
		}

		.hero {
			height: auto;
			min-height: 100dvh;
			padding: 6rem 1.5rem 4rem;
			overflow: hidden;
		}

		.hero-inner-container {
			width: 100%;
		}

		.hero-header {
			font-size: 2.25rem;
		}

		.hero-desc {
			width: 90%;
			max-width: 36rem;
			font-size: 1.05rem;
		}

		.hero-btn-container {
			flex-wrap: wrap;
			justify-content: center;
		}

		.features {
			padding: 5rem 0;
			gap: 2.5rem;
		}

		.features-card-container {
			gap: 2rem;
		}

		.testimonials,
		.faq {
			padding: 5rem 0;
		}
	}

	@media (max-width: 378px) {
		.hero-header {
			font-size: 2rem;
		}

		.hero-desc {
			font-size: 1rem;
		}

		.hero-btn-container {
			flex-direction: column;
			align-items: center;
		}

		.hero img {
			scale: 1.1;
		}
	}
</style>
