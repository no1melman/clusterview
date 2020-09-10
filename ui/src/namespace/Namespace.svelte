<script>
  import Container from "../components/Container.svelte";
  import ActionCell from "../components/table/ActionCell.svelte";
  import Table from "../components/table/Table.svelte";

  let promise = fetch("/api/namespaces").then(
    (res) => res && res.status >= 200 && res.status < 400 && res.json()
  );

  export const router = null;
</script>

<Container>
  <h1>Namespaces</h1>
</Container>
<Container withPadding={false}>
  {#await promise}
    <p>...waiting</p>
  {:then data}
    <Table headings={['Name', 'Labels', 'Phase', 'Created']}>
      {#each data.items as item}
        <tr>
          <td>{item.metadata.name}</td>
          <td>{item.metadata.labels || ''}</td>
          <td>{item.status.phase}</td>
          <td>{item.metadata.creationTimestamp}</td>
          <ActionCell />
        </tr>
      {/each}
    </Table>
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}
</Container>
