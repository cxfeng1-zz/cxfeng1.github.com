$(document).ready(function() {
    window.SocialShareButton = {
        openUrl: function(a) {
            return window.open(a),
            !1
        },
        share: function(a) {
            var b, c, d, e;
            c = $(a).data("site"),
            d = encodeURIComponent($(a).parent().data("title")),
            b = encodeURIComponent($(a).parent().data("img")),
            e = encodeURIComponent(location.href);
            switch (c) {
            case "weibo":
                SocialShareButton.openUrl("http://v.t.sina.com.cn/share/share.php?url=" + e + "&pic=" + b + "&title=" + d + "&content=utf-8");
                break;
            case "twitter":
                SocialShareButton.openUrl("https://twitter.com/home?status=" + d + ": " + e);
                break;
            case "douban":
                SocialShareButton.openUrl("http://www.douban.com/recommend/?url=" + e + "&title=" + d + "&v=1&r=1");
                break;
            case "facebook":
                SocialShareButton.openUrl("http://www.facebook.com/sharer.php?t=" + d + "&u=" + e);
                break;
            case "qq":
                SocialShareButton.openUrl("http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=" + e + "&title=" + d);
                break;
            case "tqq":
                SocialShareButton.openUrl("http://share.v.t.qq.com/index.php?c=share&a=index&url=" + e + "&title=" + d);
                break;
            case "baidu":
                SocialShareButton.openUrl("http://apps.hi.baidu.com/share/?url=" + e + "&title=" + d + "&content=");
                break;
            case "kaixin001":
                SocialShareButton.openUrl("http://www.kaixin001.com/rest/records.php?url=" + e + "&content=" + d + "&style=11&pic=" + b);
                break;
            case "renren":
                SocialShareButton.openUrl("http://widget.renren.com/dialog/share?resourceUrl=" + e + "&title=" + d + "&description=");
                break;
            case "google_plus":
                SocialShareButton.openUrl("https://plus.google.com/share?url=" + e + "&t=" + d)
            }
            return ! 1
        }
    }
});

