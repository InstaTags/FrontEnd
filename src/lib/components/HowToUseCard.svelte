<script lang="ts">
    let { 
        step, 
        stepTitle, 
        stepDesc,
        stepIcon,
    }: { 
        step: string; 
        stepTitle: string; 
        stepDesc: string;
        stepIcon: string;
    } = $props();
</script>

<div class="how-to-use-card">
    <div class="how-to-use-img-container">
        <img src="{stepIcon}" alt="{step}" class="how-to-use-icon">
    </div>
    
    <div class="how-to-use-step-container">
        <p class="how-to-use-step">Step {step}</p>
        <p class="how-to-use-step-title">{stepTitle}</p>
        <p class="how-to-use-step-desc">{stepDesc}</p>
    </div>
</div>

<style>
    .how-to-use-card {
        background-color: #2D2D2D80;
        display: flex;
        flex-direction: column;
        width: 350px;
        height: 350px;
        border-radius: 2rem;
    }

    .how-to-use-img-container {
        width: 100%;
        height: 450px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .how-to-use-card img {
        height: 80px;
    }

    .how-to-use-step-container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        padding: 1.5rem;
        gap: 0.4rem;
        background-color: #2D2D2D80;
        border-radius: 0 0 2rem 2rem;
    }

    .how-to-use-step {
        font-family: LaurentianStd-It;
        font-size: 1.2rem;
        line-height: 1.25;
    }

    .how-to-use-step-title {
        font-weight: 500;
        font-size: 1.025rem;
        line-height: 1.45;
    }

    .how-to-use-step-desc {
        font-weight: 300;
        font-size: 0.9rem;
        color: var(--gray-200);
        line-height: 1.65;
    }

    @media (max-width: 768px) {
        .how-to-use-card {
            width: 85vw;
            max-width: 350px;
        }
    }
</style>