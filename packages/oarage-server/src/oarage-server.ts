import Koa = require('koa');
import Router = require('koa-router');
import * as K8s from '@kubernetes/client-node';

const app = new Koa();
const router = new Router();

const kc = new K8s.KubeConfig();
kc.loadFromCluster();

const client = kc.makeApiClient(K8s.Core_v1Api)

router.get('ListAllNamespaces', '/api/v1/pods', async ctx => {
  try {
    const res = await client.listPodForAllNamespaces();
    ctx.body = res;
  } catch(err) {
    ctx.body = err;
  }
});

app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(3000);
