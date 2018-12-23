// Copyright 2018 Runrioter

import { ApiType, Core_v1Api, KubeConfig } from "@kubernetes/client-node";
import { Server } from "http";
import Koa = require("koa");
import Router = require("koa-router");
import Static = require("koa-static");

class OarageServer extends Koa {

  private readonly client: ApiType;
  private readonly router: Router;

  public constructor(private readonly staticRootPath: string) {
    super();
    this.router = new Router();
    this.registerRoutes();

    const kc = new KubeConfig();
    kc.loadFromDefault();
    this.client = kc.makeApiClient(Core_v1Api);
  }

  public run(port: number): Server {
    return this
              .use(Static(this.staticRootPath))
              .use(this.router.routes())
              .use(this.router.allowedMethods())
              .listen(port);
  }

  private registerRoutes(): void {
    const k8sRouter = this.router.prefix("/__kubernetes__");
    k8sRouter.get(
      "ListAllNamespaces",
      "/api/v1/pods",
      async ctx => {
        try {
          const {
            body
          } = await (this.client as Core_v1Api).listPodForAllNamespaces();
          ctx.body = body;
        } catch(err) {
          ctx.body = (err as Error).message;
        }
      }
    );
  }

}

export = OarageServer;