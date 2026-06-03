<script lang="ts">
    export let text: string;
</script>

<div class="section-header">
    <hr />
    <h1 class="gray-gradient-text">{text}</h1>
    <hr />
</div>

<style>
    .section-header {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .section-header hr {
      width: 3.5rem;
      color: var(--gray-400)
    }

    .section-header h1 {
      font-family: LaurentianStd-It;
      font-size: 3.15rem;
    }

    @media (max-width: 768px) {
      .section-header {
        gap: 0.75rem;
        padding: 0 1rem;
      }

      .section-header hr {
        width: 2rem;
      }

      .section-header h1 {
        font-size: 2.25rem;
      }
    }

    @media (max-width: 378px) {
      .section-header hr {
        width: 1rem;
      }

      .section-header h1 {
        font-size: 1.65rem;
      }
    }
</style>