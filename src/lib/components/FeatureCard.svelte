<script lang="ts">
    let {
        img,
        title,
        desc,
        imgRight = false
    }: {
        img: string,
        title: string,
        desc: string,
        imgRight?: boolean
    } = $props();

    let isMobile = $state(false);

    $effect(() => {
        const mq = window.matchMedia('(max-width: 768px)');
        const update = () => (isMobile = mq.matches);
        update();
        mq.addEventListener('change', update);
        return () => mq.removeEventListener('change', update);
    });
</script>

<div class="feature-card">
    {#if isMobile}
        <p class="feature-card-title">{title}</p>
        <img src={img} alt="feature-card-img" class="feature-card-img">
        <p class="feature-card-desc">{desc}</p>
    {:else if imgRight}
        <div class="feature-card-text-container">
            <p class="feature-card-title">{title}</p>
            <p class="feature-card-desc">{desc}</p>
        </div>
        <img src={img} alt="feature-card-img" class="feature-card-img">
    {:else}
        <img src={img} alt="feature-card-img" class="feature-card-img">
        <div class="feature-card-text-container">
            <p class="feature-card-title">{title}</p>
            <p class="feature-card-desc">{desc}</p>
        </div>
    {/if}
</div>

<style>
    .feature-card {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 2.5rem;
        width: 60%;
        max-width: 60rem;
        min-height: 20rem;
        border: 1px solid var(--gray-700);
        background: linear-gradient(135deg, #36363660, #1c1c1c60);
        padding: 2.25rem 3rem;
        border-radius: 1.5rem;
        transition:
            border-color 0.4s ease,
            transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .feature-card:hover {
        border-color: var(--gray-500);
        transform: translateY(-0.25rem);
    }

    .feature-card img {
        height: 16rem;
        width: auto;
        max-width: 45%;
        object-fit: contain;
        filter: saturate(0) contrast(1.05) opacity(0.6);
        border-radius: 0.75rem;
        transition:
            filter 0.5s ease,
            transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .feature-card:hover img {
        filter: saturate(1) contrast(1.02) opacity(1);
        transform: scale(1.02);
    }

    .feature-card-text-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex: 1;
        gap: 1.25rem;
    }

    .feature-card-title {
        font-family: LaurentianStd-It;
        font-size: 2.5rem;
        line-height: 1.1;
        background: linear-gradient(
            135deg,
            var(--white),
            var(--gray-100) 15%,
            var(--gray-200) 30%,
            var(--gray-300) 50%,
            var(--gray-400) 80%,
            var(--gray-500) 95%,
            var(--gray-600) 98%,
            var(--gray-800)
        );
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .feature-card-desc {
        font-size: 1.1rem;
        line-height: 1.6;
        color: var(--gray-300);
    }

    @media (max-width: 768px) {
        .feature-card {
            width: 50%;
            flex-direction: column;
            text-align: center;
            gap: 1.75rem;
            padding: 2rem 1.75rem;
            min-height: 0;
        }

        .feature-card img {
            height: auto;
            max-height: 12rem;
            max-width: 80%;
        }

        .feature-card-title {
            font-size: 2rem;
        }
    }

    @media (max-width: 420px) {
        .feature-card {
            width: 80%;
            padding: 1.5rem 1.25rem;
        }

        .feature-card-title {
            font-size: 1.65rem;
        }

        .feature-card-desc {
            font-size: 1rem;
        }
    }
</style>