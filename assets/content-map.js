// assets/content-map.js
// 站点内容分区与搜索过滤模块

const contentMap = {
  siteUrl: 'https://leyuesport.com.cn',
  primaryTag: '乐鱼体育',
  lastUpdated: '2025-03-15',
  sections: [
    {
      id: 'home',
      name: '首页',
      tags: ['乐鱼体育', '首页推荐', '热门赛事'],
      keywords: ['足球', '篮球', '电竞'],
      items: [
        { title: '今日焦点', url: '/focus', desc: '精选比赛集锦' },
        { title: '赛事预告', url: '/preview', desc: '即将开始的比赛' }
      ]
    },
    {
      id: 'news',
      name: '新闻资讯',
      tags: ['乐鱼体育', '体育新闻', '转会', '赛况'],
      keywords: ['英超', 'NBA', '中超', '转会', '战报'],
      items: [
        { title: '最新战报', url: '/news/latest', desc: '实时比分与回放' },
        { title: '深度分析', url: '/news/analysis', desc: '专家评述' }
      ]
    },
    {
      id: 'live',
      name: '直播',
      tags: ['乐鱼体育', '直播', '高清', '赛事直播'],
      keywords: ['直播', '高清', '信号', '解说'],
      items: [
        { title: '正在直播', url: '/live/now', desc: '当前热门直播' },
        { title: '回放', url: '/live/replay', desc: '错过的精彩' }
      ]
    },
    {
      id: 'community',
      name: '社区',
      tags: ['乐鱼体育', '球迷社区', '讨论', '互动'],
      keywords: ['讨论', '投票', '预测', '球迷'],
      items: [
        { title: '热门话题', url: '/community/hot', desc: '球迷热议' },
        { title: '预测赢家', url: '/community/predict', desc: '赢取奖励' }
      ]
    }
  ]
};

function searchByKeyword(keyword) {
  const results = [];
  const lowerKw = keyword.toLowerCase();

  for (const section of contentMap.sections) {
    const sectionMatches = [];

    for (const item of section.items) {
      const titleMatch = item.title.toLowerCase().includes(lowerKw);
      const descMatch = item.desc.toLowerCase().includes(lowerKw);
      const tagMatch = section.tags.some(tag => tag.toLowerCase().includes(lowerKw));
      const kwMatch = section.keywords.some(kw => kw.toLowerCase().includes(lowerKw));

      if (titleMatch || descMatch || tagMatch || kwMatch) {
        sectionMatches.push(item);
      }
    }

    if (sectionMatches.length > 0) {
      results.push({
        sectionId: section.id,
        sectionName: section.name,
        matchedItems: sectionMatches
      });
    }
  }

  return results;
}

function getSectionById(sectionId) {
  return contentMap.sections.find(s => s.id === sectionId) || null;
}

function getAllTags() {
  const allTags = new Set();
  for (const section of contentMap.sections) {
    section.tags.forEach(tag => allTags.add(tag));
  }
  return Array.from(allTags);
}

function getItemsByTag(tag) {
  const results = [];
  for (const section of contentMap.sections) {
    if (section.tags.includes(tag)) {
      results.push({
        sectionId: section.id,
        sectionName: section.name,
        items: section.items
      });
    }
  }
  return results;
}

function filterByTags(tagList) {
  const results = [];
  for (const section of contentMap.sections) {
    const hasAnyTag = tagList.some(tag => section.tags.includes(tag));
    if (hasAnyTag) {
      results.push(section);
    }
  }
  return results;
}

// 示例：搜索“直播”
const searchExample = searchByKeyword('直播');
console.log('搜索“直播”结果:', searchExample);

// 示例：按标签过滤
const tagFilterExample = filterByTags(['乐鱼体育']);
console.log('按标签“乐鱼体育”过滤:', tagFilterExample);

// 导出供其他模块使用（若需要）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    contentMap,
    searchByKeyword,
    getSectionById,
    getAllTags,
    getItemsByTag,
    filterByTags
  };
}