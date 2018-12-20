import Koa = require('koa');
import Router = require('koa-router');
import * as K8s from '@kubernetes/client-node';

class Oarage extends Koa {

  private readonly router: Router;
  private readonly client: K8s.ApiType;

  constructor() {
    super();
    this.router = new Router();
    this.registerRoutes();

    const kc = new K8s.KubeConfig();
    kc.loadFromCluster();
    this.client = kc.makeApiClient(K8s.Core_v1Api);
  }

  private registerRoutes() {
    this.router.get('ListAllNamespaces', '/api/v1/pods', async ctx => {
      try {
        const res = await (<K8s.Core_v1Api>this.client).listPodForAllNamespaces();
        ctx.body = res;
      } catch(err) {
        ctx.body = err;
      }
    });
  }

  run(port: number) {
    this.use(this.router.routes())
    .use(this.router.allowedMethods())
    .listen(port);
  }

}

export = Oarage;