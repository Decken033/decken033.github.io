// 引入 React 的 StrictMode，用于在开发模式下检测潜在问题
import { StrictMode } from 'react'
// 引入 createRoot，用于创建 React 应用的根节点（React 18 的新渲染方式）
import { createRoot } from 'react-dom/client'
// 引入 DataProvider，提供数据管理的上下文
import {DataProvider} from "/src/providers/DataProvider"
// 引入 LanguageProvider，提供语言切换和国际化支持的上下文
import {LanguageProvider} from "/src/providers/LanguageProvider"
// 引入 ThemeProvider，提供主题（如暗黑模式）管理的上下文
import {ThemeProvider} from "/src/providers/ThemeProvider"
// 引入 GlobalStateProvider，提供全局状态管理的上下文
import {GlobalStateProvider} from "/src/providers/GlobalStateProvider"
// 引入 FeedbacksProvider，提供反馈（如通知、提示）管理的上下文
import {FeedbacksProvider} from "/src/providers/FeedbacksProvider"
// 引入 WindowProvider，可能用于管理窗口相关状态或功能的上下文
import {WindowProvider} from "/src/providers/WindowProvider"
// 引入主应用组件 App
import App from "/src/components/App.jsx"
// 引入 Preloader 组件，用于在应用加载时显示预加载动画
import Preloader from "/src/components/Preloader.jsx"

// 定义 AppProviders 组件，用于嵌套所有的上下文提供者（Provider）
// 它接收 children 作为 prop，并将所有 Provider 按顺序包裹在 children 外层
const AppProviders = ({ children }) => (
    <DataProvider>
        <LanguageProvider>
            <FeedbacksProvider>
                <WindowProvider>
                    <ThemeProvider>
                        <GlobalStateProvider>
                            {children}
                        </GlobalStateProvider>
                    </ThemeProvider>
                </WindowProvider>
            </FeedbacksProvider>
        </LanguageProvider>
    </DataProvider>
)

// 定义一个变量 container，用于存储 DOM 根节点
let container = null

// 添加 DOMContentLoaded 事件监听器，确保 DOM 加载完成后执行渲染
document.addEventListener('DOMContentLoaded', function(event) {
    // 如果 container 已存在（即已经渲染过），则直接返回，避免重复渲染
    if(container)
        return

    // 获取 DOM 中的根节点（id 为 'root' 的元素）
    container = document.getElementById('root')
    // 使用 createRoot 创建 React 根节点并渲染应用
    createRoot(document.getElementById('root')).render(
        // 使用 StrictMode 包裹应用，在开发模式下提供额外检查
        <StrictMode>
            {/* Preloader 用于在应用加载时显示加载状态 */}
            <Preloader>
                {/* AppProviders 提供所有上下文，包裹主应用组件 App */}
                <AppProviders>
                    <App/> {/* 主应用组件 */}
                </AppProviders>
            </Preloader>
        </StrictMode>
    )
})
