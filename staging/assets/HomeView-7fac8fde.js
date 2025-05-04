import { r as resolveComponent, o as openBlock, c as createElementBlock, a as createBaseVNode, b as createVNode, w as withCtx, d as createTextVNode } from "./index-a63217b0.js";
const _imports_0 = "/grandkru.com/assets/Grand-Kru-Technologies_grandkrusplash_9237-62d1e213.png";
const _hoisted_1 = { class: "min-h-screen bg-white" };
const _hoisted_2 = { class: "container mx-auto px-4 py-16" };
const _hoisted_3 = { class: "flex flex-col md:flex-row items-center justify-between" };
const _hoisted_4 = { class: "md:w-1/2 mb-8 md:mb-0" };
const _hoisted_5 = { class: "flex gap-4" };
const _sfc_main = {
  __name: "HomeView",
  setup(__props) {
    return (_ctx, _cache) => {
      const _component_router_link = resolveComponent("router-link");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            createBaseVNode("div", _hoisted_4, [
              _cache[1] || (_cache[1] = createBaseVNode("h1", { class: "text-4xl md:text-5xl font-bold text-primary mb-4" }, " Welcome to Grand Kru Technologies ", -1)),
              _cache[2] || (_cache[2] = createBaseVNode("p", { class: "text-lg text-dark-gray mb-6" }, " We specialize in delivering innovative technology solutions that drive business growth and digital transformation. ", -1)),
              createBaseVNode("div", _hoisted_5, [
                createVNode(_component_router_link, {
                  to: "/contact",
                  class: "bg-primary text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-colors"
                }, {
                  default: withCtx(() => _cache[0] || (_cache[0] = [
                    createTextVNode(" Get in Touch ")
                  ])),
                  _: 1
                })
              ])
            ]),
            _cache[3] || (_cache[3] = createBaseVNode("div", { class: "md:w-1/2" }, [
              createBaseVNode("img", {
                src: _imports_0,
                alt: "Grandkru Technologies Logo",
                class: "w-full max-w-md mx-auto"
              })
            ], -1))
          ])
        ])
      ]);
    };
  }
};
export {
  _sfc_main as default
};
//# sourceMappingURL=HomeView-7fac8fde.js.map
