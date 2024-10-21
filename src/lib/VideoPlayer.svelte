<script>
    import 'vidstack/bundle';
    let { src } = $props();
</script>

<media-player {src}>
  <media-provider></media-provider>
  <media-video-layout></media-video-layout>
</media-player>