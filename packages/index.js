import { default as ufinIcon } from "./Icon/index.jsx";
import ufinAlert from "./Alert/index";
// import ufinBreadcurnb from "./Breadcrumb/index";
// import ufinDialog from "./Dialog/index";
// import ufinCurd from "./Curd/index";
// import ufinToolbar from "./ToolBar/index";
// import ufinPageHeader from "./PageHeader/index";
// import ufinDescriptions from "./Descriptions/index";
// import ufinDescriptionItem from "./Descriptions/Col";

const components = [
    ufinIcon,
    ufinAlert,
    // ufinDialog,
    // ufinBreadcurnb,
    // ufinToolbar,
    // ufinCurd,
    // ufinPageHeader,
    // ufinDescriptions,
    // ufinDescriptionItem
];

const install = function(Vue) {
    components.map(component => {
        Vue.use(component);
    });
};

/* istanbul ignore if */
if (typeof window !== "undefined" && window.Vue) {
    install(window.Vue);
}

export default {
    version: "0.0.0",
    install,
    ufinIcon,
    ufinAlert,
    // ufinDialog,
    // ufinBreadcurnb,
    // ufinToolbar,
    // ufinCurd,
    // ufinPageHeader,
    // ufinDescriptions,
    // ufinDescriptionItem
};
