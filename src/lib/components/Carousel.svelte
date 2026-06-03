<script lang="ts">
    import type { Snippet } from 'svelte';
    import Siema from 'siema';

    let {
        perPage = 3,
        visibleCards = 3,
        cardWidth = '600px',
        loop = true,
        autoplay = 0,
        duration = 200,
        easing = 'ease-out',
        startIndex = 0,
        draggable = true,
        multipleDrag = true,
        dots = true,
        controls = true,
        threshold = 20,
        rtl = false,
        children,
        leftControl,
        rightControl,
    }: {
        perPage?: number | Record<string, number>;
        visibleCards?: number;
        cardWidth?: string;
        loop?: boolean;
        autoplay?: number;
        duration?: number;
        easing?: string;
        startIndex?: number;
        draggable?: boolean;
        multipleDrag?: boolean;
        dots?: boolean;
        controls?: boolean;
        threshold?: number;
        rtl?: boolean;
        children: Snippet;
        leftControl?: Snippet;
        rightControl?: Snippet;
    } = $props();

    let siema: HTMLDivElement;
    let controller: any = $state(null);
    let timer: ReturnType<typeof setInterval> | undefined;
    let currentIndex = $state(0);

    let pips = $derived(controller ? controller.innerElements : []);
    let currentStep = $derived(typeof perPage === 'number' ? perPage : 1);
    let cloneCount = $derived(Math.max(1, Math.floor(visibleCards / 2)));
    let totalDots = $derived(controller ? Math.ceil(controller.innerElements.length / currentStep) : 0);

    $effect(() => {
        const inst = new Siema({
            selector: siema,
            perPage: typeof perPage === 'object' ? perPage : cloneCount,
            loop,
            duration,
            easing,
            startIndex,
            draggable,
            multipleDrag,
            threshold,
            rtl,
            onChange: handleChange,
        });

        if (loop && cloneCount > 0 && inst.innerElements.length > 0) {
            const innerEls = inst.innerElements;
            const frame = siema.firstElementChild as HTMLElement;
            const L = innerEls.length;
            const C = cloneCount;

            for (let i = 0; i < C; i++) {
                let leftIdx = (L - C - 1 - i) % L;
                if (leftIdx < 0) leftIdx += L;
                frame.insertBefore(innerEls[leftIdx].cloneNode(true), frame.firstChild);

                let rightIdx = (C + i) % L;
                frame.appendChild(innerEls[rightIdx].cloneNode(true));
            }
        }

        controller = inst;

        if (autoplay) {
            timer = setInterval(right, autoplay);
        }

        return () => {
            if (autoplay && timer) clearInterval(timer);
            if (inst) inst.destroy();
        };
    });

    function handleChange() {
        if (controller) currentIndex = controller.currentSlide;
    }

    function isDotActive(idx: number, dotIndex: number) {
        let ci = idx;
        if (ci < 0) ci = pips.length + ci;
        return ci >= dotIndex * currentStep && ci < dotIndex * currentStep + currentStep;
    }

    function left() {
        controller?.prev(currentStep);
    }

    function right() {
        controller?.next(currentStep);
    }

    function go(index: number) {
        controller?.goTo(index);
    }

    function pause() {
        if (timer) clearInterval(timer);
    }

    function resume() {
        if (autoplay) {
            timer = setInterval(right, autoplay);
        }
    }

    function handleControlClick(action: () => void) {
        action();
        if (autoplay) {
            pause();
            resume();
        }
    }
</script>

<div class="carousel" style="--visible-cards: {visibleCards}; --card-width: {cardWidth}; --clone-count: {cloneCount};">
    <div class="carousel-viewport">
        <div class="slides" bind:this={siema}>
            {@render children()}
        </div>
        
        <div class="shadow-left"></div>
        <div class="shadow-right"></div>
    </div>

    {#if controls}
        <button class="left" onclick={() => handleControlClick(left)} aria-label="left">
            {#if leftControl}
                {@render leftControl()}
            {/if}
        </button>

        <button class="right" onclick={() => handleControlClick(right)} aria-label="right">
            {#if rightControl}
                {@render rightControl()}
            {/if}
        </button>
    {/if}

    {#if dots}
        <ul>
            {#each Array(totalDots) as _, i}
                <li class={isDotActive(currentIndex, i) ? 'active' : ''}>
                    <button
                        onclick={() => go(i * currentStep)}
                        aria-label="Go to slide {i + 1}"
                    ></button>
                </li>
            {/each}
        </ul>
    {/if}
</div>

<style>
    .carousel {
        position: relative;
        width: 100%;
        max-width: calc(var(--visible-cards, 3) * var(--card-width, 600px));
        margin: 0 auto;
    }

    .carousel-viewport {
        position: relative;
        width: 100%;
        overflow: hidden;
    }

    .slides {
    	width: calc(var(--card-width, 600px) * var(--clone-count, 1));
		margin: 0 auto;
		overflow: visible !important;
		transform: translateX(calc((var(--clone-count, 1) - 1) * var(--card-width, 600px) / 2));
    }

    .slides :global(> div) {
        display: flex !important;
        width: max-content !important;
        margin-left: calc(var(--clone-count, 1) * var(--card-width, 600px) * -1) !important;
    }

    .slides :global(> div > div) {
        width: var(--card-width, 600px) !important;
        display: flex !important;
        justify-content: center;
        align-items: center;
        padding: 0 1rem;
        box-sizing: border-box;
    }

    .shadow-left,
    .shadow-right {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 15vw;
        max-width: 250px;
        z-index: 10;
        pointer-events: none;
    }

    .shadow-left {
        left: 0;
        background: linear-gradient(to right, hsla(0, 0%, 11%, 0.6), #1c1c1c00);
    }

    .shadow-right {
        right: 0;
        background: linear-gradient(to left, hsla(0, 0%, 11%, 0.6), #1c1c1c00);
    }

    button {
        position: absolute;
        width: 40px;
        height: 40px;
        top: 50%;
        z-index: 50;
        transform: translateY(-50%);
        border: none;
        background-color: transparent;
        cursor: pointer;
        color: var(--gray-200);
		background-color: #1c1c1c80;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 999px;
    }

    button:focus {
        outline: none;
    }

    .left {
        left: 1.5vw;
    }

    .right {
        right: 1.5vw;
    }

    ul {
        list-style-type: none;
        display: flex;
        justify-content: center;
        width: 100%;
        padding: 0;
        margin-top: 1.5rem;
		gap: 1rem;
    }

    ul li {
        border-radius: 100%;
        background-color: var(--gray-500);
        height: 0.75rem;
        width: 0.75rem;
        cursor: pointer;
    }

    ul li button {
        all: unset;
        width: 100%;
        height: 100%;
        display: block;
        cursor: pointer;
    }

    ul li:hover {
        background-color: var(--gray-400);
    }

    ul li.active {
        background-color: var(--gray-300);
    }

    @media (max-width: 768px) {
        .carousel {
            --card-width: 85vw !important;
        }

        .slides {
            margin: 0;
            transform: translateX(calc((100vw - var(--card-width)) / 2));
        }

        .slides :global(> div > div) {
            padding: 0 0.5rem;
        }

        .shadow-left,
        .shadow-right {
            width: 12vw;
        }

        .left {
            left: 0.5rem;
        }

        .right {
            right: 0.5rem;
        }

        .shadow-left {
            background: linear-gradient(to right, #1c1c1c25, #1c1c1c00);
        }

        .shadow-right {
            background: linear-gradient(to left, #1c1c1c25, #1c1c1c00);
        }
    }
</style>