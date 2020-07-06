import DropDown from "./components/Dropdown.vue";

/**
 * You can register global Components here and use them as a plugin in your main Vue instance
 */

const GlobalComponents = {
  install(Vue) {
    Vue.component("drop-down", DropDown);
  }
};

export default GlobalComponents;
