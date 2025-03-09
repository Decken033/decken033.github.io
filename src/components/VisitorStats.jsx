import React, { useEffect, useState } from 'react';
import './VisitorStats.scss';

const VisitorStats = ({
                          language = 'en',
                          pageViews = '...',
                          uniqueVisitors = '...'
                      }) => {
    const [translations, setTranslations] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
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
        </div>
    );
};

export default VisitorStats;
