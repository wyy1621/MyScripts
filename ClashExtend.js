// 参考 https://github.com/mwmi/ClashVergeGlobalScript
const customRules = [
    // 在此添加自定义代理规则。
    // 例如：
    //"DOMAIN-SUFFIX,gstatic.com,节点选择",
    "DOMAIN-KEYWORD,wangyuye,自己域名",
];

// 默认测试网址
const test_url = "https://www.google.com/generate_204";
// 测试网址检测间隔
const test_interval = 240;
// 测试网址的间隔差值，超过这个差值就会切换节点，越小切换越频繁
const test_tolerance = 80;

// 国内DNS服务器,只写最快的一个，写多了会导致访问速度变慢和内核内存占用变大
const domesticNameservers = [
    "tls://223.5.5.5", // 阿里云公共DNS
];
// 国外DNS服务器，同上
const foreignNameservers = [
    "tls://dns.opendns.com", // OpenDNS
];

// 规则集通用配置
const ruleProviderCommon = {
    type: "http",
    format: "mrs",
    interval: 86400,
};

// 代理组通用配置
const groupBaseOption = {
    "interval": 300,
    "timeout": 3000,
    "url": test_url,
    "lazy": true,
    "hidden": false,
    "disable-udp": false,
};

const selfHostedProxyGroupName = "自建落地";
const selfHostedProxyForwardGroupName = "手动选择";
const selfHostedProxyNamePattern = /WYY|自建/i;

// 代理规则
const rules = [
    // 自定义规则
    ...customRules,
    // 规则集
    "RULE-SET,reject,⛔广告拦截",
    "RULE-SET,ipdirect,全局直连,no-resolve",
    "RULE-SET,ipprivate,全局直连,no-resolve",
    "RULE-SET,telegram,电报消息,no-resolve",
    "RULE-SET,telegramcidr,电报消息,no-resolve",
    "RULE-SET,direct,全局直连",
    "RULE-SET,private,全局直连",
    "RULE-SET,openai,OpenAI",
    "RULE-SET,claude,Claude",
    "RULE-SET,gemini,Gemini",
    "RULE-SET,google,谷歌服务",
    "RULE-SET,apple,苹果服务",
    "RULE-SET,bing,Bing",
    "RULE-SET,github,Github",
    "RULE-SET,onedrive,Onedrive",
    "RULE-SET,microsoft,微软服务",
    "RULE-SET,youtube,YouTube",
    "RULE-SET,netflix_ip,Netflix",
    "RULE-SET,netflix_site,Netflix",
    "RULE-SET,tiktok,TikTok",
    "RULE-SET,adobe,Adobe",
    "RULE-SET,pornhub,Pornhub",
    "RULE-SET,spotify,Spotify",
    "RULE-SET,games,游戏服务",
    "RULE-SET,speedtest,网速测试",
    "RULE-SET,bilibili,Bilibili",
    "RULE-SET,proxy,节点选择",
    "RULE-SET,gfw,节点选择",
    // "RULE-SET,tld-not-cn,节点选择",
    // 未匹配的规则
    "MATCH,漏网之鱼",
];

// 规则集配置
const ruleProviders = {
    reject: {
        ...ruleProviderCommon,
        behavior: "domain",
        url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/category-ads-all.mrs",
        path: "./ruleset/reject.mrs",
    },
    ipdirect: {
        ...ruleProviderCommon,
        behavior: "ipcidr",
        url: "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geoip/cn.mrs",
        path: "./ruleset/cncidr.mrs",
    },
    ipprivate: {
        ...ruleProviderCommon,
        behavior: "ipcidr",
        url: "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geoip/private.mrs",
        path: "./ruleset/lancidr.mrs",
    },
    direct: {
        ...ruleProviderCommon,
        behavior: "domain",
        url: "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/cn.mrs",
        path: "./ruleset/direct.mrs",
    },
    private: {
        ...ruleProviderCommon,
        behavior: "domain",
        url: "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/private.mrs",
        path: "./ruleset/private.mrs",
    },
    openai: {
        ...ruleProviderCommon,
        behavior: "classical",
        format: "yaml",
        url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/OpenAI/OpenAI.yaml",
        path: "./ruleset/openai.yaml",
    },
    claude: {
        ...ruleProviderCommon,
        behavior: "classical",
        format: "yaml",
        url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Claude/Claude.yaml",
        path: "./ruleset/claude.yaml",
    },
    gemini: {
        ...ruleProviderCommon,
        behavior: "classical",
        format: "yaml",
        url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Gemini/Gemini.yaml",
        path: "./ruleset/gemini.yaml",
    },
    google: {
        ...ruleProviderCommon,
        behavior: "domain",
        url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/google.mrs",
        path: "./ruleset/google.mrs",
    },
    microsoft: {
        ...ruleProviderCommon,
        behavior: "domain",
        url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/microsoft.mrs",
        path: "./ruleset/microsoft.mrs",
    },
    apple: {
        ...ruleProviderCommon,
        behavior: "domain",
        url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/apple.mrs",
        path: "./ruleset/apple.mrs",
    },
    bing: {
        ...ruleProviderCommon,
        behavior: "domain",
        url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/bing.mrs",
        path: "./ruleset/bing.mrs",
    },
    github: {
        ...ruleProviderCommon,
        behavior: "domain",
        url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/github.mrs",
        path: "./ruleset/github.mrs",
    },
    onedrive: {
        ...ruleProviderCommon,
        behavior: "domain",
        url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/onedrive.mrs",
        path: "./ruleset/onedrive.mrs",
    },
    youtube: {
        ...ruleProviderCommon,
        behavior: "domain",
        url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/youtube.mrs",
        path: "./ruleset/youtube.mrs",
    },
    pornhub: {
        ...ruleProviderCommon,
        behavior: "domain",
        url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/pornhub.mrs",
        path: "./ruleset/pornhub.mrs",
    },
    netflix_ip: {
        ...ruleProviderCommon,
        behavior: "ipcidr",
        url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geoip/netflix.mrs",
        path: "./ruleset/netflix-ip.mrs",
    },
    netflix_site: {
        ...ruleProviderCommon,
        behavior: "domain",
        url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/netflix.mrs",
        path: "./ruleset/netflix-site.mrs",
    },
    adobe: {
        ...ruleProviderCommon,
        behavior: "domain",
        url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/adobe.mrs",
        path: "./ruleset/adobe.mrs",
    },
    bilibili: {
        ...ruleProviderCommon,
        behavior: "domain",
        url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/bilibili.mrs",
        path: "./ruleset/bilibili.mrs",
    },
    tiktok: {
        ...ruleProviderCommon,
        behavior: "domain",
        url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/tiktok.mrs",
        path: "./ruleset/tiktok.mrs",
    },
    spotify: {
        ...ruleProviderCommon,
        behavior: "domain",
        url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/spotify.mrs",
        path: "./ruleset/spotify.mrs",
    },
    speedtest: {
        ...ruleProviderCommon,
        behavior: "domain",
        url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/speedtest.mrs",
        path: "./ruleset/speedtest.mrs",
    },
    games: {
        ...ruleProviderCommon,
        behavior: "domain",
        url: "https://github.com/DustinWin/ruleset_geodata/releases/download/mihomo-ruleset/games-cn.mrs",
        path: "./ruleset/games.mrs",
    },
    telegram: {
        ...ruleProviderCommon,
        behavior: "domain",
        url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/telegram.mrs",
        path: "./ruleset/telegram.mrs",
    },
    telegramcidr: {
        ...ruleProviderCommon,
        behavior: "ipcidr",
        url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geoip/telegram.mrs",
        path: "./ruleset/telegramcidr.mrs",
    },
    proxy: {
        ...ruleProviderCommon,
        behavior: "domain",
        url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo-lite/geosite/proxy.mrs",
        path: "./rulesets/loyalsoldier/proxy.mrs",
    },
    gfw: {
        ...ruleProviderCommon,
        behavior: "domain",
        url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/gfw.mrs",
        path: "./ruleset/gfw.mrs",
    },
    // "tld-not-cn": {
    //     ...ruleProviderCommon,
    //     behavior: "domain",
    //     url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/tld-!cn.mrs",
    //     path: "./ruleset/tld-not-cn.mrs",
    // },
};


// 地区配置
const regionConfig = [
    {
        name: "🇺🇸 美国 📶",
        matcher: "美国|🇺🇸|US|United States|America",
        icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/us.svg"
    },
    {
        name: "🇯🇵 日本 📶",
        matcher: "日本|🇯🇵|JP|Japan",
        icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/jp.svg"
    },
    {
        name: "🇰🇷 韩国 📶",
        matcher: "韩|🇰🇷|kr|korea",
        icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/kr.svg"
    },
    {
        name: "🇸🇬 新加坡 📶",
        matcher: "新加坡|🇸🇬|SG|狮城|Singapore",
        icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/sg.svg"
    },
    {
        name: "🇭🇰 香港 📶",
        matcher: "香港|🇭🇰|HK|Hong Kong|HongKong",
        icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/hk.svg"
    },
    {
        name: "🇹🇼 台湾 📶",
        matcher: "台湾|TW|🇹🇼|tw|taiwan|tai wan",
        icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/tw.svg"
    },
    {
        name: "🇲🇴 澳门 📶",
        matcher: "澳门|澳門|MO|mo|Macao|Macau|🇲🇴",
        icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/mo.svg"
    },
    {
        name: "🌏 东南亚 📶",
        matcher: getSoutheastAsiaMatchers().join("|"),
        icon: "https://cfproxy.wangyuye.cc/down/https://upload.wikimedia.org/wikipedia/en/thumb/c/c1/ASEAN_Flag.svg/960px-ASEAN_Flag.svg.png"
    },
    {
        name: "🇪🇺 欧洲 📶",
        matcher: getEuropeMatchers().join("|"),
        icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/eu.svg"
    },
    {
        name: "🌐 其他 📶",
        icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Global.png"
    }
];

// 显示节点配置
const proxyGroups = [
    {
        ...groupBaseOption,
        name: "节点选择",
        type: "select",
        proxies: ["延迟选优", "手动选择", "故障转移", "负载均衡(散列)", "负载均衡(轮询)"],
        icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Airport.png",
    },
    {
        ...groupBaseOption,
        name: "手动选择",
        type: "select",
        "include-all": true,
        icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/adjust.svg",
    },
    {
        ...groupBaseOption,
        name: "自己域名",
        type: "select",
        proxies: [
            "节点选择",
            "全局直连",
            "手动选择",
            "延迟选优",
            "故障转移",
        ],
        icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/adjust.svg",
    },
    {
        ...groupBaseOption,
        name: "漏网之鱼",
        type: "select",
        proxies: [
            "节点选择",
            "全局直连",
            "手动选择",
            "延迟选优",
            "故障转移",
        ],
        icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/fish.svg",
    },
    {
        ...groupBaseOption,
        name: "OpenAI",
        type: "select",
        proxies: [
            "节点选择",
            "全局直连",
            "手动选择",
            "延迟选优",
            "故障转移",
        ],
        icon: "https://www.clashverge.dev/assets/icons/chatgpt.svg",
    },
    {
        ...groupBaseOption,
        name: "Claude",
        type: "select",
        proxies: [
            "节点选择",
            "全局直连",
            "手动选择",
            "延迟选优",
            "故障转移",
        ],
        icon: "https://cfproxy.wangyuye.cc/down/https://www.anthropic.com/favicon.ico",
    },
    {
        ...groupBaseOption,
        name: "Gemini",
        type: "select",
        proxies: [
            "节点选择",
            "全局直连",
            "手动选择",
            "延迟选优",
            "故障转移",
        ],
        icon: "https://www.clashverge.dev/assets/icons/google.svg",
    },
    {
        ...groupBaseOption,
        name: "苹果服务",
        type: "select",
        proxies: [
            "全局直连",
            "节点选择",
            "手动选择",
            "延迟选优",
            "故障转移",
        ],
        icon: "https://www.clashverge.dev/assets/icons/apple.svg",
    },
    {
        ...groupBaseOption,
        name: "微软服务",
        type: "select",
        proxies: [
            "全局直连",
            "节点选择",
            "手动选择",
            "延迟选优",
            "故障转移",
        ],
        icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/microsoft.svg",
    },
    {
        ...groupBaseOption,
        name: "Onedrive",
        type: "select",
        proxies: [
            "全局直连",
            "节点选择",
            "手动选择",
            "延迟选优",
            "故障转移",
        ],
        icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/OneDrive.png",
    },
    {
        ...groupBaseOption,
        name: "Bing",
        type: "select",
        proxies: [
            "全局直连",
            "节点选择",
            "手动选择",
            "延迟选优",
            "故障转移",
        ],
        icon: "https://www.bing.com/favicon.ico",
    },
    {
        ...groupBaseOption,
        name: "Github",
        type: "select",
        proxies: [
            "节点选择",
            "手动选择",
            "全局直连",
            "延迟选优",
            "故障转移",
        ],
        icon: "https://www.clashverge.dev/assets/icons/github.svg",
    },
    {
        ...groupBaseOption,
        name: "谷歌服务",
        type: "select",
        proxies: [
            "节点选择",
            "手动选择",
            "全局直连",
            "延迟选优",
            "故障转移",
        ],
        icon: "https://www.clashverge.dev/assets/icons/google.svg",
    },
    {
        ...groupBaseOption,
        name: "Bilibili",
        type: "select",
        proxies: [
            "全局直连",
        ],
        icon: "https://fastly.jsdelivr.net/gh/Orz-3/mini@master/Color/Bili.png",
    },
    {
        ...groupBaseOption,
        name: "YouTube",
        type: "select",
        proxies: [
            "节点选择",
            "手动选择",
            "延迟选优",
            "故障转移",
        ],
        icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/youtube.svg",
    },
    {
        ...groupBaseOption,
        name: "Netflix",
        type: "select",
        proxies: [
            "节点选择",
            "手动选择",
            "延迟选优",
            "故障转移",
        ],
        icon: "https://www.clashverge.dev/assets/icons/netflix.svg",
    },
    {
        ...groupBaseOption,
        name: "TikTok",
        type: "select",
        proxies: [
            "节点选择",
            "手动选择",
            "延迟选优",
            "故障转移",
        ],
        icon: "https://fastly.jsdelivr.net/gh/shindgewongxj/WHATSINStash@master/icon/tiktok.png",
    },
    {
        ...groupBaseOption,
        name: "Pornhub",
        type: "select",
        proxies: [
            "节点选择",
            "手动选择",
            "延迟选优",
            "故障转移",
        ],
        icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Pornhub_1.png",
    },
    {
        ...groupBaseOption,
        name: "Spotify",
        type: "select",
        proxies: [
            "全局直连",
            "节点选择",
            "手动选择",
            "延迟选优",
            "故障转移",
        ],
        icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Spotify.png",
    },
    {
        ...groupBaseOption,
        name: "Adobe",
        type: "select",
        proxies: [
            "全局直连",
            "REJECT",
            "节点选择",
        ],
        icon: "https://www.adobe.com/favicon.ico",
    },
    {
        ...groupBaseOption,
        name: "游戏服务",
        type: "select",
        proxies: [
            "节点选择",
            "全局直连",
            "手动选择",
            "延迟选优",
            "故障转移",
        ],
        icon: "https://www.clashverge.dev/assets/icons/steam.svg",
    },
    {
        ...groupBaseOption,
        name: "电报消息",
        type: "select",
        proxies: [
            "节点选择",
            "手动选择",
            "延迟选优",
            "故障转移",
        ],
        icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/telegram.svg",
    },
    {
        ...groupBaseOption,
        name: "网速测试",
        type: "select",
        proxies: [
            "全局直连",
            "手动选择",
        ],
        "include-all": true,
        icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Speedtest.png",
    },
    {
        ...groupBaseOption,
        name: "负载均衡(轮询)",
        type: "load-balance",
        strategy: "round-robin",
        "include-all": true,
        icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/balance.svg",
    },
    {
        ...groupBaseOption,
        name: "负载均衡(散列)",
        type: "load-balance",
        strategy: "consistent-hashing",
        "include-all": true,
        icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/merry_go.svg",
    },
    {
        ...groupBaseOption,
        name: "故障转移",
        type: "fallback",
        "include-all": true,
        icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/ambulance.svg",
    },
    {
        ...groupBaseOption,
        name: "全局直连",
        type: "select",
        proxies: [
            "DIRECT",
            "REJECT",
            "节点选择",
            "手动选择",
        ],
        icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/link.svg",
    },
    {
        ...groupBaseOption,
        name: "延迟选优",
        type: "url-test",
        interval: test_interval,
        tolerance: test_tolerance,
        "include-all": true,
        icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/speed.svg",
    },
    {
        ...groupBaseOption,
        name: "⛔广告拦截",
        type: "select",
        proxies: [
            "REJECT",
            "全局直连",
            "节点选择",
        ],
        icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Advertising.png",
    },
];

// DNS配置
const githubPrefix = "https://gh.wangyuye.cc/";
const rawGeoxURLs = {
    geoip: "https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/geoip-lite.dat",
    geosite: "https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/geosite.dat",
    mmdb: "https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/country-lite.mmdb",
};
const accelGeoxURLs = Object.fromEntries(
    Object.entries(rawGeoxURLs).map(([key, url]) => [key, `${githubPrefix}${url}`])
);

const dnsConfig = {
    "enable": true,
    "ipv6": true,
    "prefer-h3": false,
    "use-hosts": false,
    "use-system-hosts": true,
    "listen": "0.0.0.0:1053",
    "cache-algorithm": "arc",
    "enhanced-mode": "fake-ip",
    "fake-ip-range": "198.18.0.1/16",
    "fake-ip-filter-mode": "blacklist",
    "fake-ip-filter": [
        "+.lan",
        "+.local",
        "+.msftconnecttest.com",
        "+.msftncsi.com",
        "localhost.ptlogin2.qq.com",
        "localhost.sec.qq.com",
        "localhost.work.weixin.qq.com",
        "*.localdomain",
        "*.example",
        "*.invalid",
        "*.localhost",
        "*.test",
        "*.local",
        "*.home.arpa"
    ],
    "nameserver": [...foreignNameservers, ...domesticNameservers],
    "fallback": [...foreignNameservers],
    "proxy-server-nameserver": [...foreignNameservers, ...domesticNameservers],
    "nameserver-policy": {
        "geosite:cn": [...domesticNameservers],
        "geosite:geolocation-!cn": [...foreignNameservers],
    },
    "fallback-filter": {
        "geoip": true,
        "geoip-code": "CN",
        "geosite": ["gfw"],
        "ipcidr": ["240.0.0.0/4"],
        "domain": ["+.google.com", "+.facebook.com", "+.youtube.com"],
    },
};

// 域名嗅探
const snifferConfig = {
    "enable": true,
    "force-dns-mapping": true,
    "parse-pure-ip": true,
    "override-destination": true,
    "sniff": {
        "TLS": {
            "ports": [443, 8443],
        },
        "HTTP": {
            "ports": [80, "8080-8880"],
            "override-destination": true,
        },
        "QUIC": {
            "ports": [443, 8443]
        },
    }
};

function getSoutheastAsiaMatchers() {
    return [
        "文莱|Brunei|BN|🇧🇳",
        "柬埔寨|Cambodia|KH|🇰🇭",
        "东帝汶|Timor-Leste|East Timor|TL|🇹🇱",
        "印尼|印度尼西亚|ID|Indonesia|🇮🇩",
        "老挝|Laos|LA|🇱🇦",
        "马来|马来西亚|MY|Malaysia|🇲🇾",
        "缅甸|Myanmar|Burma|MM|🇲🇲",
        "菲律宾|PH|Philippines|🇵🇭",
        "新加坡|Singapore|SG|狮城|🇸🇬",
        "越南|VN|Vietnam|🇻🇳",
        "泰国|TH|Thailand|🇹🇭",
    ];
}

function getEuropeMatchers() {
    return [
        "阿尔巴尼亚|Albania|AL|🇦🇱",
        "安道尔|Andorra|AD|🇦🇩",
        "亚美尼亚|Armenia|AM|🇦🇲",
        "奥地利|Austria|AT|🇦🇹",
        "阿塞拜疆|Azerbaijan|AZ|🇦🇿",
        "白俄罗斯|Belarus|BY|🇧🇾",
        "比利时|Belgium|BE|🇧🇪",
        "波黑|波斯尼亚和黑塞哥维那|Bosnia and Herzegovina|BA|🇧🇦",
        "保加利亚|Bulgaria|BG|🇧🇬",
        "克罗地亚|Croatia|HR|🇭🇷",
        "塞浦路斯|Cyprus|CY|🇨🇾",
        "捷克|Czechia|Czech Republic|CZ|🇨🇿",
        "丹麦|Denmark|DK|🇩🇰",
        "爱沙尼亚|Estonia|EE|🇪🇪",
        "芬兰|Finland|FI|🇫🇮",
        "英国|英|UK|United Kingdom|Great Britain|🇬🇧",
        "法国|FR|France|🇫🇷",
        "格鲁吉亚|Georgia|GE|🇬🇪",
        "德国|DE|Germany|🇩🇪",
        "希腊|Greece|GR|🇬🇷",
        "匈牙利|Hungary|HU|🇭🇺",
        "冰岛|Iceland|IS|🇮🇸",
        "波兰|PL|Poland|🇵🇱",
        "荷兰|NL|Netherlands|🇳🇱",
        "爱尔兰|IE|Ireland|🇮🇪",
        "科索沃|Kosovo|XK|🇽🇰",
        "拉脱维亚|Latvia|LV|🇱🇻",
        "列支敦士登|Liechtenstein|LI|🇱🇮",
        "立陶宛|Lithuania|LT|🇱🇹",
        "卢森堡|Luxembourg|LU|🇱🇺",
        "马耳他|Malta|MT|🇲🇹",
        "摩尔多瓦|Moldova|MD|🇲🇩",
        "摩纳哥|Monaco|MC|🇲🇨",
        "黑山|Montenegro|ME|🇲🇪",
        "北马其顿|North Macedonia|MK|🇲🇰",
        "挪威|Norway|NO|🇳🇴",
        "瑞典|SE|Sweden|🇸🇪",
        "罗马尼亚|Romania|RO|🇷🇴",
        "俄罗斯|RU|Russia|🇷🇺",
        "圣马力诺|San Marino|SM|🇸🇲",
        "塞尔维亚|Serbia|RS|🇷🇸",
        "斯洛伐克|Slovakia|SK|🇸🇰",
        "斯洛文尼亚|Slovenia|SI|🇸🇮",
        "意大利|IT|Italy|🇮🇹",
        "西班牙|ES|Spain|🇪🇸",
        "瑞士|Switzerland|CH|🇨🇭",
        "葡萄牙|PT|Portugal|🇵🇹",
        "土耳其|TR|Turkey|🇹🇷",
        "乌克兰|Ukraine|UA|🇺🇦",
        "梵蒂冈|Vatican|Holy See|VA|🇻🇦",
        "欧洲|EU|Europe",
    ];
}

// 匹配前去掉线路名中的传输标识，避免 IEPL/IPLC 误触发地区关键词。
function normalizeNameForRegionMatch(name) {
    return String(name || "").replace(/IEPL|IPLC/gi, "");
}

function isSelfHostedProxyName(name) {
    return selfHostedProxyNamePattern.test(String(name || ""));
}

function upsertSelfHostedProxyGroup(config) {
    const entries = config["proxy-groups"];
    if (!Array.isArray(entries)) return;

    let matchedProxyNames = [];
    if (Array.isArray(config.proxies)) {
        matchedProxyNames = config.proxies
            .filter(proxy => isSelfHostedProxyName(proxy?.name))
            .map(proxy => {
                proxy["dialer-proxy"] = selfHostedProxyForwardGroupName;
                proxy.hidden = true;
                return proxy.name;
            });
        matchedProxyNames = [...new Set(matchedProxyNames)];
    }

    if (matchedProxyNames.length === 0) return;

    const selfHostedGroup = {
        ...groupBaseOption,
        name: selfHostedProxyGroupName,
        type: "select",
        proxies: matchedProxyNames,
        icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/World_Map.png",
    };

    const manualSelectIndex = entries.findIndex(entry => entry?.name === "手动选择");
    const insertIndex = manualSelectIndex >= 0 ? manualSelectIndex + 1 : 0;
    entries.splice(insertIndex, 0, selfHostedGroup);

    const aiGroups = new Set(["OpenAI", "Claude", "Gemini"]);
    for (const entry of entries) {
        if (!entry || !aiGroups.has(entry.name)) continue;
        if (!Array.isArray(entry.proxies)) continue;
        entry.proxies = entry.proxies.filter(name => name !== selfHostedProxyGroupName);
        entry.proxies.unshift(selfHostedProxyGroupName);
    }

    config["proxy-groups"] = entries;
}

// 添加地区分组
function addRegions(config) {
    let regions = [];
    if (!config.proxies) {
        if (!config["proxy-providers"]) return;
        const providers = Object.keys(config["proxy-providers"]);
        if (providers.length === 0) return;
        let exclude = "";
        for (const region of regionConfig) {
            if (!region.name) continue;
            if (region.matcher) {
                exclude += (exclude === "" ? region.matcher : `|${region.matcher}`)
                config["proxy-groups"].push({
                    ...groupBaseOption,
                    name: region.name,
                    type: "url-test",
                    interval: test_interval,
                    tolerance: test_tolerance,
                    use: providers,
                    filter: region.matcher,
                    icon: region.icon,
                });
            } else {
                config["proxy-groups"].push({
                    ...groupBaseOption,
                    name: region.name,
                    type: "url-test",
                    use: providers,
                    interval: test_interval,
                    tolerance: test_tolerance,
                    "exclude-filter": exclude,
                    icon: region.icon,
                });
            }
            regions.push(region.name)
        }
    } else {
        let names = config.proxies.map(p => p.name).filter(Boolean);
        if (names.length === 0) return;
        for (const region of regionConfig) {
            let proxies = [], noproxies = [];
            if (!region.matcher) {
                proxies = [...names];
                noproxies = [];
            } else {
                const matches = region.matcher.split("|").filter(Boolean);
                if (matches.length === 0) continue;
                const result = names.reduce((acc, name) => {
                    const normalizedName = normalizeNameForRegionMatch(name);
                    (matches.some(m => normalizedName.includes(m)) ? acc.proxies : acc.noproxies).push(name);
                    return acc;
                }, { proxies: [], noproxies: [] });
                proxies = result.proxies;
                noproxies = result.noproxies;
            }
            if (proxies.length === 0) continue;
            config["proxy-groups"].push({
                ...groupBaseOption,
                name: region.name,
                type: "url-test",
                interval: test_interval,
                tolerance: test_tolerance,
                proxies: proxies,
                icon: region.icon,
            });
            regions.push(region.name);
            if (noproxies.length === 0) break;
            names = noproxies;
        }
    }
    if (regions.length === 0) return;
    const entries = config["proxy-groups"];
    for (const entry of entries) {
        if (!entry || !entry.proxies) continue;
        if (entry.name === "节点选择") {
            if (entry.proxies.length > 1) {
                entry.proxies.splice(2, 0, "地区选择");
            }
        } else if (entry.name === "全局直连") {
            entry.proxies.push("地区选择");
        } else if (entry.name !== selfHostedProxyGroupName && entry.type === "select" && !entry.hasOwnProperty("include-all")) {
            entry.proxies.push(...regions)
        }
    }
    if (entries.length > 0) {
        const manualSelectIndex = entries.findIndex(entry => entry?.name === "手动选择");
        const insertIndex = manualSelectIndex >= 0 ? manualSelectIndex + 1 : 1;
        entries.splice(insertIndex, 0, {
            ...groupBaseOption,
            name: "地区选择",
            type: "select",
            proxies: regions,
            icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/World_Map.png",
        })
    }
    config["proxy-groups"] = entries;
}

// 主函数
function main(config) {
    const proxyCount = config?.proxies?.length ?? 0;
    const proxyProviderCount =
        typeof config?.["proxy-providers"] === "object"
            ? Object.keys(config["proxy-providers"]).length
            : 0;
    if (proxyCount === 0 && proxyProviderCount === 0) {
        throw new Error("配置文件中未找到任何代理");
    }

    // 配置
    config["profile"] = {
        "store-selected": true,
        "store-fake-ip": true,
    };
    // Geo设置
    config["geodata-loader"] = "standard";
    config["geosite-matcher"] = "mph";
    config["geox-url"] = accelGeoxURLs;
    // 全局客户端指纹
    config["global-client-fingerprint"] = "chrome";
    config["global-ua"] = "chrome";
    // 统一延迟
    config["unified-delay"] = true;
    // TCP 并发
    config["tcp-concurrent"] = true;
    // 域名服务
    config["foreign_nameservers"] = foreignNameservers;
    config["domestic_nameservers"] = domesticNameservers;
    // DNS配置
    config["dns"] = dnsConfig;
    // 域名嗅探
    config["sniffer"] = snifferConfig;
    // 规则
    config["rule-providers"] = ruleProviders;
    config["rules"] = rules;
    // 代理组
    config["proxy-groups"] = proxyGroups;
    // 自建落地分组
    upsertSelfHostedProxyGroup(config);
    // 地区分组
    addRegions(config);
    // 返回修改后的配置
    return config;
}