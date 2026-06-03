<script lang="ts">
    let { 
        quote, 
        name, 
        title 
    }: { 
        quote: string; 
        name: string; 
        title: string 
    } = $props();
</script>

<div class="testimonial-card">
    <div class="quote-container">
        <img src="/icons/quote.svg" alt='"'>
        <p class="quote">{quote}</p>
    </div>

    <div class="person-container">
        <img src="/icons/profile.svg" alt="Profile">
        <div class="person-inner-container">
            <p class="person-name">{name}</p>
            <p class="person-title">{title}</p>
        </div>
    </div>
</div>

<style>
    .testimonial-card {
        background-color: hsla(0, 0%, 11%, 0.35);
        display: flex;
        flex-direction: column;
        padding: 1.7rem;
        gap: 1.7rem;
        width: 467px;
        height: 319px;
        border-radius: 1.7rem;
    }

    .quote-container {
        background-color: rgba(45, 45, 45, 0.15);
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 1.06rem;
        width: 100%;
        height: 196px;
        box-shadow: var(--general-shadow);
        gap: 1.06rem;
        border-radius: 1.06rem;
    }

    .quote-container img {
        width: 34px;
    }

    .quote {
        font-size: 0.935rem;
        font-weight: 400;
        line-height: 1.65;
    }

    .person-container {
        display: flex;
        gap: 0.85rem;
        align-items: center;
    }

    .person-inner-container {
        display: flex;
        flex-direction: column;
        gap: 0.2rem;
    }

    .person-name {
        font-size: 1.49rem;
        font-family: LaurentianStd-It;
        line-height: 1.2;
    }

    .person-title {
        font-size: 0.85rem;
        color: var(--gray-200);
        font-weight: 300;
        line-height: 1.5;
    }

    @media (max-width: 768px) {
        .testimonial-card {
            width: 85vw;
            max-width: 467px;
            height: auto;
        }

        .quote-container {
            height: auto;
            min-height: 160px;
        }
    }

    @media (max-width: 378px) {
        .testimonial-card {
            padding: 1.25rem;
            gap: 1.25rem;
        }

        .quote {
            font-size: 0.9rem;
        }

        .person-name {
            font-size: 1.3rem;
        }
    }
</style>