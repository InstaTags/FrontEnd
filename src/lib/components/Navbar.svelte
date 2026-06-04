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
	};

	$effect(() => {
		document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
		return () => {
			document.body.style.overflow = '';
		};
	});
</script>

<div
	class="drawer-backdrop"
	class:visible={mobileMenuOpen}
	onclick={() => (mobileMenuOpen = false)}
	aria-hidden="true"
></div>

<div class="mobile-drawer" class:open={mobileMenuOpen}>
	<nav class="drawer-nav">
		{#each navLinks as link}
			<a
				href={link.href}
				class="drawer-link"
				class:active={page.url.pathname === link.href}
				onclick={() => (mobileMenuOpen = false)}
				tabindex={mobileMenuOpen ? 0 : -1}
			>
				{link.label}
			</a>
		{/each}
	</nav>
</div>

<nav class="navbar">
	<a href="/" class="logo">InstaTags</a>

	<button
		class="mobile-toggle"
		onclick={toggleMobileMenu}
		aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
		aria-expanded={mobileMenuOpen}
	>
		<div class="bar" class:open={mobileMenuOpen}></div>
		<div class="bar" class:open={mobileMenuOpen}></div>
		<div class="bar" class:open={mobileMenuOpen}></div>
	</button>

	<div class="nav-links">
		{#each navLinks as link}
			<a
				href={link.href}
				class="nav-link"
				class:active={page.url.pathname === link.href}
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
		-webkit-backdrop-filter: blur(0.75rem);
		transition: all 0.3s ease;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.logo {
		font-family: LaurentianStd-It;
		font-size: 2.5rem;
		transition: color 0.25s ease;
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
		transition: color 0.25s ease;
		position: relative;
		text-decoration: none;
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
		transition: width 0.3s ease;
	}

	.nav-link:hover::after,
	.nav-link.active::after {
		width: 100%;
	}

	.mobile-toggle {
		display: none;
		flex-direction: column;
		gap: 0.3rem;
		background: none;
		border: none;
		padding: 0.5rem;
		cursor: pointer;
	}

	.bar {
		display: block;
		width: 1.375rem;
		height: 2px;
		background: var(--gray-100);
		border-radius: 2px;
		transition: transform 0.32s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.2s ease;
	}

	.bar.open:nth-child(1) {
		transform: translateY(0.425rem) rotate(45deg);
	}

	.bar.open:nth-child(2) {
		opacity: 0;
	}

	.bar.open:nth-child(3) {
		transform: translateY(-0.425rem) rotate(-45deg);
	}

	.drawer-backdrop {
		display: none;
	}

	.mobile-drawer {
		display: none;
	}

	@media (max-width: 768px) {
		.mobile-toggle {
			display: flex;
		}

		.navbar {
			height: 96px;
			padding: 1.5rem;
		}

		.logo {
			font-size: 1.75rem;
		}

		.nav-links {
			display: none;
		}

		.drawer-backdrop {
			display: block;
			position: fixed;
			inset: 0;
			z-index: 90;
			background: rgba(0, 0, 0, 0.45);
			backdrop-filter: blur(3px);
			-webkit-backdrop-filter: blur(3px);
			opacity: 0;
			pointer-events: none;
			transition: opacity 0.35s ease;
		}

		.drawer-backdrop.visible {
			opacity: 1;
			pointer-events: auto;
		}

		.mobile-drawer {
			display: block;
			position: fixed;
			top: 0;
			right: 0;
			bottom: 0;
			width: min(50%, 220px);
			z-index: 95;
			background: var(--gray-900);
			box-shadow: -8px 0 32px rgba(0, 0, 0, 0.5);
			transform: translateX(100%);
			visibility: hidden;
			transition:
				transform 0.38s cubic-bezier(0.32, 0.72, 0, 1),
				visibility 0s linear 0.38s;
		}

		.mobile-drawer.open {
			transform: translateX(0);
			visibility: visible;
			transition:
				transform 0.38s cubic-bezier(0.32, 0.72, 0, 1),
				visibility 0s linear 0s;
		}

		.drawer-nav {
			display: flex;
			flex-direction: column;
			padding: calc(96px + 1rem) 2.5rem 2rem;
		}

		.drawer-link {
			display: block;
			font-size: 1.05rem;
			font-weight: 400;
			color: var(--gray-400);
			padding: 1.25rem 0;
			border-bottom: 1px solid rgba(255, 255, 255, 0.05);
			text-decoration: none;
			transition: color 0.2s ease;
		}

		.drawer-link:last-child {
			border-bottom: none;
		}

		.drawer-link:hover {
			color: var(--gray-200);
		}

		.drawer-link.active {
			color: var(--gray-100);
			font-weight: 500;
		}
	}

	@media (max-width: 420px) {
		.mobile-drawer {
			width: 60%;
		}
	}
</style>
