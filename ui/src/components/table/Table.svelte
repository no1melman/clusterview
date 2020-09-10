<script>
  export let headings = [];
</script>

<style>
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 0;
  }
  th {
    text-align: left;
  }
  :global(tr):nth-child(even) {
    background-color: rgba(156, 156, 156, 0.1);
  }
  :global(td) {
    padding: 5px 10px;
  }
  thead > tr > th {
    background-color: #393e60;
    color: #fff;
    padding: 5px;
  }
</style>

<table>
  <thead>
    <tr>
      {#each headings as heading}
        <th>{heading}</th>
      {/each}
      <th />
    </tr>
  </thead>

  <tbody>
    <slot />
  </tbody>
</table>
