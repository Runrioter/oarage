// Copyright 2018 Runrioter

import * as K8s from '@kubernetes/client-node';
import Koa = require('koa');
import Router = require('koa-router');

class OarageServer extends Koa {

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

  public run(port: number) {
    this.use(this.router.routes())
        .use(this.router.allowedMethods())
        .listen(port);
  }

  private registerRoutes(): void {
    this.router.get('ListAllNamespaces', '/api/v1/pods', async ctx => {
      try {
        const res = await (this.client as K8s.Core_v1Api).listPodForAllNamespaces();
        ctx.body = res;
      } catch(err) {
        ctx.body = (err as Error).message;
      }
    });
  }

}

export = OarageServer;