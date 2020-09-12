<script>
  import { scope } from './stores'

  const promise = fetch("/api/namespaces").then(
    (res) => res && res.status >= 200 && res.status < 400 && res.json()
  );

  promise.then(data => scope.update(() => data.items[0].metadata.name))

  const handleSelect = (e) => {
    const val = e.target.value
    scope.update(() => val)
  };
</script>

<style>
  .topbar {
    padding: 8px 16px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    background-color: #f0f1f5;
    display: flex;
    height: 30px;
  }

  .searchcontainer {
    display: flex;
    align-items: stretch;
    margin: 0 20px 0 0;
  }
  .searchcontainer > div {
    padding: 5px;
  }

  input {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    outline: none;
    border: 1px solid #fff;
    border-right: 0;
    padding: 8px 12px;
    margin: 0;
  }
  button {
    outline: none;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    border-style: solid;
    background-color: #727cf5;
    border-color: #727cf5;
    -webkit-box-shadow: 0 2px 6px 0 rgba(114, 124, 245, 0.5);
    box-shadow: 0 2px 6px 0 rgba(114, 124, 245, 0.5);
    color: #fff;
    vertical-align: middle;
    line-height: 0.5rem;
    padding: 8px 12px;
    margin: 0;
  }
  button:hover {
    color: #fff;
    background-color: #4e5bf2;
    border-color: #4250f2;
    cursor: pointer;
  }

  select {
    border-radius: 4px;
    outline: none;
    border: 1px solid #fff;
    display: block;
    padding-right: 20px;
  }
</style>

<div class="topbar">
  <div class="searchcontainer">
    <div>Scope:</div>
    {#await promise}
      <div>Loading...</div>
    {:then data}
      <select on:change={handleSelect}>
        {#each data.items as item}
          <option>{item.metadata.name}</option>
        {/each}
      </select>
    {/await}
  </div>
  <div class="searchcontainer">
    <input type="text" placeholder="Search..." />
    <button>Go</button>
  </div>
</div>
