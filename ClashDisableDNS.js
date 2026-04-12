// 禁用DNS配置

function main(config) {
    config["dns"] = {
        "enable": false
    };
    return config;
}
