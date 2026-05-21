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
</script>

<div class="feature-card">
    {#if imgRight}
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
        height: 50vh;
        width: 60%;
        border: 0.01rem solid var(--gray-700);
        background: linear-gradient(135deg, #36363660, #1c1c1c60);
        padding: 1rem 3rem;
        border-radius: 1.5rem;
    }

    .feature-card img {
        height: 80%;
        filter: saturate(0) contrast(1.05) opacity(0.6);
        border-radius: 0.75rem;
    }

    .feature-card-text-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 50%;
        height: 100%;
        gap: 1.5rem;
    }

    .feature-card-title {
        font-family: LaurentianStd-It;
        font-size: 2.5rem;
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
        font-size: 1.15rem;
        line-height: 1.6rem;
        color: var(--gray-300)
    }
</style>