<script lang="ts">
    import Header from "$lib/layout/Header.svelte";
    import Footer from "$lib/layout/Footer.svelte";
    import "$lib/style/abstracts/_index.css";
    import { fade } from "svelte/transition";
    import { page } from "$app/state";

    let { children } = $props();
</script>

<Header />

{#key page.url.pathname}
    <main class="push-under-header" in:fade>
        {@render children()}
    </main>
{/key}

<Footer />

<style>
    :root {
        --global-width: 50vw;
    }

    main {
        min-height: calc(100svh - var(--header-height));
        height: auto;
        width: var(--global-width);
        margin: 0 auto;
    }

    @media screen and (320px <= width <= 480px) and (orientation: portrait) {
        :root {
            --global-width: 90vw;
        }
    }
</style>
