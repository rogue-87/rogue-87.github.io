<script lang="ts">
	interface Link {
		url: string;
		name: string;
		iconPath: string;
		bgColor?: string;
	}

	let { url, name, iconPath, bgColor }: Link = $props();
</script>

<a href={url}>
	<div class="card" style:background-color={bgColor}>
		 <img src={iconPath} style:cursor="pointer" alt={name} title={name} />

	</div>
</a>
