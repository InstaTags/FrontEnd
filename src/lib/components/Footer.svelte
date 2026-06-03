<script lang="ts">

</script>

<footer class="footer">
	<div class="footer-logo-tagline-container footer-container">
		<p class="logo">
			InstaTags
		</p>
		<p class="tagline">
			Tags Instantly With InstaTags
		</p>
	</div>

	<div class="footer-links-container footer-container">
		<div class="footer-links-columns-container">
			<div class="footer-links-column">
				<p class="footer-link-header">Get InstaTags</p>
				<a href="/" class="footer-link">InstaTags for Chrome</a>
			</div>
			<div class="footer-links-column">
				<p class="footer-link-header">Features</p>
				<a href="/upload" class="footer-link">HashTag Generator</a>
			</div>
			<div class="footer-links-column">
				<p class="footer-link-header">Company</p>
				<a href="/about-us#aboutus" class="footer-link">About Us</a>
				<a href="/about-us#ourvision" class="footer-link">Our Vision</a>
				<a href="/about-us#ourmission" class="footer-link">Our Mission</a>
			</div>
			<div class="footer-links-column">
				<p class="footer-link-header">Contacts</p>
				<a href="https://github.com/BryanWidjaja" class="footer-link footer-contact-container">
					<img src="/icons/email.svg" alt="Email" class="contact-img">
					<p>info@instatags.com</p>
				</a>
				<a href="https://github.com/BryanWidjaja" class="footer-link footer-contact-container">
					<img src="/icons/phone.svg" alt="Phone" class="contact-img">
					<p>+62 8957 0131 6601</p>
				</a>
				<a href="https://github.com/BryanWidjaja" class="footer-link footer-contact-container">
					<img src="/icons/location.svg" alt="Location" class="contact-img">
					<p>Banten, Indonesia</p>
				</a>
			</div>
		</div>

		<div class="footer-socials-container">
			<a href="https://github.com/BryanWidjaja" class="footer-social">
				<img src="/icons/instagram.svg" alt="">
			</a>
			<a href="https://github.com/BryanWidjaja" class="footer-social">
				<img src="/icons/facebook.svg" alt="">
			</a>
			<a href="https://github.com/BryanWidjaja" class="footer-social">
				<img src="/icons/twitter.svg" alt="">
			</a>
			<a href="https://github.com/BryanWidjaja" class="footer-social">
				<img src="/icons/tiktok.svg" alt="">
			</a>
		</div>
	</div>

	<div class="footer-copyright-terms-container footer-container">
		<p class="copyright">
			© 2026 InstaTags. All rights reserved.
		</p>

		<div class="footer-terms-container">
			<a href="https://github.com/BryanWidjaja" class="footer-term-link">
				Terms & Conditions
			</a>
			<a href="https://github.com/BryanWidjaja" class="footer-term-link">
				Privacy Policy
			</a>
			<a href="https://github.com/BryanWidjaja" class="footer-term-link">
				Cookies
			</a>
		</div>
	</div>
</footer>

<style>
	.footer {
		background-color: var(--gray-900);
		height: 480px;
		display: flex;
		flex-direction: column;
		padding-top: 3rem;
		gap: 1.5rem;
		font-size: 1.05rem;
		font-weight: 300;
	}

	.footer a {
		transition: all 0.3s ease;
	}

	.footer a:hover {
		/* text-decoration: underline; */
		color: var(--primary-400)
	}

	.footer-container {
		display: flex;
		justify-content: space-between;
		padding: 0 4rem;
	}

	.logo {
		font-size: 2.25rem;
		font-family: LaurentianStd-It;
	}

	.tagline {
		font-size: 1.225rem;
	}

	.footer-links-container {
		height: 100%;
	}

	.footer-links-columns-container {
		display: flex;
		gap: 3rem;
	}

	.footer-links-column {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.footer-contact-container {
		display: flex;
		align-items: center;
	}

	.footer-link-header {
		font-weight: 500;
		font-size: 1.2rem;
	}

	.footer-socials-container {
		display: flex;
	}

	.footer-social img {
		transform: scale(0.9);
		transition: all 0.3s ease;
	}

	.footer-social img:hover {
		filter: brightness(1.25);
		transform: scale(0.9) translateY(-0.1rem);
	}

	.footer-logo-tagline-container, .footer-copyright-terms-container {
		padding: 1.5rem 4rem;
		align-items: center;
	}

	.footer-copyright-terms-container {
		font-size: 1rem;
	}

	.footer-terms-container {
		display: flex;
		gap: 1.5rem;
	}

	@media (max-width: 768px) {
		.footer {
			height: auto;
			padding-bottom: 2rem;
			gap: 1.5rem;
		}

		.footer-container {
			padding: 0 2rem;
		}

		.footer-logo-tagline-container,
		.footer-copyright-terms-container {
			padding: 1.5rem 2rem;
			align-items: center;
		}

		.footer-links-container {
			flex-direction: column;
			gap: 1.5rem;
			padding: 1.5rem 2rem;
		}

		.footer-links-columns-container {
			justify-content: space-between;
			flex-wrap: nowrap;
			gap: 1rem;
		}

		.footer-socials-container {
			justify-content: flex-start;
		}
	}

	@media (max-width: 378px) {
		.logo {
			font-size: 1.9rem;
		}

		.footer-logo-tagline-container {
			flex-direction: column;
			align-items: center;
			text-align: center;
			gap: 0.375rem;
			padding: 1.25rem 1.5rem;
		}

		.footer-copyright-terms-container {
			flex-direction: column;
			align-items: center;
			text-align: center;
			gap: 0.5rem;
			padding: 1rem 1.5rem;
		}

		.footer-links-container {
			padding: 1.25rem 1.5rem;
			gap: 1.25rem;
		}

		.footer-links-columns-container {
			flex-direction: column;
			gap: 2rem;
		}

		.footer-links-column {
			width: 100%;
			align-items: center;
			text-align: center;
		}

		.footer-contact-container {
			justify-content: center;
		}

		.footer-socials-container {
			justify-content: center;
		}

		.footer-terms-container {
			flex-direction: column;
			align-items: center;
			gap: 0.5rem;
		}
	}
</style>
