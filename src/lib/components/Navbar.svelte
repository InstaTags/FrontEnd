<script lang="ts">
	import { page } from '$app/state';

	let mobileMenuOpen = $state(false);

	const navLinks = [
		{ href: '/upload', label: 'Upload' },
		{ href: '/how-to-use', label: 'How To Use' },
		{ href: '/about-us', label: 'About Us' }
	];

	const toggleMobileMenu = () => {
		mobileMenuOpen = !mobileMenuOpen;
	}
</script>

<nav class="navbar" class:show={mobileMenuOpen}>
	<a href="/" class="logo">InstaTags</a>

	<button class="mobile-toggle" onclick={toggleMobileMenu} aria-label="Toggle menu">
		<div class="bar" class:open={mobileMenuOpen}></div>
		<div class="bar" class:open={mobileMenuOpen}></div>
		<div class="bar" class:open={mobileMenuOpen}></div>
	</button>

	<div class="nav-links" class:show={mobileMenuOpen}>
		{#each navLinks as link}
			<a
				href={link.href}
				class="nav-link"
				class:active={page.url.pathname === link.href}
				onclick={() => (mobileMenuOpen = false)}
			>
				{link.label}
			</a>
		{/each}
	</div>
</nav>

<style>
	.navbar {
		height: 112px;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 100;
		padding: 1.5rem 4rem;
		backdrop-filter: blur(0.75rem);
		transition: all 0.3s ease;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.logo {
		font-family: LaurentianStd-It;
		font-size: 2.5rem;
		transition: all 0.3s ease;
	}

	.logo:hover {
		color: var(--primary-400);
	}

	.nav-links {
		display: flex;
		list-style: none;
		gap: 2rem;
		align-items: center;
	}

	.nav-link {
		font-size: 1.2rem;
		font-weight: 400;
		color: var(--gray-300);
		transition: all 0.3s ease;
		position: relative;
	}

	.nav-link:hover,
	.nav-link.active {
		color: var(--gray-100);
	}

	.nav-link::after {
		content: '';
		position: absolute;
		bottom: -0.25rem;
		left: 0;
		width: 0;
		height: 0.1rem;
		background: linear-gradient(135deg, var(--primary-400), var(--primary-600));
		transition: all 0.3s ease;
	}

	.nav-link:hover::after,
	.nav-link.active::after {
		width: 100%;
	}

	.mobile-toggle {
		display: none;
		flex-direction: column;
		gap: 0.25rem;
		background: none;
		border: none;
		padding: 0.25rem;
	}

	.bar {
		display: block;
		width: 1.5rem;
		height: 0.1rem;
		background: var(--gray-100);
		transition: all 0.3s ease;
		border-radius: 0.01rem;
	}

	.bar.open:nth-child(1) {
		transform: rotate(45deg) translate(0.25rem, 0.25rem);
	}

	.bar.open:nth-child(2) {
		opacity: 0;
	}

	.bar.open:nth-child(3) {
		transform: rotate(-45deg) translate(0.25rem, -0.25rem);
	}

	@media (max-width: 768px) {
		.mobile-toggle {
			display: flex;
		}

		.navbar {
			height: 96px;
		}

		.navbar.show {
			background-color: #1c1c1c80;
		}

		.logo {
			font-size: 1.75rem;
		}

		.nav-links {
			padding: 1rem !important;
			margin-top: 96px;
			position: fixed;
			top: 0;
			right: 100%;
			width: 40%;
			height: 100vh;
			flex-direction: column;
			background-color: #1c1c1c80;
			padding: 5rem 2rem;
			gap: 1.5rem;
		}

		.nav-links.show {
			right: 0;
		}
	}
</style>
