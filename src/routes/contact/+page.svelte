<script>
    import Socials from "./Socials.svelte";
</script>

<svelte:head>
    <title>contact</title>
</svelte:head>

<div class="contacts">
    <Socials />
</div>

<style>
    .contacts {
        display: flex;
        justify-content: center;
        align-items: center;
        width: var(--global-width);
        min-height: calc(100dvh - var(--header-height));
    }

    @media screen and (240px <= width <= 980px) and (orientation: landscape) {
        .contacts {
            padding: 48px 0;
        }
    }
</style>
