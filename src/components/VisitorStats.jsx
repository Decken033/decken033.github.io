import React, { useEffect, useState } from 'react';
import './VisitorStats.scss';

const VisitorStats = ({ language = 'en' }) => {
    const [translations, setTranslations] = useState(null);
    const [pageViews, setPageViews] = useState('..1');
    const [uniqueVisitors, setUniqueVisitors] = useState('..2');
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
        document.body.appendChild(script);

        script.onload = () => {
            // 不蒜子加载完成后，通过全局变量获取数据
            const checkStats = setInterval(() => {
                if (window.busuanzi) {
                    setPageViews(document.getElementById('busuanzi_value_site_pv')?.innerText || '...');
                    setUniqueVisitors(document.getElementById('busuanzi_value_site_uv')?.innerText || '...');
                    clearInterval(checkStats);
                }
            }, 500);
        };

        return () => {
            document.body.removeChild(script);
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
            {/* 不蒜子需要的隐藏元素 */}
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
