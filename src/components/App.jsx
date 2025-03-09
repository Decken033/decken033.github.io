// 导入样式文件，用于控制应用的外观
import "/src/styles/app.scss"
// 导入 React 及其钩子函数 useEffect 和 useState
import React, {useEffect, useState} from 'react'
// 导入自定义的数据提供者钩子，用于获取数据
import {useData} from "/src/providers/DataProvider.jsx"
// 导入 Portfolio 组件，用于展示作品集
import Portfolio from "/src/components/Portfolio.jsx"
// 导入 AnimatedCursor 组件，用于实现动画光标效果
import {AnimatedCursor} from "/src/components/feedbacks/AnimatedCursor"
// 导入 ActivitySpinner 组件，用于显示加载动画
import ActivitySpinner from "/src/components/feedbacks/ActivitySpinner.jsx"
// 导入 ImageCache 组件，用于缓存图片
import ImageCache from "/src/components/generic/ImageCache.jsx"
// 导入 YoutubeModal 组件，用于显示 YouTube 视频模态窗
import YoutubeModal from "/src/components/modals/YoutubeModal.jsx"
// 导入 GalleryModal 组件，用于显示图片画廊模态窗
import GalleryModal from "/src/components/modals/GalleryModal.jsx"
// 导入 Notifications 组件，用于显示通知
import Notifications from "/src/components/feedbacks/Notifications.jsx"
// 导入 ConfirmationWindow 组件，用于显示确认对话框
import ConfirmationWindow from "/src/components/modals/ConfirmationWindow.jsx"
// 导入自定义的反馈提供者钩子，用于管理反馈状态
import {useFeedbacks} from "/src/providers/FeedbacksProvider.jsx"
// 导入 VisitorStats 组件，用于显示访问统计
import VisitorStats from '/src/components/VisitorStats'


// 主应用组件
function App() {
    // 从 DataProvider 中获取 listImagesForCache 函数，用于列出需要缓存的图片
    const {listImagesForCache} = useData()

    // 调用函数获取图片列表
    const imageList = listImagesForCache()

    // 返回应用的主结构
    return (
        // 应用包裹器，使用 className 控制样式
        <div className={`app-wrapper`}>
            {/* 渲染反馈组件 */}
            <AppFeedbacks/>
            {/* 缓存图片组件，传入图片 URL 列表 */}
            <ImageCache urls={imageList}/>
            {/* 添加访问统计组件 */}
            <VisitorStats />
            {/* 作品集组件 */}
            <Portfolio/>

        </div>
    )
}

// 反馈组件，负责渲染所有的反馈 UI 元素
function AppFeedbacks() {
    // 从 FeedbacksProvider 中获取反馈相关的状态和函数
    const {
        listSpinnerActivities,          // 获取加载动画活动列表
        isAnimatedCursorEnabled,        // 检查动画光标是否启用
        isAnimatedCursorActive,         // 检查动画光标是否激活
        isModalOpen,                    // 检查模态窗是否打开
        displayingNotification,         // 当前显示的通知
        killNotification,               // 关闭通知的函数
        displayingYoutubeVideo,         // 当前显示的 YouTube 视频
        hideYoutubeVideo,               // 隐藏 YouTube 视频的函数
        displayingGallery,              // 当前显示的画廊
        hideGallery,                    // 隐藏画廊的函数
        pendingConfirmation,            // 待处理的确认对话框
        hideConfirmationDialog          // 隐藏确认对话框的函数
    } = useFeedbacks()

    // 获取加载动画活动列表
    const spinnerActivities = listSpinnerActivities()
    // 检查动画光标是否启用
    const animatedCursorEnabled = isAnimatedCursorEnabled()
    // 检查动画光标是否激活
    const animatedCursorActive = isAnimatedCursorActive()
    // 检查模态窗是否打开
    const modalOpen = isModalOpen()

    // 返回反馈组件的结构
    return (
        <>
            {/* 如果有加载动画活动，则显示加载动画 */}
            {spinnerActivities && (
                <ActivitySpinner activities={spinnerActivities}/>
            )}

            {/* 如果动画光标启用，则渲染动画光标组件 */}
            {isAnimatedCursorEnabled() && (
                <AnimatedCursor enabled={animatedCursorEnabled}
                                active={animatedCursorActive}
                                modalOpen={modalOpen}/>
            )}

            {/* 如果有通知，则显示通知组件 */}
            {displayingNotification && (
                <Notifications displayingNotification={displayingNotification}
                               killNotification={killNotification}/>
            )}

            {/* 渲染 YouTube 视频模态窗 */}
            <YoutubeModal   displayingYoutubeVideo={displayingYoutubeVideo}
                            hideYoutubeVideo={hideYoutubeVideo}/>

            {/* 渲染画廊模态窗 */}
            <GalleryModal   displayingGallery={displayingGallery}
                            hideGallery={hideGallery}/>

            {/* 渲染确认对话框 */}
            <ConfirmationWindow pendingConfirmation={pendingConfirmation}
                                hideConfirmationDialog={hideConfirmationDialog}/>
        </>
    )
}

// 导出默认的 App 组件
export default App
