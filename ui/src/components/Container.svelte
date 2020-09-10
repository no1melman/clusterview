<style>
  .container {
    background-color: #f0f1f5;
    padding: var(--theme-padding);
    border-radius: 6px;
    margin: 10px 0;
    -webkit-box-shadow: 0px 0px 25px -4px rgba(105, 105, 105, 0.3);
    -moz-box-shadow: 0px 0px 25px -4px rgba(105, 105, 105, 0.3);
    box-shadow: 0px 0px 25px -4px rgba(105, 105, 105, 0.3);
  }
</style>

<script>
  export let withPadding = true;

  let padding = withPadding ? '8px 16px' : '0'

</script>

<div class="container" style="--theme-padding: {padding}">
  <slot />
</div>
