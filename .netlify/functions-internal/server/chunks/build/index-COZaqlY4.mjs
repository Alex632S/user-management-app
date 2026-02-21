import { defineComponent, ref, computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderList, ssrRenderAttr, ssrRenderClass } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const users = ref([]);
    const loading = ref(false);
    const error = ref(null);
    const activeUsers = computed(
      () => users.value.filter((user) => user.status === "active").length
    );
    const adminCount = computed(
      () => users.value.filter((user) => user.role === "admin").length
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container" }, _attrs))} data-v-48ee800b><h1 data-v-48ee800b>User Management</h1>`);
      if (loading.value) {
        _push(`<div data-v-48ee800b> Loading... </div>`);
      } else if (error.value) {
        _push(`<div data-v-48ee800b>${ssrInterpolate(error.value)}</div>`);
      } else {
        _push(`<div data-v-48ee800b><div class="stats" data-v-48ee800b><div class="stat-card" data-v-48ee800b><h3 data-v-48ee800b>Total Users</h3><p data-v-48ee800b>${ssrInterpolate(users.value.length)}</p></div><div class="stat-card" data-v-48ee800b><h3 data-v-48ee800b>Active</h3><p data-v-48ee800b>${ssrInterpolate(activeUsers.value)}</p></div><div class="stat-card" data-v-48ee800b><h3 data-v-48ee800b>Admins</h3><p data-v-48ee800b>${ssrInterpolate(adminCount.value)}</p></div></div><div class="actions" data-v-48ee800b><button class="btn" data-v-48ee800b> Refresh Users </button><button class="btn btn-primary" data-v-48ee800b> Test Create </button><button class="btn btn-danger"${ssrIncludeBooleanAttr(!users.value.length) ? " disabled" : ""} data-v-48ee800b> Test Delete First User </button></div><div class="user-list" data-v-48ee800b><!--[-->`);
        ssrRenderList(users.value, (user) => {
          _push(`<div class="user-card" data-v-48ee800b><img${ssrRenderAttr("src", user.avatar)} alt="" class="avatar" data-v-48ee800b><div class="info" data-v-48ee800b><h3 data-v-48ee800b>${ssrInterpolate(user.name)}</h3><p data-v-48ee800b>${ssrInterpolate(user.email)}</p><span class="${ssrRenderClass([user.role, "badge"])}" data-v-48ee800b>${ssrInterpolate(user.role)}</span><span class="${ssrRenderClass([user.status, "badge"])}" data-v-48ee800b>${ssrInterpolate(user.status)}</span></div></div>`);
        });
        _push(`<!--]--></div></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-48ee800b"]]);

export { index as default };
//# sourceMappingURL=index-COZaqlY4.mjs.map
