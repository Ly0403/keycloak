import { createContainer, InjectionMode, asClass } from "awilix";

export default class ContainerAwilix {
  private container;
  constructor() {
    this.container = createContainer({
      injectionMode: InjectionMode.PROXY,
      strict: true,
    });
  }

  public registerClass(key: string, className: any) {
    this.container.register({
      [key]: asClass(className),
    });
  }

  public resolve(key: string) {
    return this.container.resolve(key);
  }
}