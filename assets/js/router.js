let Router = {

    routes: {
        "/": "index",
        "/prices": "prices",
        "/contacts": "contacts",
        "/about": "about",
    },


    init: function() {

        this._routes = [];
        for( let route in this.routes ) {

            let method = this.routes[route];

            this._routes.push({
                pattern: new RegExp('^' + route.replace(/:\w+/g,'(\\w+)') + '$'),
                callback: this[method]
            });

        }

    },

    dispatch: function(path) {
        var i = this._routes.length;
        while( i-- ) {
            var args = path.match(this._routes[i].pattern);
            if( args ) {
                this._routes[i].callback.apply(this,args.slice(1))
            }
        }
    },

    loadContent: function(pageName) {
        $.ajax({
            type: "GET",
            url: window.location.pathname + '/' + pageName,
            crossDomain: false,
            success: function (data) {
                $('#content-root-container').html(data);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log('xHR: ' + xhr);
                console.log('ajaxOption: ' + ajaxOptions);
                console.log('thrownError: ' + thrownError);
            }
        });
    },

    setCssFile: function(cssFile) {
        $('#wb-page-stylesheet').attr('href', cssFile)

    },

    index: function() {
        this.loadContent('home.html')
        this.setCssFile('assets/css/1.css')
    },

    prices: function() {
        this.loadContent('prices.html')
        this.setCssFile('assets/css/5.css')
    },

    contacts: function() {
        console.log(`contacts`)
    },

    about: function () {
        console.log(`about`)
    }
}

$().ready(function () {
    Router.init();
    Router.dispatch('/');

    let handler = event =>  {
        let url = new URL(event.currentTarget.href);
        Router.dispatch(url.pathname);
        event.preventDefault();
    }

    let anchors = document.querySelectorAll('a');
    for( let anchor of anchors ) anchor.onclick = handler;
})
