<script>
    import { presenceData } from "../../stores/websocket.svelte";
    let isMarquee = $state();
    $effect(() => {
        isMarquee = $presenceData.spotify?.song && $presenceData.spotify.song.length > 20;
    });
</script>

<div class="spotify">
    {#if $presenceData.spotify}
        <div class="album">
            <!-- kind of a hacksy way, but I don't care! -->
            <svg
                style="background-image: url({$presenceData.spotify.album_art_url});"
                xmlns="http://www.w3.org/2000/svg"
                width="2.25rem"
                height="2.25rem"
                viewBox="0 0 24 24"
            >
            </svg>
        </div>
        <div class="song-info">
            <div class="song">
                <a href="https://open.spotify.com/track/{$presenceData.spotify.track_id}">
                    {$presenceData.spotify.song}
                </a>
            </div>
            <div class="artist">
                <div class={isMarquee ? "marquee" : ""}>
                    <div>{$presenceData.spotify.artist.replaceAll(";", ",")}</div>
                </div>
            </div>
        </div>
    {:else}
        <div class="album">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2.25rem"
                height="2.25rem"
                viewBox="0 0 24 24"
                ><g
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    color="currentColor"
                    ><circle cx="12" cy="12" r="10" /><path
                        d="M7.5 12.069c1.1-.37 2.276-.569 3.5-.569c2.024 0 3.92.547 5.549 1.5M18 10c-1.85-1.262-4.088-2-6.5-2c-1.597 0-3.118.324-4.5.908M15.129 16a9.04 9.04 0 0 0-6.497-.685"
                    /></g
                ></svg
            >
        </div>
        <div class="song-info">
            <div class="song">not listening to anything...</div>
        </div>
    {/if}
</div>

<style>
    .spotify {
        display: flex;
        background-color: var(--bg-primary-dark);
        height: 80px;
        border-radius: 16px;
    }

    .album {
        display: flex;
        align-items: center;

        & > svg {
            border-radius: 16px;
            padding: 32px;
            background-color: var(--bg-primary-light);
            background-size: cover;
            background-position: center;
        }
    }

    .song-info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 8px;
        overflow-x: hidden;
        width: 100%;
    }

    .song {
        overflow-x: hidden;
        & > a {
            display: inline-block;
            width: max-content;
        }
    }

    @media (prefers-reduced-motion: reduce) {
        .marquee div {
            animation-iteration-count: 1;
            animation-duration: 0.01;
            width: auto;
            padding-left: 0;
        }
    }

    @media screen and (320px <= width <= 1080px) {
        .marquee {
            overflow-x: hidden;
        }

        .marquee > * {
            display: inline-block;
            width: max-content;

            padding-left: 100%;
            /* show the marquee just outside the paragraph */
            will-change: transform;
            animation: marquee 12s linear infinite;

            &:hover {
                animation-play-state: paused;
            }
        }

        @keyframes marquee {
            0% {
                transform: translate(-100%, 0);
            }
            100% {
                transform: translate(0, 0);
            }
        }
    }
</style>
