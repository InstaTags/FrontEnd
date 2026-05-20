<script lang="ts">
    import { slide } from 'svelte/transition';

    export let question: string;
    export let answer: string;

    let open = false;

    function toggle() {
        open = !open;
    }
</script>

<div class="faq-container">
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="faq-question-container hidden-right" on:click={toggle}>
        <p class="faq-question">{question}</p>
        <img 
            src="/icons/plus.svg" 
            alt="+" 
            class="faq-btn {open ? 'rotated' : ''}" 
        />
    </div>

    {#if open}
        <div class="faq-answer-container" transition:slide={{ duration: 300 }}>
            <div class="vertical-line"></div>
            <p class="faq-answer">{answer}</p>
        </div>
    {/if}
</div>

<style>
    .faq-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;
    }

    .faq-question-container {
        display: flex;
        width: 50%;
        justify-content: space-between;
        align-items: center;
        padding: 0.75rem 1.5rem;
        border-radius: 1rem;
        background-color: hsla(0, 0%, 11%, 0.35);
        box-shadow: var(--general-shadow);
        transition: all 0.3s ease;
        font-size: 1.15rem;
    }

    .faq-btn {
        transform: scale(0.85);
        cursor: pointer;
        transition: transform 0.3s ease-in-out;
    }

    .faq-btn.rotated {
        transform: scale(0.85) rotate(45deg);
    }

    .faq-answer-container {
        display: flex;
        width: 45%;
        gap: 1.25rem;
    }

    .vertical-line {
        min-width: 0.15rem;
        height: auto;
        background: linear-gradient(135deg, var(--primary-400), var(--primary-600));
    }
</style>