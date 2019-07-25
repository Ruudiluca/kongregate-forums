(function(){
    //Mobile mode
    var viewport = document.createElement('meta');
    viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
    viewport.name = 'viewport';
    document.head.appendChild(viewport);

    //Regen threads

    if (window.location.href.includes('/forums/')) {
        var threads = document.createElement('div');
        
        for (var i of document.getElementsByClassName('topics')[0].getElementsByClassName('hentry')) {
            var thread = i.getElementsByClassName('c2')[0].getElementsByTagName('a')[0];
            var threadHref = thread.href;
            var threadTitle = thread.innerHTML;
            var posts = i.getElementsByClassName('ca')[0].innerHTML;
            var views = i.getElementsByClassName('ca')[1].innerHTML;
            var isStickied = i.getElementsByClassName('c2')[0].textNodes()[0].wholeText.includes('Sticky');
            
            var activity = i.getElementsByClassName('c1')[0].childElements()[0];
            
            var isLocked = activity.getAttribute('alt') == 'Lock';
            var isHot = activity.getAttribute('alt') == 'Comment' && activity.classList.contains('green');
                    
            var updateData = i.getElementsByClassName('lp')[0];
            var updateTime = updateData.getElementsByClassName('updated')[0].innerHTML;
            var updateAuthor = updateData.getElementsByClassName('author')[0].getElementsByClassName('fn')[0].innerHTML;
            var updateUrl = updateData.getElementsByTagName('a')[0].href;
            
            var container = document.createElement('div');
            container.className = 'ExtContThread';
            var title = document.createElement('a');
            title.className = 'ExtThreadTitle';
            title.innerHTML = threadTitle;
            title.href = threadHref;
            var lastPost = document.createElement('a');
            lastPost.className = 'ExtThreadLastPost';
            lastPost.href = updateUrl;
            var lastPostLeft = document.createElement('div');
            lastPostLeft.className = 'ExtThreadLeft';
            lastPostLeft.innerHTML = '<i>Last post by</i> <b>' + updateAuthor + '</b> ' + updateTime;
            var lastPostRight = document.createElement('div');
            lastPostRight.className = 'ExtThreadRight';
            lastPostRight.innerHTML = '<b>' + posts + '</b> <i>posts</i><br><b>' + views + '</b> <i>views</i>';
            lastPost.appendChild(lastPostLeft);
            lastPost.appendChild(lastPostRight);
            
            var stats = document.createElement('div');
            if (isHot)
                stats.appendChild(getIcon('comment-alt', 'threadIcon', 'hotIcon'));
            else
                stats.appendChild(getIcon('comment-alt', 'threadIcon', 'notHotIcon'));
            if (isStickied)
                stats.appendChild(getIcon('sticky', 'threadIcon', 'stickyIcon'));
            if (isLocked)
                stats.appendChild(getIcon('lock', 'threadIcon', 'lockIcon'));
            
            lastPostLeft.appendChild(stats);
            
            var rule = document.createElement('div');
            rule.className = 'ExtDottedRule';
            
            container.appendChild(title);
            container.appendChild(rule);
            container.appendChild(lastPost);

            threads.appendChild(container);
            threads.appendChild(document.createElement('br'));
            threads.appendChild(document.createElement('br'));
        }

        var pagination = document.getElementsByClassName('pagination')[0];
        var currPage = pagination.getElementsByClassName('current')[0].innerHTML;
        var pageNums = pagination.getElementsByTagName('li');
        var lastPage = pageNums[pageNums.length - 2].getElementsByTagName('a')[0].innerHTML;

        var foot = document.createElement('div');
        foot.className = 'ExtFoot';
        var footNew = document.createElement('a');
        footNew.id = 'ExtFootNew';
        footNew.className = 'ExtFootBtn';
        footNew.textContent = 'New topic';
        var footSearch = document.createElement('a');
        footSearch.id = 'ExtFootSearch';
        footSearch.className = 'ExtFootBtn';
        footSearch.textContent = 'Search';

        foot.appendChild(footNew);
        foot.appendChild(footSearch);

        document.body.appendChild(foot);

        document.getElementsByClassName('topics')[0].innerHTML = threads.innerHTML;
    }
    
    function getIcon(name, svgClassName, pathClassName) {
        var svg = document.createElement('svg');
        var path = document.createElement('path');
        path.setAttribute('fill', 'currentColor');
        
        if (svgClassName != '')
            svg.className = svgClassName;
        if (pathClassName != '')
            path.className = pathClassName;
        
        switch (name) {
            case 'plus':
                svg.setAttribute('viewBox', '0 0 448 512');
                path.setAttribute('d', 'M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z');
                break;
            case 'search':
                svg.setAttribute('viewBox', '0 0 512 512');
                path.setAttribute('d', 'M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z');
                break;
            case 'lock':
                svg.setAttribute('viewBox', '0 0 448 512');
                path.setAttribute('d', 'M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z');
                break;
            case 'sticky':
                svg.setAttribute('viewBox', '0 0 448 512');
                path.setAttribute('d', 'M312 320h136V56c0-13.3-10.7-24-24-24H24C10.7 32 0 42.7 0 56v400c0 13.3 10.7 24 24 24h264V344c0-13.2 10.8-24 24-24zm129 55l-98 98c-4.5 4.5-10.6 7-17 7h-6V352h128v6.1c0 6.3-2.5 12.4-7 16.9z');
                break;
            case 'comment-alt':
                svg.setAttribute('viewBox', '0 0 512 512');
                path.setAttribute('d', 'M448 0H64C28.7 0 0 28.7 0 64v288c0 35.3 28.7 64 64 64h96v84c0 9.8 11.2 15.5 19.1 9.7L304 416h144c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64z');
                break;
        }
        
        svg.appendChild(path);
        return svg;
    }

})();