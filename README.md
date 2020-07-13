### 注意事项

项目中涉及到内部包，需要切换安装源

请查看[https://iwhale-citybrain.yuque.com/ypsa7u/obbb9u/abytyh](https://iwhale-citybrain.yuque.com/ypsa7u/obbb9u/abytyh)

## 项目结构

<pre>
public                  // 公共文件 这个目录中的内容会被打包到项目根目录下
src
  |-- mock              // mock文件
  |-- components        // 公共组件目录 当业务需要拆分组件的时候，可以在对应的业务文件夹下单独创建一个components文件夹
  |-- models            // 公共model存放位置
    |-- public.js       // 公共model文件 可以多个
  |-- services          // 公共api存放
  |-- pages             // 容器组件
    |-- demo            // 业务容器 相对路由/demo ***不可以有任何大写字母
      |-- index.js      // 页面入口 入口文件只识别index.js 后缀必须是js
      |-- DemoPage.js   // 页面文件本身
      |-- DemoPage.less // 页面文件样式
      |-- models        // 业务model目录
        |-- demo.js     // 业务model文件 可以有多个 自动加载
      |-- services      // 业务api目录
        |-- demo.js     // 业务api文件 可以有多个
  |-- utils             // 工具
  |-- global.js         // 全局生效的JS
  |-- global.less       // 全局生效的样式
.eslintignore           // eslint过滤文件清单
.eslintrc.js            // eslint配置
.gitignore
package.json  
README.md  
</pre>

## 准备工作

1.  推荐 vscode 作为开发此项目的 IDE
2.  推荐 ESLint Prettier 插件
3.  推荐的 vscode 配置：

```json
{
  "files.eol": "\n",
  "editor.tabSize": 2,
  "editor.formatOnSave": true
}
```

4. 推荐的 vscode 快捷动作(自己配置合适的快捷键吧)

- 代码提示 `editor.action.triggerSuggest`
- 多行合并一行 `editor.action.joinLines`
- 选择相同的单词 `editor.action.addSelectionToNextFindMatch`
- 打开/关闭终端 `workbench.action.terminal.toggleTerminal`
- eslint-fix(需要安装插件) `eslint.executeAutofix`
- 代码格式化 `editor.action.formatDocument`
- 向下复制行 `editor.action.copyLinesDownAction`
- 删除行 `editor.action.deleteLines`

提示：请善用eslint-fix修复简单的eslint错误

## 注意事项

1. 页面应该写在`pages`目录下，所有页面必须以`index.js`为入口。页面的路径不可以包含大写字母，如目录包含多个单词，请使用"-"分隔，如`pages/user-manage/index.js`
2. 页面/组件应当包含三要素(`index.js`入口，`ComponetName.js`页面/组件本身，`ComponetName.less`页面/组件的样式)
3. 单个页面/组件文件，代码量请控制在300行以内，超过该数目，请适当对业务内容进行拆分。
4. 除极个别情况（需要与前端项目负责人沟通确认），不可以在业务代码中使用`eslint-disable`的方式跳过`eslint`校验规则。
5. 页面中引入(组件/服务/models/工具等)资源时，必须遵循规则：禁止依赖子页面或兄弟页面的相关资源，只可以引入当前目录的相关资源，或祖先目录的相关资源。如果某页面需要引用兄弟页面的资源，请进行重构，将该资源提升至他们的共同祖先目录。
6. 项目中已集成`CBD-UI`运行时插件，默认唤起快捷键为`ctrl`+`alt`+`s`(windows)或`ctrl`+`cmd`+`s`(mac)。推荐使用该插件创建页面/组件。
7. 简单的页面，请尽量少使用`dva-model`。当兄弟页面/父子页面之间存在复杂的状态共享时，我们才考虑使用`model`的`state`。当兄弟页面/父子页面之间存在业务逻辑复用时，我们才考虑使用`model`的`effect`
8. 使用`dva-model`时，请尽量少新建`reducers`，大部分的内容都可通过`update`完成(使用`CBD-UI`创建新的`model`时就可以看到)
9. 接口层`services`，组件的`propTypes`等，请编写足够的可读性强的注释，以便于代码维护。
10. 对于控制台中打印的`Warnning`信息，如`React`出现的`duplicate key`, `update on an unmounted component`, `invalid value for prop xxx` 等问题，请务必解决后再提交代码。
