<script>
  import { Router, Route, Link } from "yrv";

  import Navigation from "./Navigation.svelte";

  import Layout from "./Layout.svelte";
  import Namespace from "./namespace/Namespace.svelte";
  import Deployments from "./deployments/Deployments.svelte";

  import TopBar from "./TopBar.svelte";

  import { scope } from "./stores";
  import Pods from "./pods/Pods.svelte";
  import StatefulSet from "./statefulset/StatefulSet.svelte";
  import Ingresses from "./ingresses/Ingresses.svelte";

  scope.subscribe(console.info);

  export let name;
</script>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<Layout>
  <div slot="navigation">
    <Navigation />
  </div>
  <div slot="main">
    <TopBar />
    <Router>
      <Route exact path="/" component={Namespace} />
      <Route exact path="/deployments" component={Deployments} />
      <Route exact path="/pods" component={Pods} />
      <Route exact path="/statefulsets" component={StatefulSet} />
      <Route exact path="/ingresses" component={Ingresses} />
    </Router>
  </div>
</Layout>
