import React, { useEffect, useState } from 'react';
import './VisitorStats.scss';

const VisitorStats = ({ language = 'en' }) => {
    const [translations, setTranslations] = useState(null);
    const [pageViews, setPageViews] = useState('...');
    const [uniqueVisitors, setUniqueVisitors] = useState('...');
    const [dataFetched, setDataFetched] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // 加载翻译数据
        const translationsPath = '/data/sections/visiting.json';
        fetch(translationsPath)
            .then(r => r.json())
            .then(json => {
                setTranslations(json);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error loading translations:', error);
                setError('无法加载翻译数据');
                setLoading(false);
            });

        // 加载不蒜子脚本
        const script = document.createElement('script');
        script.src = '//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js';
        script.async = true;

        let checkStats;
        let timeoutId;

        script.onerror = () => {
            console.error('不蒜子脚本加载失败');
            setPageViews('不可用');
            setUniqueVisitors('不可用');
            setDataFetched(true);
            // 清除可能设置的定时器
            if (checkStats) clearInterval(checkStats);
            if (timeoutId) clearTimeout(timeoutId);
        };

        script.onload = () => {
            console.log('不蒜子脚本加载完成');

            checkStats = setInterval(() => {
                const pv = document.getElementById('busuanzi_value_site_pv')?.innerText;
                const uv = document.getElementById('busuanzi_value_site_uv')?.innerText;

                // 只在两个值都存在且非空时更新
                if (pv && uv && pv !== '' && uv !== '') {
                    console.log('检查数据:', { pv, uv });
                    setPageViews(pv);
                    setUniqueVisitors(uv);
                    setDataFetched(true);
                    console.log('数据更新成功:', { pv, uv });

                    // 成功获取数据后清除定时器和超时
                    clearInterval(checkStats);
                    if (timeoutId) clearTimeout(timeoutId);
                }
            }, 500);

            // 设置超时处理
            timeoutId = setTimeout(() => {
                // 检查当前的dataFetched状态，而不是闭包中的值
                if (!dataFetched) {
                    console.log('超时，未获取到数据');
                    setPageViews('不可用');
                    setUniqueVisitors('不可用');
                    setDataFetched(true);
                    if (checkStats) clearInterval(checkStats);
                }
            }, 5000);
        };

        document.body.appendChild(script);

        return () => {
            // 清理函数
            if (script && script.parentNode) {
                document.body.removeChild(script);
            }
            if (checkStats) clearInterval(checkStats);
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, []);

    if (loading) {
        return <div className="visitor-stats">加载翻译数据...</div>;
    }

    if (error || !translations || !translations[language]) {
        return <div className="visitor-stats">{error || '翻译数据不可用'}</div>;
    }

    const t = translations[language];

    return (
        <div className="visitor-stats">
            <span className="label">{t.pageViews}: </span>
            <span className="value">{pageViews}</span>
            <span className="label">| {t.uniqueVisitors}: </span>
            <span className="value">{uniqueVisitors}</span>
            <span id="busuanzi_container_site_pv" style={{ display: 'none' }}>
                <span id="busuanzi_value_site_pv"></span>
            </span>
            <span id="busuanzi_container_site_uv" style={{ display: 'none' }}>
                <span id="busuanzi_value_site_uv"></span>
            </span>
        </div>
    );
};

export default VisitorStats;