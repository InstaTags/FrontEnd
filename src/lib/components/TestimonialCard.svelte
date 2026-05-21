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
        padding: 2rem;
        gap: 2rem;
        width: 550px;
        height: 375px;
        border-radius: 2rem;
    }

    .quote-container {
        background-color: rgba(45, 45, 45, 0.15);
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 1.25rem;
        width: 100%;
        height: 230px;
        box-shadow: var(--general-shadow);
        gap: 1.25rem;
        border-radius: 1.25rem;
    }

    .quote-container img {
        width: 40px;
    }

    .quote {
        font-size: 1.1rem;
        font-weight: 400;
    }

    .person-container {
        display: flex;
        gap: 1rem;
        align-items: center;
    }

    .person-inner-container {
        display: flex;
        flex-direction: column;
    }

    .person-name {
        font-size: 1.75rem;
        font-family: LaurentianStd-It;
    }

    .person-title {
        font-size: 1rem;
        color: var(--gray-200);
        font-weight: 300;
    }
</style>