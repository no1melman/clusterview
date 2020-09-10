<script>
  import Container from "../components/Container.svelte";
  import Table from "../components/table/Table.svelte";
  import ActionCell from "../components/table/ActionCell.svelte";

  import { scope } from "../stores";

  let promise = new Promise((resolve, reject) => {});
  scope.subscribe((s) => {
    if (s)
      promise = fetch(`/api/${s}/deployments`).then(
        (res) => res && res.status >= 200 && res.status < 400 && res.json()
      );
  });

  export const router = null;
</script>

<Container>
  <h1>Deployments</h1>
</Container>
<Container withPadding={false}>
  {#await promise}
    <p>...waiting</p>
  {:then data}
    <Table headings={['Name', 'Labels', 'Status', 'Created']}>
      {#each data.items as item}
        <tr>
          <td>{item.metadata.name}</td>
          <td>{@html Object.keys(item.metadata.labels).map(k => `${k}=${item.metadata.labels[k]}`).join('<br />') || ''}</td>
          <td>{item.status.readyReplicas} of {item.status.replicas} ready</td>
          <td>{item.metadata.creationTimestamp}</td>
          <ActionCell />
        </tr>
      {/each}
    </Table>
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}
</Container>
