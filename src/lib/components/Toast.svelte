<script lang="ts">
    import { fly } from "svelte/transition";

    interface Props {
        visible: boolean;
        message: string;
        type?: "success" | "danger" | "info";
        duration?: number;
        onDismiss?: () => void;
    }

    let {
        visible = $bindable(false),
        message = "",
        type = "info",
        duration = 3000,
        onDismiss,
    }: Props = $props();

    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    $effect(() => {
        if (visible && duration > 0) {
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                visible = false;
                onDismiss?.();
                timeoutId = null;
            }, duration);
        }
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
                timeoutId = null;
            }
        };
    });

    const dismiss = () => {
        if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
        }
        visible = false;
        onDismiss?.();
    };
</script>

{#if visible}
    <div
        class="toast {type}"
        role="status"
        aria-live="polite"
        transition:fly={{ y: -16, duration: 250 }}
    >
        <div class="indicator" aria-hidden="true"></div>
        <p class="message">{message}</p>
        <button class="dismiss" onclick={dismiss} aria-label="Dismiss notification">×</button>
    </div>
{/if}

<style>
    .toast {
        position: fixed;
        top: 32px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        min-width: 16rem;
        max-width: 28rem;
        padding: 0.85rem 1rem;
        border-radius: 0.85rem;
        border: 0.01rem solid rgba(255, 255, 255, 0.1);
        background: rgba(28, 28, 28, 0.95);
        box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.4);
    }

    .indicator {
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
        flex-shrink: 0;
        background: var(--gray-300);
        box-shadow: 0 0 0.5rem currentColor;
    }

    .toast.success .indicator {
        color: var(--success);
        background: var(--success);
    }

    .toast.danger .indicator {
        color: var(--danger);
        background: var(--danger);
    }

    .toast.success {
        border-color: rgba(86, 231, 127, 0.35);
    }

    .toast.danger {
        border-color: rgba(255, 97, 77, 0.4);
    }

    .message {
        flex: 1;
        font-size: 0.95rem;
        font-weight: 400;
        line-height: 1.4;
    }

    .dismiss {
        flex-shrink: 0;
        width: 1.5rem;
        height: 1.5rem;
        border: none;
        background: transparent;
        color: var(--gray-300);
        font-size: 1.4rem;
        cursor: pointer;
        border-radius: 50%;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
    }

    .dismiss:hover {
        background: rgba(255, 255, 255, 0.08);
        color: var(--gray-100);
    }
</style>
