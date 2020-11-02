import ufinCreateComponent, {
    ufinComponentPrefixCls
} from "../utils/component";
import PropTypes from "../utils/prop-types";
import classNames from "classnames";

import "./index.scss";

export const ufinAlertProps = {
    title: PropTypes.string,
    // 	主题	string	success/warning/info/error	info
    type: PropTypes.oneOf(["success", "warning", "info", "error"]).def("info"),
    // 	辅助性文字。也可通过默认 slot 传入
    description: PropTypes.string,
    // 	是否可关闭
    closable: PropTypes.bool.def(true),
    // 	文字是否居中
    center: PropTypes.bool.def(false),
    // 	关闭按钮自定义文本
    closeText: PropTypes.string,
    // 	文字是否居中
    showIcon: PropTypes.bool.def(false),
    // 	是否显示图标
    effect: PropTypes.bool.def(false)
};

const ufinAlert = ufinCreateComponent({
    name: `${ufinComponentPrefixCls}Alert`,
    props: ufinAlertProps,

    data() {
        return {};
    },

    render() {
        const { title, type, showIcon, closable, $slotScope } = this;

        const ufinAlertPrefixCls = `${ufinComponentPrefixCls}-alert`;

        const className = classNames(ufinAlertPrefixCls);

        return (
            <el-alert
                class={className}
                title={title}
                type={type}
                show-icon={showIcon}
                closable={closable}
                {...{
                    title: props => {
                        return $slotScope.title();
                    }
                }}
            >
                {Object.keys(this.$slots).map(name => (
                    <template slot={name} sclot-scope="scope">
                        {this.$slots[name]}
                    </template>
                ))}
            </el-alert>
        );
    }
});

/* istanbul ignore next */
ufinAlert.install = function(Vue) {
    Vue.component(ufinAlert.name, ufinAlert);
};

export default ufinAlert;
