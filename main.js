$(document).ready(function(){
    console.log("Hello World");
    var searchBox = document.querySelector("#search");
    searchBox.addEventListener('change',function(el){
        let term = this.value;
        //list search return titles of relavent wiki articles
        let searchUrl ="https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&iwurl=1&continue=&formatversion=2&srsearch="+
        term+"&srnamespace=4%7C0";
        /// 
        //generator search return all wiki apple related pages and url
        ///w/api.php?action=query&format=json&prop=pageterms%7Cpageimages&iwurl=1&continue=&titles=apple&formatversion=2
        //single query base on provided title
        $.ajax({
            type:"GET",
            dataType:'jsonp',
            url: searchUrl,
            success:function(res){
                let val = res.query.search
                updateContent(val);
                
                $("#wiki").slideUp(1000,function(){
                    $(this).show(1000,function(){
                        $(this).slideDown(1500);
                    })
                    
                });
            },
            failure: function(err){
                console.log(err);
            }
        });
    });
    searchBox.addEventListener('click',function(){
        this.value = '';
    });
    // var randomBtn = document.querySelector("#random");
    // randomBtn.addEventListener("click",function(){
    // $.ajax({
    //     type:"GET",
    //     dataType:'jsonp',
    //     url:"https://en.wikipedia.org/w/api.php?action=query&list=random&format=json&rnnamespace=0&rnlimit=10",
    //     success: function(res){
            
    //         let val = res.query.random;
    //         updateContent(val);
    //     }
    //     failure:function(err){
    //         console.log(err);
    //     }
    // });
    
});

function updateContent(val){
            $("#wiki").empty(); 
            let searchList = val;
            for(let i = 0; i< searchList.length; i++){
                let pageTitle = searchList[i].title;
                //ajax query search for detail of each title
                let searchUrl2 = "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageterms%7Cpageimages&iwurl=1&continue=&titles="+
                pageTitle+"&formatversion=2";
                $.ajax({
                    type:"GET",
                    dataType:'jsonp',
                    url:searchUrl2,
                    success: function(res){
                        let desc = res.query.pages[0].terms.description;
                        let title = res.query.pages[0].title;
                        let searchContent ="<a class='row entry no-link anime-bottom' href=\"https://en.wikipedia.org/wiki/"+ title+ "\">"+
                                    "<div class='entry-container'>"+
                                        "<div class='page-image '>"+
                                            "<i id='icon' class='fa fa-book' ></i></div>"+
                                                "<div class='content'><h4 id='title'>"+ title +"</h4>"+
                                                    "<p id='desc'>"+ desc + "</p>"+
                                                        "</div></div></a>"
                        $("#wiki").append(searchContent);
                        

                    },
                    failure:function(err){
                        console.log(err);
                    }
                });
            }
}