import * as express from 'express'
import * as http from 'http'

import * as k8s from '@kubernetes/client-node'

const kc = new k8s.KubeConfig()
kc.loadFromDefault()
console.log(kc.setCurrentContext('docker-desktop'))
const k8sCoreApi = kc.makeApiClient(k8s.CoreV1Api)
const k8sAppsApi = kc.makeApiClient(k8s.AppsV1Api)
const k8sNetBV1Api = kc.makeApiClient(k8s.NetworkingV1beta1Api)

const port = 3000

const app: express.Express = express()
const server = http.createServer(app)

app.get('/api/namespaces', (req, res) => {
  k8sCoreApi
    .listNamespace()
    .then(data => res.json(data.body))
    .catch(err => {
      res.status(500).json(err)
    })
})
app.get('/api/:namespace/deployments', (req, res) => {
  const { namespace } = req.params

  k8sAppsApi
    .listNamespacedDeployment(namespace)
    .then(d => res.json(d.body))
    .catch(err => res.status(500).json(err))
})
app.get('/api/:namespace/pods', (req, res) => {
  const { namespace } = req.params

  k8sCoreApi
    .listNamespacedPod(namespace)
    .then(d => res.json(d.body))
    .catch(err => res.status(500).json(err))
})
app.get('/api/:namespace/statefulsets', (req, res) => {
  const { namespace } = req.params

  k8sAppsApi
    .listNamespacedStatefulSet(namespace)
    .then(d => res.json(d.body))
    .catch(err => res.status(500).json(err))
})
app.get('/api/:namespace/ingresses', (req, res) => {
  const { namespace } = req.params

  k8sNetBV1Api
    .listNamespacedIngress(namespace)
    .then(d => res.json(d.body))
    .catch(err => res.status(500).json(err))
})

const callback = function () {
  console.log('Started', ...arguments)
}

server.listen(port, callback)
