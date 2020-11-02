<template>
    <div>
        啊啊
        <ufin-alert title="An info prompt">
            <template slot="desc"
                >Content of prompt. Content of prompt. Content of prompt.
                Content of prompt.
            </template>
        </ufin-alert>
        <ufin-alert type="success">
            A success prompt
            <template slot="desc"
                >Content of prompt. Content of prompt. Content of prompt.
                Content of prompt.
            </template>
        </ufin-alert>
        <ufin-alert type="warning">
            A warning prompt
            <template slot="desc">
                Content of prompt. Content of prompt. Content of prompt.
            </template>
        </ufin-alert>
        <ufin-alert type="error">
            An error prompt
            <span slot="desc">
                Custom error description copywriting.
                <ufin-icon type="help-circled" size="14"></ufin-icon>
            </span>
        </ufin-alert>
        <ufin-alert type="info" show-icon closable>消息提示文案</ufin-alert>
        <ufin-alert type="success" show-icon>成功提示文案</ufin-alert>
        <ufin-alert type="warning" show-icon>警告提示文案</ufin-alert>
        <ufin-alert type="error" show-icon>错误提示文案</ufin-alert>
        <ufin-alert show-icon>
            消息提示文案
            <template slot="desc"
                >消息提示的描述文案消息提示的描述文案消息提示的描述文案消息提示的描述文案消息提示的描述文案</template
            >
        </ufin-alert>
        <ufin-alert type="success" show-icon>
            成功提示文案
            <span slot="desc"
                >成功的提示描述文案成功的提示描述文案成功的提示描述文案成功的提示描述文案成功的提示描述文案</span
            >
        </ufin-alert>
        <ufin-alert type="warning" show-icon>
            警告提示文案
            <template slot="desc">
                警告的提示描述文案警告的提示描述文案警告的提示描述文案
            </template>
        </ufin-alert>
        <ufin-alert type="error" show-icon>
            错误提示文案
            <span slot="desc">
                自定义错误描述文案。
            </span>
        </ufin-alert>
        <ufin-alert show-icon closable>
            自定义图标
            <ufin-icon type="ios-bulb-outline" slot="icon"></ufin-icon>
            <template slot="desc"
                >自定义图标文案自定义图标文案自定义图标文案自定义图标文案自定义图标文案</template
            >
        </ufin-alert>
        <ufin-alert banner type="warning"
            >Notice: notification contents...</ufin-alert
        >
        <ufin-alert banner closable type="warning"
            >Notice: notification contents...</ufin-alert
        >
        <ufin-alert closable>An info prompt</ufin-alert>
        <ufin-alert type="success" show-icon closable>
            A success prompt
            <span slot="desc"
                >Content of prompt. Content of prompt. Content of prompt.
                Content of prompt.
            </span>
        </ufin-alert>
        <ufin-alert type="warning" closable>
            Custom closing content
            <span slot="close">No longer prompt</span>
        </ufin-alert>
    </div>
</template>
<script>
export default {};
</script>
