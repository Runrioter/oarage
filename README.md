# oarage

### Introduction (介绍)

该项目旨在整合我目前所学习的内容，期待投入生产会经历很长的周期。😄

### Status (当前状态)

  **WIP**: 开发中


### Deployment(部署)

* Docker for mac (Kubernetes enabled)

  1. Open terminal and run (打开控制台并执行)

  ```shell
  kubectl apply -f https://raw.githubusercontent.com/Runrioter/oarage/master/kubernetes/local/oarage-backend-deployment.yaml
  ```

  2. Configure your host (配置host)

  ```
  127.0.0.1 oarage.local
  ```

  3. Open your browser (打开你的浏览器)

  ```shell
  open http://oarage.local/api/v1/pods
  ```