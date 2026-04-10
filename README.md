# MyScripts

自己写的或者魔改的各种脚本

### Clash拓展脚本:
用于覆写Clash配置文件，自定义规则

Clash Verge: 点击订阅，右键点击右下角全局扩展脚本, 编辑文件，添加以下脚本内容

Sub-Store: 文件-添加mihomo文件-脚本操作-添加链接
```
https://raw.githubusercontent.com/wyy1621/MyScripts/refs/heads/main/ClashExtend.js
```


### TraceRoute脚本安装:

``` 
bash <(curl -Ls https://raw.githubusercontent.com/1621391916/MyScripts/main/install_traceroute.sh) 
```

### 安装必要软件:
``` 
bash <(curl -Ls https://raw.githubusercontent.com/1621391916/MyScripts/main/install_libs.sh)
```


### 全球及国内SpeedTest

from： https://www.idcoffer.com/archives/9258
用法： 

### VC 抢机JS脚本
打开 https://free.vps.vc/create-vps, F12-源代码-右上角停用断点(变成蓝色), 控制台粘贴以下代码，到点了直接刷新选地区然后提交
```
document.getElementById("os").options[2].selected = true;
document.getElementById("password").value = "password123";
document.getElementById("purpose").options[2].selected = true;
for (var i = 1; i <= 5; i++) {
    document.evaluate('//*[@id="form-submit"]/fieldset['+i+']/div/div/div/label/input', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.checked = true;
}
```

### ubuntu arm64 安装Chrome和chromedriver
```
apt install chromium-browser chromium-chromedriver
```

### 安装speedtest-x(docker版，接管80端口)
```
docker pull badapple9/speedtest-x
```
```
docker run -d -p 80:80 -v /root/speedtest:/var/www/html/ --name=speedtest-x -it badapple9/speedtest-x
```

### 甲骨文首尔访问hostloc
```
echo "172.67.173.104 hostloc.com" >> /etc/hosts
```