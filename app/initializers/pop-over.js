import Ember from "ember";
import Flow from "ember-pop-over/system/flow";
import config from "../config/environment";
import * as flows from "../flows";

const get = Ember.get;
const keys = Object.keys;

export var initialize = function (app) {
  Ember.A(keys(flows)).forEach(function (flowName) {
    if (flowName == 'default') { return; }
    let constraints = get(flows[flowName].call(Flow.create()), 'constraints');
    app.register(`pop-over-constraint:${flowName}`, constraints, { instantiate: false });
  });

  // Set flags for integrations with other addons
  let includedModules = Ember.A(keys(require.entries));
  Ember.A(['liquid-fire']).forEach(function (moduleName) {
    let includesIntegration = includedModules.contains(moduleName);
    app.register(`pop-over-integrations:${moduleName}`, includesIntegration, { instantiate: false });
  });
};

export default {
  name: "register-pop-over-flows",
  initialize: initialize
};
