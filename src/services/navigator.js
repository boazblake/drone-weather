import m from "mithril";
import O from "patchinko/constant";
import { compile } from "path-to-regexp";
import { resolve } from "url";

export const createNavigator = update => {
  const componentMap = {};
  const routes = {};
  const toPath = {};

  let notFoundComponent = undefined;

  const getUrl = (pageId, params = {}) => {
    const stringify = toPath[pageId];
    return stringify && stringify(params);
  };

  return {
    register: (configs, notFound) => {
      if (notFound) {
        configs.push({
          pageId: "PageNotFound",
          component: notFound,
          route: "/:404...",
        });
      }
      configs.forEach(config => {
        const component = config.component;
        componentMap[config.pageId] = component;

        if (config.route) {
          routes[config.route] = config.pageId;
          toPath[config.pageId] = compile(config.route);
        }
      });
      notFoundComponent = notFound;
    },
    getComponent: pageId => componentMap[pageId] || notFoundComponent,
    onnavigate: (pageId, params, url) => {
      const Component = componentMap[pageId];
      const updateObj = {
        pageId,
        url: "#!" + url,
      };
      if (Component && Component.navigating) {
        return new Promise(res => {
          Component.navigating(params, obj => {
            update(O(updateObj, obj || {}));
            resolve();
          });
        });
      } else {
        update(updateObj);
      }
    },
    navigateTo: (pageId, params) => {
      console.log(m.route.set(getUrl(pageId, params)));
      return m.route.set(getUrl(pageId, params));
    },
    getUrl,
    routes,
  };
};
