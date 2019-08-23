import { FormManager, FieldPlugin } from './cms-forms'
import { PluginManager, PluginType } from './plugins'

export class CMS {
  forms: FormManager
  plugins: PluginManager
  api: { [key: string]: API } = {}
  constructor() {
    this.forms = new FormManager()
    this.plugins = new PluginManager()
  }

  get fields(): PluginType<FieldPlugin> {
    return this.plugins.findOrCreateMap('field')
  }

  registerApi(name: string, api: API): void {
    // TODO: Make sure we're not overwriting an existing API.
    this.api[name] = api
  }
}

export interface API {
  onSubmit?(data: any): any
  onChange?(data: any): any
  isAuthenticated?(): any
  authenticate?(): Promise<any>
  removeAuthentication?(): any
}
